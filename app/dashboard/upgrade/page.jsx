"use client";

import Link from "next/link";
import { Check } from "lucide-react";

export default function UpgradePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">

      <div className="max-w-3xl w-full bg-card border border-border rounded-2xl shadow-sm p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-foreground mb-2">
            Upgrade to CurriculAI Pro
          </h1>

          <p className="text-muted-foreground">
            Unlock unlimited AI-powered learning
          </p>
        </div>

        {/* Card */}
        <div className="border border-border rounded-xl p-6 bg-background">

          {/* Price */}
          <div className="text-center mb-6">
            <p className="text-4xl font-bold text-foreground">
              ₹0
            </p>

            <p className="text-sm text-muted-foreground">
              Free for early users 🎉
            </p>
          </div>

          {/* Features */}
          <ul className="space-y-4 mb-8">

            {[
              "Unlimited course generation",
              "AI-powered explanations",
              "Video + notes integration",
              "Downloadable content (Coming Soon)",
              "Priority AI access (Future)",
              "No ads, clean experience",
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-3 text-foreground"
              >
                <Check className="w-5 h-5 text-primary" />
                <span>{item}</span>
              </li>
            ))}

          </ul>

          {/* Button */}
          <div className="text-center space-y-3">

            <button
              disabled
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium opacity-70 cursor-not-allowed"
            >
              Pro Access Enabled
            </button>

            <p className="text-xs text-muted-foreground">
              Payments coming soon. Enjoy free access for now 💚
            </p>

          </div>

        </div>

        {/* Back */}
        <div className="text-center mt-6">
          <Link
            href="/dashboard"
            className="text-sm text-muted-foreground hover:text-foreground transition"
          >
            ← Back to Dashboard
          </Link>
        </div>

      </div>
    </div>
  );
}
