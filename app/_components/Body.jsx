"use client";

import Link from "next/link";
import React from "react";
import { useUser } from "@clerk/nextjs";

function Body() {
  const { isSignedIn } = useUser();
  return (
    <section className="bg-card min-h-screen flex items-center justify-center">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-prose text-center">

          {/* Heading */}
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
            <span className="text-brand">AI</span> Course Generator
          </h1>

          {/* Description */}
          <p className="mt-4 text-muted-foreground sm:text-lg leading-relaxed">
            Create personalized AI-powered courses in minutes.
            Learn smarter, faster, and better with customized learning paths.
          </p>

          {/* Button */}
          <div className="flex gap-10 items-center justify-center">
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href={isSignedIn ? "/create-course" : "/sign-in"}
              className="rounded-lg bg-primary px-6 py-3 font-medium text-base text-primary-foreground shadow hover:opacity-90 transition"
            >
              Get Started
            </Link>
          </div>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href={isSignedIn ? "/dashboard/explore" : "/sign-in"}
              className="rounded-lg bg-primary px-6 py-3 font-medium text-base text-primary-foreground shadow hover:opacity-90 transition"
            >
              Explore
            </Link>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Body;
