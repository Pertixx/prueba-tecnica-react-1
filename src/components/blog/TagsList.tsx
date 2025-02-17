import { useEffect } from "react";
import { useBlog } from "../../context/BlogContext";

export default function TagsList() {
  const { state, fetchTags, selectTag } = useBlog();
  const { tags, loadingTags, selectedTag } = state;

  useEffect(() => {
    fetchTags();
  }, []);

  if (loadingTags) {
    return <div>Cargando tags...</div>
  }

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      {tags.map((tag: string, index: number) => (
        <button
          key={index}
          onClick={() => selectTag(tag)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedTag === tag ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}