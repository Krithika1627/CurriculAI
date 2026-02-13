"use client";

import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { LogOut } from "lucide-react";

export default function LogoutPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">

      <div className="max-w-md w-full bg-card border border-border rounded-2xl shadow-sm p-8 text-center">

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <LogOut className="w-10 h-10 text-primary" />
        </div>

        {/* Text */}
        <h1 className="text-2xl font-semibold text-foreground mb-2">
          Sign out from CurriculAI?
        </h1>

        <p className="text-muted-foreground mb-6">
          You will need to log in again to continue learning.
        </p>

        {/* Actions */}
        <div className="space-y-3">

          {/* Logout */}
          <SignOutButton redirectUrl="/">
            <button className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition">
              Yes, Logout
            </button>
          </SignOutButton>

          {/* Cancel */}
          <Link
            href="/dashboard"
            className="block w-full py-3 rounded-lg border border-border text-foreground hover:bg-muted/50 transition"
          >
            Cancel
          </Link>

        </div>

      </div>
    </div>
  );
}
