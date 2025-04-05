'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-xl font-bold text-primary">Social Media Analytics</div>
          <div className="flex space-x-2">
            <Link href="/" className={isActive('/') ? 'nav-link-active' : 'nav-link'}>
              Top Users
            </Link>
            <Link
              href="/trending-posts"
              className={isActive('/trending-posts') ? 'nav-link-active' : 'nav-link'}
            >
              Trending Posts
            </Link>
            <Link
              href="/feed"
              className={isActive('/feed') ? 'nav-link-active' : 'nav-link'}
            >
              Feed
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 