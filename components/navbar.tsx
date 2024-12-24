import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname(); // Get the current route to highlight the active link

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <Link href="/" className="text-3xl font-bold">
            Recipe Viewer
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link
            href="/"
            className={`text-xl px-4 py-2 rounded-lg hover:bg-gray-700 transition ${
              pathname === "/" ? "bg-gray-700" : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/favorites"
            className={`text-xl px-4 py-2 rounded-lg hover:bg-gray-700 transition ${
              pathname === "/favorites" ? "bg-gray-700" : ""
            }`}
          >
            Favorites
          </Link>
        </div>
      </div>
    </nav>
  );
}
