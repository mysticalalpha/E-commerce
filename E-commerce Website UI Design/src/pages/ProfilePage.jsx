import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User, LogOut } from "lucide-react";
import { toast } from "sonner";

export function ProfilePage() {
  const { user, logout, isAuthenticated, updateUser } = useAuth();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    gender: user?.gender || "",
    age: user?.age || "",
    email: user?.email || "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    updateUser({
      name: form.name,
      gender: form.gender,
      age: form.age,
      email: form.email,
    });
    toast.success("Profile updated");
    setEditing(false);
  };

  React.useEffect(() => {
    if (!isAuthenticated) navigate("/login", { replace: true });
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const initials = (user.name || user.email || "U")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-2xl font-semibold">
              {initials}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{user.name || user.email}</h1>
              <p className="text-sm opacity-90">{user.email}</p>
              <p className="mt-2 text-xs opacity-80">
                Member since{" "}
                {user.loggedAt
                  ? new Date(user.loggedAt).toLocaleDateString()
                  : "—"}
              </p>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Profile Details
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                {!editing ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Full name</span>
                      <span className="text-sm text-gray-900">{user.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Gender</span>
                      <span className="text-sm text-gray-900">
                        {user.gender || "—"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Age</span>
                      <span className="text-sm text-gray-900">
                        {user.age || "—"}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">
                        Full name
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">
                        Gender
                      </label>
                      <select
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">
                        Age
                      </label>
                      <input
                        name="age"
                        value={form.age}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-center md:justify-end gap-3">
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 text-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditing(false);
                        setForm({
                          name: user.name || "",
                          gender: user.gender || "",
                          age: user.age || "",
                          email: user.email || "",
                        });
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
