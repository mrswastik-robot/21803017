'use client';

import { User } from '@/lib/api';
import Image from 'next/image';

interface UserCardProps {
  user: User;
  rank: number;
}

const UserCard = ({ user, rank }: UserCardProps) => {
  // Generate a placeholder image using user id for consistency
  const avatarUrl = `https://i.pravatar.cc/150?u=${user.id}`;

  return (
    <div className="card flex items-center space-x-4">
      <div className="font-bold text-2xl text-primary min-w-8">{rank}</div>
      <div className="relative w-12 h-12 rounded-full overflow-hidden">
        <Image
          src={avatarUrl}
          alt={user.name}
          fill
          className="object-cover"
          sizes="48px"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{user.name}</h3>
        <p className="text-gray-600">
          {user.postCount} {user.postCount === 1 ? 'post' : 'posts'}
        </p>
      </div>
    </div>
  );
};

export default UserCard; 