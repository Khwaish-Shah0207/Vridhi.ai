import "./globals.css";
import { Providers } from "../context/Providers";
import Sidebar from "../components/Sidebar";

export const metadata = {
  title: "Vridhi.ai — Predictive Credit Risk Analytics",
  description: "MSME credit-risk analytics platform with explainable AI, forecasting, and fairness analysis.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="flex-1 lg:ml-64 min-h-screen">
              <div className="p-4 md:p-8 max-w-7xl mx-auto">
                {children}
              </div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
