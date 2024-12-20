'use client';

import { Button } from '@repo/ui/components/ui/button';
import React from 'react';
import { signOut } from 'next-auth/react';

export default function SignOut() {
  return (
    <div className="px-5 py-5">
      <Button className="w-full" onClick={() => signOut()}>
        로그아웃
      </Button>
    </div>
  );
}
