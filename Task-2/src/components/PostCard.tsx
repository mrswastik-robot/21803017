'use client';

import { Post } from '@/lib/api';
import Image from 'next/image';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  // Generate a placeholder image using post id for consistency
  const imageUrl = `https://picsum.photos/seed/${post.id}/400/300`;
  
  // Format timestamp if available
  const formattedDate = post.timestamp 
    ? new Date(post.timestamp).toLocaleString() 
    : 'Unknown date';

  return (
    <div className="card">
      <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
        <Image
          src={imageUrl}
          alt="Post image"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>
      <div className="mb-4">
        <p className="text-gray-900">{post.content}</p>
      </div>
      <div className="flex justify-between items-center text-sm text-gray-600">
        <div>User ID: {post.userid}</div>
        <div>
          {post.commentCount !== undefined && (
            <span className="mr-4">💬 {post.commentCount} comments</span>
          )}
          <span>📅 {formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;