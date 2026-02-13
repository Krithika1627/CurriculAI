import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "CurriculAI",
  description: "AI-powered course generator and learning platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`
            ${geistSans.variable}
            ${geistMono.variable}
            antialiased
            bg-background
            text-foreground
            font-sans
          `}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
