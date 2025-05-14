export interface LiveEvent {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  host: {
    id: string;
    name: string;
    imageUrl?: string;
  };
  startTime: string;
  endTime: string;
  attendeesCount: number;
  isJoined?: boolean;
}

export interface Discussion {
  id: string;
  title: string;
  content: string;
  topic: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    imageUrl?: string;
  };
  commentsCount: number;
  likesCount: number;
  isLiked?: boolean;
}

export interface Comment {
  id: string;
  discussionId: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    imageUrl?: string;
  };
  likesCount: number;
  isLiked?: boolean;
}