import { Comment } from "../../types";
import { useBlog } from "../../context/BlogContext";
import LoadingIndicator from "../shared/LoadingIndicator";
import ProtectedLayout from "../shared/ProtectedLayout";
import { IoMdClose } from "react-icons/io";
import { useEffect } from "react";
import getRandomImageUrl from "../../utils/randomImageUrl";

export default function CommentModal() {
  const { state, closeCommentModal } = useBlog();
  const { comments, loadingComments, error, commentModalOpen  } = state;

  // Cerrar modal con la tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeCommentModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [closeCommentModal]);

  if (!commentModalOpen) return null;

  // Cerrar modal haciendo click fuera
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeCommentModal();
    }
  };

  if (error) {
    return (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={closeCommentModal}
            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center animate-fadeIn" onClick={handleBackdropClick}>
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <ProtectedLayout>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Comments</h2>
            <button
              onClick={closeCommentModal}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <IoMdClose />
            </button>
          </div>

          {loadingComments ? (
            <LoadingIndicator />
          ) : comments.length === 0 ? (
            <div className="text-center py-4">No hay comentarios</div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment: Comment) => (
                <div key={comment.id} className="border-b border-gray-300 pb-4 animate-slideIn">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={getRandomImageUrl(comment.user.username)}
                      alt={comment.user.username}
                      className="w-8 h-8 rounded-full object-cover"
                      loading="lazy"
                    />
                    <span className="font-medium">
                      {comment.user.fullName}
                    </span>
                  </div>
                  <p className="text-gray-600">{comment.body}</p>
                </div>
              ))}
            </div>
          )}
        </ProtectedLayout>
      </div>
    </div>
  )
}