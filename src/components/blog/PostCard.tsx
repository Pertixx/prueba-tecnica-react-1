import { Post } from "../../types";
import { useBlog } from "../../context/BlogContext";
import getRandomImageUrl from "../../utils/randomImageUrl";
import { useEffect } from "react";


export default function PostCard({ post }: { post: Post }) {
  const { openCommentModal, state, fetchUser } = useBlog();
  const user = state.users[post.userId];

  useEffect(() => {
    fetchUser(post.userId);
  }, []);

  const handleCardClick = () => {
    openCommentModal(post.id);
  };

  return (
    <div onClick={handleCardClick} className="flex flex-col relative w-[370px] h-[450px] gap-2 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg p-2 rounded-lg cursor-pointer">
      <img 
        src={getRandomImageUrl(post.title)}
        className="object-cover w-full h-[250px] rounded-lg"
        alt={post.title}
        width={400}
        height={200}
        loading="lazy"
      />
      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
        {post.tags.map((tag, index) => (
          <div key={index} className="bg-white/60 p-2 rounded-xl">
            <p className="text-black font-medium">
              {tag}
            </p>
          </div>
        ))}
      </div>
      <div className="flex text-gray-400 font-medium gap-2">
        <p>
          {post.reactions.likes} likes
        </p>
        <span>&bull;</span>
        <p>
          {post.views} vistas
        </p>
      </div>
      <div>
        <h1 className="font-bold text-xl">
          {post.title}
        </h1>
        <p className="text-gray-500 line-clamp-2 text-sm">
          {post.body}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <img 
          src={getRandomImageUrl(user?.username)}
          className="object-cover w-10 h-10 rounded-full"
          alt={post.title}
          width={40}
          height={40}
          loading="lazy"
        />
        <p className="font-medium text-gray-500">
          {user?.firstName} {user?.lastName}
        </p>
      </div>
    </div>
  )
}