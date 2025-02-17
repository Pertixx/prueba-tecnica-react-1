export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-2xl font-bold">Blog</h1>
      <div className="flex gap-4 items-center">
        <a href="/" className="p-1 hover:text-blue-400 transition-all">Home</a>
      </div>
    </nav>
  )
}