import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";

import Image from "next/image";
import React from "react";

interface ProfileAvatarProps {
  imgUrl: string;
  w?: string;
  h?: string;
  name: string;
}

export default function ProfileAvatar({
  w,
  h,
  name,
  imgUrl,
}: ProfileAvatarProps) {
  return (
    <div className={`relative w-${w} h-${h}`}>
      {imgUrl ? (
        <Image src={imgUrl} alt={name} layout="fill" className="rounded-full" />
      ) : (
        <div className="flex items-center justify-center w-full h-full rounded-full">
          <p className="text-[#838383]">{name}</p>
        </div>
      )}
    </div>
  );
}
