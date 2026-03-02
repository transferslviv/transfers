'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import MobileHeader from './MobileHeader';

export default function HeaderWrapper() {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <div className="hidden xl:block">
        <Header />
      </div>
      <MobileHeader />
    </>
  );
}
