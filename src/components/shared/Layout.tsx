import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      {/* Navbar siempre visible en la parte superior */}
      <Navbar />

      {/* Contenido principal */}
      <main className="container mx-auto p-4 min-h-screen">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="container mx-auto p-4 text-center text-gray-600">
          © 2025 Blog. All rights reserved.
        </div>
      </footer>
    </div>
  )
}