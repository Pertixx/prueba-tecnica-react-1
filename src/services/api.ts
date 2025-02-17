import axios, { AxiosError } from "axios";
import { Comment, Owner, PaginatedResponse, Post } from "../types";

const API_BASE_URL = "https://dummyjson.com/";
const API_KEY = import.meta.env.VITE_DUMMY_API_KEY;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'app-id': API_KEY,
  }
});

export class APIError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = "APIError";
  }
}

export const PostService = {
  // Get paginated posts
  getPosts: async (page: number = 0, limit: number = 10): Promise<PaginatedResponse<Post>> => {
    try {
      const params = { page, limit };
      const response = await api.get("/posts", { params });

      return {
        data: response.data.posts,
        total: response.data.total,
        page,
        limit
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new Error(`Error fetching posts: ${axiosError.message}`);
    }
  },

  getTags: async (): Promise<string[]> => {
    try {
      const response = await api.get("/posts/tag-list");

      return response.data.slice(0, 8); // Return only the first 8 tags
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new Error(`Error fetching tags: ${axiosError.message}`);
    }
  },

  getPostsByTag: async (tag: string, page: number = 0, limit: number = 10): Promise<PaginatedResponse<Post>> => {
    try {
      const params = { page, limit };
      const response = await api.get(`/posts/tag/${tag}`, { params });

      return {
        data: response.data.posts,
        total: response.data.total,
        page,
        limit
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new Error(`Error fetching posts by tag: ${axiosError.message}`);
    }
  },

  getUser: async (id: number): Promise<Owner> => {
    try {
      const response = await api.get(`/users/${id}`);

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new Error(`Error fetching user: ${axiosError.message}`);
    }
  },

  getPostComments:  async (id: number): Promise<Comment[]> => {
    try {
      const response = await api.get(`/comments/post/${id}`);
      return response.data.comments
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new Error(`Error fetching post comments: ${axiosError.message}`);
    }
  }
}
