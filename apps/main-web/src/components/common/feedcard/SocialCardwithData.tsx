'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';
import { Card, CardContent, CardFooter } from '@repo/ui/components/ui/card';
import { Heart, Share2, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FeedDetail } from '../../../types/feed/FeedType';
import { formatDate } from '../../../utils/formatDate';
import { getMediaUrl } from '../../../utils/media';

export default function SocialCardwithData({
  isDetail,
  feedData,
}: {
  isDetail: boolean;
  feedData: FeedDetail;
}) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Card className={`h-2/5 overflow-hidden p-4 ${isDetail ? 'border-0' : ''}`}>
      {/* Social Card Image */}
      {!isDetail && (
        <div className="relative">
          <Link href={`/feed/${feedData.feedCode}`}>
            <Image
              src={getMediaUrl(feedData.mediaUrlList?.[0] || '')}
              width={500}
              height={300}
              alt="Feed image"
              className="w-full rounded-lg object-cover"
            />
          </Link>

          <div
            className={`absolute right-3 top-3 rounded-full p-2 ${
              isLiked ? 'bg-red-500' : 'opacity-50 bg-gray-800'
            }`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart
              fill="white"
              className={`h-4 w-4 ${isLiked ? 'text-white' : 'text-gray-300'}`}
            />
          </div>
        </div>
      )}

      {isDetail && (
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          className="rounded-lg overflow-hidden"
        >
          {feedData.mediaUrlList.map((url, index) => (
            <SwiperSlide key={index}>
              <Image
                src={getMediaUrl(url)}
                alt={`Feed image ${index + 1}`}
                width={500}
                height={300}
                className="w-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <CardContent className="mt-4 px-2">
        <div className="flex items-start justify-between">
          <div className="mb-4 flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                src={getMediaUrl(feedData.image)}
                alt={feedData.nickname}
                className="object-cover"
              />
              <AvatarFallback>RF</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-md font-extrabold text-black">
                {feedData.nickname}
              </h3>
              <p className="text-xs text-black">{`@${feedData.tag}`}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            {formatDate(feedData.createdAt)}
          </p>
        </div>
        <p
          className={`w-full text-sm text-gray-400 line-clamp-2 text-ellipsis whitespace-pre-wrap ${
            isDetail ? '' : 'line-clamp-2'
          }`}
        >
          {feedData.content}
        </p>
      </CardContent>

      {/* SocialCard Reaction Section */}
      <CardFooter className="flex gap-x-5 border-t border-gray-100 px-2 py-3 text-xs text-gray-400">
        <ul className="flex items-center gap-x-2">
          <li>
            <ThumbsUp className="text-lookids h-4 w-4" />
          </li>
          <li>{`${178} Likes`}</li>
        </ul>
        <ul className="flex items-center gap-x-2">
          <li>
            <Share2 className="text-lookids h-4 w-4" />
          </li>
          <li>{`${12} Shares`}</li>
        </ul>
      </CardFooter>
    </Card>
  );
}