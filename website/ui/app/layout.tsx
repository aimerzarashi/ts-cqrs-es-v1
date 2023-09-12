import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/components/provider/auth';
import { getServerSession } from "next-auth/next";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CQRS/ESで業務システムをつくろう',
  description: 'CQRS/ESで業務システムをつくろう',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = getServerSession();
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </AuthProvider>
  );
};