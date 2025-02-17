import { useEffect } from "react";
import { useBlog } from "../../context/BlogContext";
import PostCard from "./PostCard";
import LoadingIndicator from "../shared/LoadingIndicator";

export default function PostsList() {
  const { state, fetchPosts } = useBlog();
  const { posts, page, loading, error } = state;

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  if (loading) {
    return <LoadingIndicator />
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <>
      <div className="flex flex-col mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 mx-auto">
          {
            posts.map((post, index) => (
              <PostCard post={post} key={index} />
            ))
          }
        </div>
      </div>
    </>
  )
}