import { useAuth } from "../../context/AuthContext";
import { FcGoogle } from "react-icons/fc";

export default function SignInButton() {
  const { signInWithGoogle, user, signOut } = useAuth();

  if (user) {
    return (
      <button onClick={signOut} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
        Sign out
      </button>
    )
  }

  return (
    <button
      onClick={signInWithGoogle}
      className="text-black flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
    >
      <FcGoogle className="text-xl" />
      <span>Continuar con Google</span>
    </button>
  )
}