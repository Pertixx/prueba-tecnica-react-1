export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  },
  views: number;
  userId: number;
}

export interface Comment {
  id: string;
  body: string;
  postId: number;
  likes: number;
  user: CommentUser;
}

export interface CommentUser {
  id: string;
  username: string;
  fullName: string;
}

export interface Owner {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
}

export interface BlogUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  lastLogin: Date;
  createdAt: Date;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface BlogState {
  posts: Post[];
  tags: string[];
  comments: Comment[];
  users: Record<number, Owner>;
  currentPost: Post | null;
  selectedTag: string | null;
  loading: boolean;
  loadingComments: boolean;
  loadingTags: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  commentModalOpen: boolean;
}

export type BlogAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_LOADING_COMMENTS'; payload: boolean }
  | { type: 'SET_LOADING_TAGS'; payload: boolean }
  | { type: 'SET_POSTS'; payload: { posts: Post[]; total: number } }
  | { type: 'SET_TAG'; payload: string | null }
  | { type: 'SET_TAGS'; payload: string[] }
  | { type: 'SET_COMMENTS'; payload: Comment[] }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'OPEN_COMMENT_MODAL'; payload: boolean }
  | { type: 'CLOSE_COMMENT_MODAL'; payload: boolean }
  | { type: 'SET_USER'; payload: { userId: number; user: Owner } }