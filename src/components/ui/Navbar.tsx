import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-blue-800 text-white shadow-sm z-10">
      <div className="px-6 py-3 flex justify-between items-center">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <span className="text-xl font-bold">StashU</span>
        </Link>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </button>
          <div className="relative">
            <button className="flex items-center space-x-2 focus:outline-none">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-sm font-medium">U</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}