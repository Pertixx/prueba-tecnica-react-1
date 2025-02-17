import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import SignInButton from "../auth/SignInButton";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, users, getAllUsers } = useAuth();

  useEffect(() => {
    if (!user) {
      getAllUsers();
    }
  }, [])

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center p-6 space-y-4 text-center">
        <h3 className="text-lg font-semibold text-gray-700">
          Inicia sesion para ver los comentarios
        </h3>
        <p className="text-gray-500">
          Unete a la conversacion iniciando sesion con tu cuenta de Google
        </p>
        <h4 className="text-lg font-semibold text-gray-700">
          Usuarios activos
        </h4>
        <div className="flex flex-wrap gap-3">
          {users?.map((user) => (
            <img
              src={user.photoURL}
              alt={user.displayName}
              key={user.uid}
              className="w-8 h-8 rounded-full object-cover"
              loading="lazy"
            />
          ))}
        </div>
        <SignInButton />
      </div>
    )
  }

  return (
    <>
      {children}
    </>
  )
}