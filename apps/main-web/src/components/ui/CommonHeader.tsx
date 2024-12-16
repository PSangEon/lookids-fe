'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { CommonHeaderProps } from '../../types/common/MenuType';
import CommonMenu from '../common/CommonMenu';

export default function CommonHeader({
  title,
  ismenu,
  menuItems = [],
}: CommonHeaderProps) {
  const router = useRouter();
  return (
    // mt-[52px]
    <section className="relative flex h-12 items-center">
      <ChevronLeft
        className="absolute left-3 cursor-pointer"
        onClick={() => {
          router.back();
        }}
      />
      {/* 메뉴 버튼 */}
      {ismenu && menuItems.length > 0 && (
        <div className="absolute right-4">
          <CommonMenu menuItems={menuItems} />
        </div>
      )}
      <p className="flex-1 text-center font-semibold">{title}</p>
    </section>
  );
}
