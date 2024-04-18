export interface CommentProp {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
}

export interface ReplyProp {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
}

export interface CommentReplyProp {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  replies?: ReplyProp[];
}

export interface UserDataProps {
  currentUser: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  comments: CommentReplyProp[];
}
