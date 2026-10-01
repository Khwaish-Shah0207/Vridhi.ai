"use client";

import { AssessmentProvider } from "./AssessmentContext";
import { AuthProvider } from "./AuthContext";

export function Providers({ children }) {
  return (
    <AuthProvider>
      <AssessmentProvider>
        {children}
      </AssessmentProvider>
    </AuthProvider>
  );
}