import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center bg-gray-900 text-white p-4">
      <h1 className="text-xl font-bold">StashU 💸</h1>

      {user ? (
        <div className="flex items-center gap-4">
          <span>Hi, {user.name}</span>
          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Welcome, Guest</p>
      )}
    </nav>
  );
}
