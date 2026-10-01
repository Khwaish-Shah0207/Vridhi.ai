"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Chatbot from "./Chatbot";

export default function AppShell({ children }) {
  const pathname = usePathname();

  const isPublicPage =
    pathname === "/" || pathname?.startsWith("/auth");

  // Landing page and authentication page
  // are completely separate from the application shell.
  if (isPublicPage) {
    return <>{children}</>;
  }

  // Existing Vridhi application
  return (
    <div className="vridhi-page min-h-screen">
      <Sidebar />

      <main className="relative z-10 pt-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          {children}
        </div>
      </main>

      {/* AI assistant available throughout the application */}
      <Chatbot />
    </div>
  );
}