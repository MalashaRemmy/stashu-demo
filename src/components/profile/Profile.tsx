// src/pages/Profile.tsx
import React from "react";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user } = useAuth(); // useAuth now provides the current user

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <p className="text-gray-500">No user is logged in.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-8">
      <h1 className="text-3xl font-bold text-blue-700">Profile</h1>
      <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-200/50">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <p className="mt-1 text-gray-900 font-medium">{user.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-gray-900 font-medium">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
