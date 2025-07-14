"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

type Profile = {
  id: string;
  name: string;
  relation: string;
  userId: string;
};

export default function ProfilesPage() {
  const { data: session, status } = useSession();
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [profiles, setProfiles] = useState<Profile[]>([]);

  const fetchProfiles = async () => {
    try {
      const res = await axios.get("/api/profiles");
      setProfiles(res.data);
    } catch (err) {
      console.error("Failed to fetch profiles", err);
    }
  };

  const handleSubmit = async () => {
    if (!name || !relation) return alert("Please fill all fields");

    try {
      const res = await axios.post("/api/profiles", {
        name,
        relation,
      });

      if (res.status === 201) toast.success("Profile added successfully");

      setName("");
      setRelation("");
      fetchProfiles(); // Refresh the list
    } catch (err) {
      console.error("Failed to add profile", err);
      toast.error("Error during adding profile");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/profiles/${id}`);
      toast.success("Profile deleted");
      fetchProfiles(); // Refresh the list
    } catch (err) {
      console.error("Failed to delete profile", err);
      toast.error("Failed to delete profile");
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchProfiles();
    }
  }, [status]);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-green-400">Manage Profiles</h1>

        {/* Profile Form */}
        <div className="space-y-4 bg-zinc-900 p-6 rounded-xl shadow-lg border border-zinc-700">
          <input
            type="text"
            placeholder="Name (e.g. Dad)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="Relation (e.g. Father)"
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 hover:bg-green-600 transition-all duration-200 text-white font-semibold px-4 py-3 rounded-lg shadow-md"
          >
            Add Profile
          </button>
        </div>

        <hr className="border-zinc-700" />

        {/* Profile List */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Profiles</h2>
          {profiles.length > 0 ? (
            <ul className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              {profiles.map((profile) => (
                <li
                  key={profile.id}
                  className="p-4 bg-white/10 backdrop-blur-sm rounded-xl shadow-md border border-white/20 flex justify-between items-center"
                >
                  <div>
                    <p className="text-lg font-semibold text-white capitalize">
                      {profile.name}
                    </p>
                    <p className="text-sm text-gray-300 capitalize">
                      {profile.relation}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(profile.id)}
                    className="ml-4 text-black bg-red-500 py-2 px-2 rounded-md text-sm hover:text-zinc-50 font-semibold"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No profiles found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
