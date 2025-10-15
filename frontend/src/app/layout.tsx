import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "../providers/ApolloProvider";
import { ToastProvider } from "../providers/ToastProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'EmployeeSphere | Modern HR Management',
    template: '%s | EmployeeSphere'
  },
  description: 'Streamline your HR processes with our modern employee management platform',
  keywords: ['HR', 'employees', 'management', 'company', 'directory'],
  authors: [{ name: 'EmployeeSphere' }],
  openGraph: {
    title: 'EmployeeSphere - HR Management',
    description: 'Modern employee management system',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>
        <Providers>
          <ToastProvider />
          <div className="min-h-screen">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}