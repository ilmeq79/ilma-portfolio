"use client";

import { ChevronLeft, ChevronRight, ArrowRight, X, AlertCircle, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

// Greetings in different languages
const greetings = [
  "HI",      // English
  "ZDRAVO",  // Bosnian
  "MERHABA", // Turkish
  "HOLA",    // Spanish
  "BONJOUR", // French
  "CIAO",    // Italian
  "HALLO",   // German
  "こんにちは", // Japanese (Konnichiwa)
  "你好",     // Chinese (Nǐ hǎo)
  "SALAM",   // Arabic
];

export default function Contact() {
  const { t } = useLanguage();
  const [isStarted, setIsStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "", // Hidden field to catch bots
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showEmailError, setShowEmailError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const totalSteps = 3;

  // Rotate greetings animation
  useEffect(() => {
    if (!isStarted) {
      const interval = setInterval(() => {
        setCurrentGreeting((prev) => (prev + 1) % greetings.length);
      }, 2000); // Change every 2 seconds
      return () => clearInterval(interval);
    }
  }, [isStarted]);

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isStarted) {
        setIsStarted(false);
        setCurrentStep(1);
        setFormData({ name: "", email: "", message: "", honeypot: "" });
        setErrors({});
        setIsSubmitting(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isStarted]);

  const handleStart = () => {
    setIsStarted(true);
    setCurrentStep(1);
  };

  const handleReset = () => {
    setIsStarted(false);
    setCurrentStep(1);
    setFormData({ name: "", email: "", message: "", honeypot: "" });
    setErrors({});
    setIsSubmitting(false);
    setShowSuccess(false);
  };

  // Email validation function
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    if (step === 1) {
      if (formData.name.trim() === "") {
        newErrors.name = "Name is required";
        return false;
      }
    }
    
    if (step === 2) {
      if (formData.email.trim() === "") {
        newErrors.email = "Email is required";
        return false;
      }
      if (!isValidEmail(formData.email)) {
        newErrors.email = "Please enter a valid email address";
        setShowEmailError(true);
        setTimeout(() => setShowEmailError(false), 5000);
        return false;
      }
    }
    
    if (step === 3) {
      if (formData.message.trim() === "") {
        newErrors.message = "Message is required";
        return false;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setErrors({});
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === totalSteps) {
      if (validateStep(currentStep)) {
        setIsSubmitting(true);
        try {
          // Send email to API route
          const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              message: formData.message,
              honeypot: formData.honeypot, // Include honeypot field
            }),
          });

          const data = await response.json();

          if (response.ok && data.success) {
            // Success - show success message
            setShowSuccess(true);
            setFormData({ name: "", email: "", message: "", honeypot: "" });
            setCurrentStep(1);
            setErrors({});
          } else {
            // Error - show error message
            console.error('API Error:', data);
            setErrors({ 
              submit: data.error || 'Failed to send message. Please try again later.' 
            });
          }
        } catch (error: any) {
          console.error('Error submitting form:', error);
          // More detailed error message
          let errorMessage = 'Network error. Please check your connection and try again.';
          
          if (error.message?.includes('fetch')) {
            errorMessage = 'Cannot connect to server. Make sure the server is running.';
          } else if (error.message) {
            errorMessage = `Error: ${error.message}`;
          }
          
          setErrors({ 
            submit: errorMessage
          });
        } finally {
          setIsSubmitting(false);
        }
      }
    } else {
      handleNext();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const canProceed = () => {
    if (currentStep === 1) {
      return formData.name.trim() !== "";
    }
    if (currentStep === 2) {
      return formData.email.trim() !== "" && isValidEmail(formData.email);
    }
    if (currentStep === 3) {
      return formData.message.trim() !== "";
    }
    return false;
  };

  // Check if user can navigate to a specific step
  const canNavigateToStep = (step: number): boolean => {
    if (step === 1) return true; // Can always go to first step
    if (step === 2) return formData.name.trim() !== ""; // Need name to go to email
    if (step === 3) return formData.name.trim() !== "" && formData.email.trim() !== "" && isValidEmail(formData.email); // Need name and valid email to go to message
    return false;
  };

  return (
    <section id="contact" className="py-24 px-6 sm:px-8 lg:px-12 bg-muted/30 min-h-screen flex items-center relative z-10">
      {/* Email Error Popup */}
      <AnimatePresence>
        {showEmailError && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4"
          >
            <div className="bg-gradient-to-br from-red-500/20 via-red-400/15 to-pink-500/10 backdrop-blur-xl border border-red-400/30 rounded-2xl shadow-2xl shadow-red-500/20 p-4 flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500/30 to-red-400/20 flex items-center justify-center border border-red-400/40">
                  <AlertCircle className="w-5 h-5 text-red-300" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold text-sm mb-1">
                  {(t.contact as any).emailErrorTitle || 'Invalid Email Format'}
                </h4>
                <p className="text-white/80 text-xs leading-relaxed">
                  {(t.contact as any).emailErrorMessage || 'Please enter a valid email address (e.g., name@example.com)'}
                </p>
              </div>
              <button
                onClick={() => setShowEmailError(false)}
                className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-200"
              >
                <X className="w-3.5 h-3.5 text-white/70" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-2xl w-full relative">
        {/* Greeting and Start Screen */}
        {!isStarted && (
          <div className="text-center space-y-8 animate-fade-in-up">
            {/* Rotating Greeting */}
            <div className="mb-12">
              <h2 className="text-6xl md:text-8xl font-serif font-bold text-white mb-4 h-32 md:h-40 flex items-center justify-center">
                <span 
                  key={currentGreeting}
                  className="inline-block min-w-[200px] md:min-w-[300px] text-center animate-fade-in-up"
                >
                  {greetings[currentGreeting]}
                </span>
              </h2>
              <p className="text-lg md:text-xl text-white font-light">
                {t.contact.title}
              </p>
            </div>

            {/* Start Button */}
            <button
              onClick={handleStart}
              className="px-8 py-4 bg-white text-black rounded-xl font-medium shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)] hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
            >
              {(t.contact as any).start || 'START'}
              <ArrowRight className="w-5 h-5 text-black" />
            </button>
          </div>
        )}

        {/* Success Message (shown after form submission) */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center space-y-8"
          >
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500/30 via-emerald-400/20 to-green-500/20 backdrop-blur-xl border border-green-400/30 flex items-center justify-center shadow-2xl shadow-green-500/20">
                <CheckCircle className="w-12 h-12 text-green-300" />
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                {(t.contact as any).successTitle || 'Thank You!'}
              </h2>
              <p className="text-lg md:text-xl text-white/90 max-w-md mx-auto leading-relaxed">
                {(t.contact as any).successMessage || 'Thank you for your message! We will get back to you within 24 hours.'}
              </p>
            </div>
            <button
              onClick={handleReset}
              className="px-8 py-4 bg-white text-black rounded-xl font-medium shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)] hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
            >
              {(t.contact as any).close || 'Close'}
            </button>
          </motion.div>
        )}

        {/* Form (shown after START) */}
        {isStarted && !showSuccess && (
          <>
        {/* Left Navigation Arrow */}
        {currentStep > 1 && (
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 hidden lg:flex items-center justify-center w-12 h-24 rounded-full bg-background border border-border/50 shadow-lg hover:shadow-xl hover:border-foreground/20 transition-all duration-300 z-10"
            aria-label="Previous step"
          >
            <ChevronLeft className="w-6 h-6 text-foreground/60" />
          </button>
        )}

        {/* Right Navigation Arrow */}
        {currentStep < totalSteps && (
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 hidden lg:flex items-center justify-center w-12 h-24 rounded-full bg-background border border-border/50 shadow-lg hover:shadow-xl hover:border-foreground/20 transition-all duration-300 z-10 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next step"
          >
            <ChevronRight className="w-6 h-6 text-foreground/60" />
          </button>
        )}

        {/* Main Form Card */}
        <form onSubmit={handleSubmit} className="relative">
          <div className="bg-background rounded-3xl p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-border/30">
            {/* Step Indicator */}
            <div className="text-sm text-foreground/40 mb-6 font-medium">
              {String(currentStep).padStart(2, "0")}
            </div>

            {/* Step 1: Name */}
            {currentStep === 1 && (
              <div className="space-y-6">
              <div>
                  <label className="block text-lg md:text-xl font-medium text-foreground mb-4">
                    What&apos;s your name? <span className="text-foreground/40">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: "" });
                    }}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your answer here..."
                    className={`w-full px-4 py-4 rounded-xl bg-background border transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 ${
                      errors.name
                        ? "border-red-500/50 focus:ring-red-500/20 focus:border-red-500/70"
                        : "border-border/50 focus:ring-foreground/20 focus:border-foreground/30"
                    }`}
                    autoFocus
                  required
                />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Email */}
            {currentStep === 2 && (
              <div className="space-y-6">
              <div>
                  <label className="block text-lg md:text-xl font-medium text-foreground mb-4">
                    What&apos;s your email? <span className="text-foreground/40">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) {
                        setErrors({ ...errors, email: "" });
                        setShowEmailError(false);
                      }
                    }}
                    onKeyPress={handleKeyPress}
                    onBlur={() => {
                      if (formData.email.trim() !== "" && !isValidEmail(formData.email)) {
                        setErrors({ ...errors, email: "Please enter a valid email address" });
                        setShowEmailError(true);
                        setTimeout(() => setShowEmailError(false), 5000);
                      }
                    }}
                    placeholder="name@example.com"
                    className={`w-full px-4 py-4 rounded-xl bg-background border transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 ${
                      errors.email
                        ? "border-red-500/50 focus:ring-red-500/20 focus:border-red-500/70"
                        : "border-border/50 focus:ring-foreground/20 focus:border-foreground/30"
                    }`}
                    autoFocus
                  required
                />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Message */}
            {currentStep === 3 && (
              <div className="space-y-6">
              <div>
                  <label className="block text-lg md:text-xl font-medium text-foreground mb-4">
                    What&apos;s your message? <span className="text-foreground/40">*</span>
                </label>
                <textarea
                  value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: "" });
                    }}
                    placeholder="Type your answer here..."
                    rows={6}
                    className={`w-full px-4 py-4 rounded-xl bg-background border transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] text-foreground placeholder:text-foreground/40 resize-none focus:outline-none focus:ring-2 ${
                      errors.message
                        ? "border-red-500/50 focus:ring-red-500/20 focus:border-red-500/70"
                        : "border-border/50 focus:ring-foreground/20 focus:border-foreground/30"
                    }`}
                    autoFocus
                  required
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-500">{errors.message}</p>
                  )}
                </div>
              </div>
            )}

            {/* Submit Error Message */}
            {errors.submit && (
              <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                <p className="text-sm text-red-400">{errors.submit}</p>
              </div>
            )}

            {/* Next/Submit Button */}
            <div className="mt-8 space-y-3">
              <button
                type="submit"
                disabled={!canProceed() || isSubmitting}
                className="w-full px-6 py-4 bg-foreground text-background rounded-xl font-medium shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)] hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : currentStep === totalSteps ? (
                  <>
                    Send Message
                    <ArrowRight className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
              
              {/* Keyboard Hint */}
              <p className="text-center text-sm text-foreground/40 flex items-center justify-center gap-1">
                press Enter <span className="text-xs">↵</span>
              </p>
            </div>

            {/* Step Progress Dots */}
            <div className="flex items-center justify-center gap-2 mt-8 pt-8 border-t border-border/30">
              {Array.from({ length: totalSteps }).map((_, index) => {
                const stepNumber = index + 1;
                const isAccessible = canNavigateToStep(stepNumber);
                const isPrevious = stepNumber < currentStep;
                
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      // Only allow going back to previous steps or forward if validation passes
                      if (isPrevious || (stepNumber === currentStep + 1 && canNavigateToStep(stepNumber))) {
                        if (validateStep(currentStep)) {
                          setCurrentStep(stepNumber);
                          setErrors({});
                        }
                      }
                    }}
                    disabled={!isAccessible && stepNumber > currentStep}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      stepNumber === currentStep
                        ? "bg-foreground w-8"
                        : isPrevious
                        ? "bg-foreground/60 cursor-pointer hover:bg-foreground/80"
                        : isAccessible
                        ? "bg-foreground/40 cursor-pointer hover:bg-foreground/60"
                        : "bg-foreground/20 cursor-not-allowed opacity-50"
                    }`}
                    aria-label={`Go to step ${stepNumber}`}
                    title={
                      !isAccessible && stepNumber > currentStep
                        ? "Complete previous steps first"
                        : `Step ${stepNumber}`
                    }
                  />
                );
              })}
            </div>
          </div>
        </form>

        {/* ESC Hint */}
        {isStarted && (
          <p className="text-center text-sm text-foreground/40 mt-6 flex items-center justify-center gap-1">
            press <span className="font-mono bg-muted/50 px-2 py-1 rounded">ESC</span> to reset
          </p>
        )}
        </>
        )}

        {/* Previous Portfolio Link - At the very bottom */}
        <div className="mt-16 sm:mt-20 md:mt-24 flex justify-center pb-8">
          <a
            href="https://ilmakaukovic.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white/70 transition-colors duration-300"
          >
            <span>{(t as any).previousPortfolio?.text || 'Take a journey through time to explore my previous portfolio website'}</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
