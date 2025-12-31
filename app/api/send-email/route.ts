import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with API key from environment variable
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Simple rate limiting - store in memory (for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_REQUESTS_PER_HOUR = 5; // Max 5 emails per hour per IP

function getRateLimitKey(request: NextRequest): string {
  // Use IP address for rate limiting
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
  return ip;
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_HOUR) {
    return false; // Rate limit exceeded
  }

  record.count++;
  return true;
}

function sanitizeInput(input: string): string {
  // Remove potentially dangerous characters and trim
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .substring(0, 5000); // Limit length
}

function escapeHtml(text: string): string {
  // Escape HTML characters to prevent XSS in email template
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function isValidEmail(email: string): boolean {
  // More strict email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) return false;
  
  // Check for common spam patterns
  const spamPatterns = [
    /\.(ru|tk|ml|ga|cf)$/i, // Suspicious TLDs (you can customize this)
    /^(test|spam|fake|noreply)/i, // Common spam prefixes
  ];
  
  // Allow these patterns but you can block them if needed
  // return !spamPatterns.some(pattern => pattern.test(email));
  
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Check if Resend is configured
    if (!resend || !process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set in environment variables');
      return NextResponse.json(
        { error: 'Email service is not configured. Please check server configuration.' },
        { status: 500 }
      );
    }

    // Rate limiting check
    const rateLimitKey = getRateLimitKey(request);
    if (!checkRateLimit(rateLimitKey)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    let { name, email, message, honeypot } = body;

    // Honeypot field - if filled, it's likely a bot
    if (honeypot && honeypot.trim() !== '') {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 400 }
      );
    }

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    name = sanitizeInput(name);
    email = sanitizeInput(email).toLowerCase();
    message = sanitizeInput(message);

    // Validate email format and check for spam
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Additional validation
    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: 'Name must be between 2 and 100 characters' },
        { status: 400 }
      );
    }

    if (message.length < 10 || message.length > 2000) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 2000 characters' },
        { status: 400 }
      );
    }

    // Send email using Resend
    // Note: The "from" email is always from Resend's domain (secure)
    // The "reply_to" uses the user's email, but you can verify it's real
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Always from Resend (secure, can't be spoofed)
      to: ['theoceansugar9@gmail.com'], // Your email address where you want to receive messages
      reply_to: [email], // User's email for replies (you can verify this is real) - array format
      subject: `New Contact Form Message from ${name} (${email})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
            New Contact Form Message
          </h2>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
            <p style="margin: 10px 0;"><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-left: 4px solid #4F46E5; margin-top: 10px;">
              ${escapeHtml(message).replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `,
      text: `
        New Contact Form Message
        
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
    });

    return NextResponse.json(
      { success: true, message: 'Email sent successfully', data },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}

