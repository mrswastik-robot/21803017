import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../components/Navbar';

export const metadata: Metadata = {
  title: 'Social Media Analytics',
  description: 'Analytics dashboard for social media data',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto py-8 px-4">{children}</main>
          <footer className="bg-secondary text-white py-4">
            <div className="container mx-auto text-center">
              <p>Social Media Analytics Dashboard</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
} 