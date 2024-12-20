'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/ui/dialog';
import {
  FollowerListModalProps,
  Following,
  FollowingUser,
} from '../../../types/follow/FollowType';
import { useEffect, useState } from 'react';

import { Button } from '@repo/ui/components/ui/button';
import Link from 'next/link';
import { ScrollArea } from '@repo/ui/components/ui/scroll-area';
import { UserInfo } from '../../../types/user';
import { getFollowingList1 } from '../../../actions/follow/Follow';
import { getMediaUrl } from '../../../utils/media';
import { getUserProfile } from '../../../actions/user';

export function FollowerListModal({
  isOpen,
  onClose,
  onSelectFollower,
}: FollowerListModalProps) {
  const [followers, setFollowers] = useState<FollowingUser[]>([]);
  const [followerProfile, setFollowerProfile] = useState<UserInfo[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchFollowers = async () => {
      if (isFetching || followerProfile.length > 0) return; // 요청 중이거나 데이터가 이미 있으면 중단

      setIsFetching(true); // 요청 시작
      try {
        const response = await getFollowingList1();
        const Follwers: FollowingUser[] = response.content;

        const profiles = await Promise.all(
          Follwers.map(async (follower) => {
            const user: UserInfo = await getUserProfile(follower.uuid);
            return user;
          })
        );

        setFollowerProfile(profiles);
        setFollowers(Follwers);
      } catch (error) {
        console.error('Failed to fetch followers:', error);
      } finally {
        setIsFetching(false); // 요청 완료
      }
    };

    if (isOpen) {
      fetchFollowers();
    }
  }, [isOpen, isFetching, followerProfile]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-lookids">팔로잉 목록</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px] pr-4">
          {followerProfile.map((follower, index) => (
            <div key={index} className="flex items-center space-x-4 py-2">
              <Link href={`/user/${follower.nickname}-${follower.tag}`}>
                <Avatar>
                  <AvatarImage
                    src={getMediaUrl(follower.image)}
                    alt={follower.nickname}
                  />
                  <AvatarFallback>{follower.nickname}</AvatarFallback>
                </Avatar>
              </Link>
              <div className="flex-1">
                <Link href={`/user/${follower.nickname}-${follower.tag}`}>
                  <p className="text-sm font-medium">{follower.nickname}</p>
                </Link>
              </div>
              <Button
                className="text-lookids bg-slate-100"
                onClick={() => {
                  if (onSelectFollower) {
                    onSelectFollower(followers[index].uuid, follower.nickname);
                  }
                }}
              >
                메시지 보내기
              </Button>
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
