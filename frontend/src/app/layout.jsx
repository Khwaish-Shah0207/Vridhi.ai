import "./globals.css";
import { Providers } from "../context/Providers";
import AppShell from "../components/AppShell";

export const metadata = {
  title: "Vridhi.ai — Predictive Credit Risk Analytics",
  description:
    "MSME credit-risk analytics platform with explainable AI, forecasting, and fairness analysis.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}