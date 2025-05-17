import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MotionProvider } from "@/components/MotionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Buildix - Building the Future",
  description: "Building the future of construction with innovative solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} theme-transition`}>
        <ThemeProvider>
          <MotionProvider>
          <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
