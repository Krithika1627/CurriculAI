"use client";

import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-card shadow-lg rounded-xl p-8 border border-border">
        
        {/* Header / Branding */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-foreground">Create Your Account</h1>
          <p className="text-muted-foreground mt-2">
            Join us and start building something amazing ✨
          </p>
        </div>

        {/* Clerk Sign-Up */}
        <SignUp 
          appearance={{
            elements: {
              card: "shadow-none border-none",
              formButtonPrimary: "bg-primary hover:opacity-90 text-white",
            },
          }}
          afterSignUpUrl="/dashboard"
        />

        {/* Footer Text */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <a href="/sign-in" className="text-primary font-medium hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
