import React, { createContext, useReducer, useContext, ReactNode, useCallback } from "react";
import { BlogState, BlogAction } from "../types"
;import { PostService } from "../services/api";

const initialState: BlogState = {
  posts: [],
  tags: [],
  comments: [],
  users: {},
  currentPost: null,
  selectedTag: null,
  loading: false,
  loadingComments: false,
  loadingTags: false,
  error: null,
  page: 0,
  totalPages: 0,
  commentModalOpen: false
}

/**
 * Blog context to manage blog state and actions.
 */
const BlogContext = createContext<{
  /** The current state of the blog. */
  state: BlogState;
  /** Dispatch function to send actions to the reducer. */
  dispatch: React.Dispatch<BlogAction>;
  /** Fetches posts with optional tag filtering. */
  fetchPosts: (page: number, tag?: string) => Promise<void>;
  /** Fetches comments for a specific post. */
  fetchPostComments: (id: number) => Promise<void>;
  /** Fetches all available tags. */
  fetchTags: () => Promise<void>;
  /** Fetches user details. */
  fetchUser: (userId: number) => Promise<void>;
  /** Opens the comment modal for a specific post. */
  openCommentModal: (postId: number) => void;
  /** Closes the comment modal. */
  closeCommentModal: () => void;
  /** Selects a tag to filter posts. */
  selectTag: (tag: string) => void;
} | undefined>(undefined);

const blogReducer = (state: BlogState, action: BlogAction): BlogState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_LOADING_COMMENTS":
      return { ...state, loadingComments: action.payload }
    case "SET_LOADING_TAGS":
      return { ...state, loadingTags: action.payload }
    case "SET_POSTS":
      return {
        ...state,
        posts: action.payload.posts,
        totalPages: Math.ceil(action.payload.total / 10),
        loading: false
      }
    case "SET_TAG":
      return { ...state, selectedTag: action.payload }
    case "SET_TAGS":
      return { ...state, tags: action.payload, loadingTags: false }
    case "SET_COMMENTS":
      return { ...state, comments: action.payload, loadingComments: false }
    case "SET_ERROR":
      return { 
        ...state, 
        error: action.payload, 
        loading: false, 
        loadingComments: false, 
        loadingTags: false 
      }
    case "OPEN_COMMENT_MODAL":
      return { 
        ...state, 
        commentModalOpen: action.payload, 
      }
    case "CLOSE_COMMENT_MODAL":
      return { 
        ...state, 
        commentModalOpen: action.payload, 
        comments: []
      }
    case "SET_USER":
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.userId]: action.payload.user
        }
      }
    default:
      return state;
  }
}

interface BlogProviderProps {
  children: ReactNode;
}

export const BlogProvider: React.FC<BlogProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, initialState);

  const fetchPosts = useCallback(async (page: number = 0) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const data = await PostService.getPosts(page, 10);

      dispatch({ type: 'SET_POSTS', payload: { posts: data.data, total: data.total } });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: "Error fetching post details. Please try again later." });
    }
  }, []);

  const fetchPostsByTag = useCallback(async (tag: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const data = await PostService.getPostsByTag(tag);
      dispatch({ type: 'SET_POSTS', payload: { posts: data.data, total: data.total } });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: "Error fetching posts by tag. Please try again later." });
    }
  }, []);

  const fetchPostComments = useCallback(async (id: number) => {
    dispatch({ type: 'SET_LOADING_COMMENTS', payload: true });

    try {
      const data = await PostService.getPostComments(id);
      dispatch({ type: 'SET_COMMENTS', payload: data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: "Error fetching post comments. Please try again later." });
    }
  }, []);

  const fetchTags = useCallback(async () => {
    dispatch({ type: 'SET_LOADING_TAGS', payload: true });

    try {
      const data = await PostService.getTags();
      dispatch({ type: 'SET_TAGS', payload: data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: "Error fetching tags. Please try again later." });
    }
  }, []);

  const fetchUser = useCallback(async (userId: number) => {
    // Check if we already have the user in cache
    if (state.users[userId]) return;

    try {
      const userData = await PostService.getUser(userId);
      dispatch({ 
        type: 'SET_USER', 
        payload: { 
          userId, 
          user: userData 
        } 
      });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: "Error fetching user details. Please try again later." });
    }
  }, [state.users]);

  const selectTag = (tag: string) => {
    if (state.selectedTag === tag) {
      dispatch({ type: 'SET_TAG', payload: null });
      fetchPosts();
      return;
    }
    dispatch({ type: 'SET_TAG', payload: tag });
    fetchPostsByTag(tag);
  };

  const openCommentModal = (postId: number) => {
    dispatch({ type: 'OPEN_COMMENT_MODAL', payload: true });
    fetchPostComments(postId);
  };

  const closeCommentModal = () => {
    dispatch({ type: 'CLOSE_COMMENT_MODAL', payload: false });
  };

  return (
    <BlogContext.Provider 
      value={{ 
        state, dispatch, fetchPosts, fetchPostComments, 
        openCommentModal, closeCommentModal, fetchTags, fetchUser,
        selectTag
      }}>
      {children}
    </BlogContext.Provider>
  )
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};