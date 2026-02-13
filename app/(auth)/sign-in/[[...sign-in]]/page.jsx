"use client";

import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-card shadow-lg rounded-xl p-8 border border-border">
        
        {/* Header / Branding */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">
            Sign in to continue your journey 🚀
          </p>
        </div>

        {/* Clerk Sign-In */}
        <SignIn 
          appearance={{
            elements: {
              card: "shadow-none border-none",
              formButtonPrimary: "bg-primary hover:opacity-90 text-primary-foreground rounded-md",
              formFieldInput: "bg-background border-border focus:ring-2 focus:ring-ring",
              footerActionLink: "text-primary hover:underline",
              identityPreviewText: "text-muted-foreground",
              formFieldLabel: "text-foreground",

            },
          }}
          afterSignInUrl="/dashboard"
          afterSignUpUrl="/dashboard"        />

        {/* Footer Text */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Need an account?{" "}
          <a href="/sign-up" className="text-primary font-medium hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
