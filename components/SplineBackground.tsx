"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          url?: string;
        },
        HTMLElement
      >;
    }
  }
}

export default function SplineBackground() {
  const scriptLoaded = useRef(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Load Spline viewer script only once
    if (!scriptLoaded.current && typeof window !== "undefined") {
      // Check if script already exists
      const existingScript = document.querySelector('script[src*="spline-viewer"]');
      if (existingScript) {
        setIsReady(true);
        return;
      }

      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://unpkg.com/@splinetool/viewer@1.12.28/build/spline-viewer.js";
      script.async = true;
      
      script.onload = () => {
        setIsReady(true);
      };
      
      script.onerror = () => {
        console.error("Failed to load Spline viewer script");
      };

      document.head.appendChild(script);
      scriptLoaded.current = true;

      return () => {
        // Cleanup on unmount
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    } else if (typeof window !== "undefined") {
      // Script might already be loaded
      setIsReady(true);
    }
  }, []);

  return (
    <div 
      className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden" 
      style={{ 
        backgroundColor: 'transparent',
        zIndex: 0,
      }}
    >
      {isReady && (
        <spline-viewer
          url="https://prod.spline.design/2Z9C7lRBCu6snyF2/scene.splinecode"
          style={{
            width: "120%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: "-2%",
            zIndex: 0,
            minHeight: "100vh",
            transform: "translateX(0)",
          }}
        />
      )}
    </div>
  );
}
