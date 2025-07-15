"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { error } from "console";

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
  const [showModal, setShowModal] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState("");
  const [medicineName, setMedicineName] = useState("");
  const [diseases, setDiseases] = useState("");
  const [dose, setDose] = useState(1);

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
      fetchProfiles();
    } catch (err) {
      console.error("Failed to add profile", err);
      toast.error("Error during adding profile");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/profiles/${id}`);
      toast.success("Profile deleted");
      fetchProfiles();
    } catch (err) {
      console.error("Failed to delete profile", err);
      toast.error("Failed to delete profile");
    }
  };

  const handleAddMedician = async () => {
    
    if(medicineName && diseases && dose && selectedProfileId ){
    const x = await axios.get(`/api/profiles/${selectedProfileId}`)
    console.log(x)
    try {
      const res = await axios.post("/api/addmedician", {
        name: medicineName,
        dieases:diseases ,
        dose :dose,
        profileId :selectedProfileId,
      })
      if(res.status===201){
        setDiseases("")
        setDose(1)
        setMedicineName("")
        toast.success(`Medician added in ${x?.data[0]?.name}`)
      }
     
    } catch (error) {
      console.log(error)

    }
  }else{
    toast.error("Opps something went wrong!")
  }

  }




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

                  <div className="flex gap-2">
                    

                    <button
                      onClick={() => { setShowModal(true), setSelectedProfileId(profile.id) }}
                      className="text-white bg-blue-500 py-2 px-3 rounded-md text-sm hover:bg-blue-600 font-semibold"
                    >
                      Add Medicine
                    </button>
                    <button className="bg-white text-black font-semibold rounded-md px-1">see all med</button>
                    <button
                      onClick={() => handleDelete(profile.id)}
                      className="text-black bg-red-500 py-2 px-2 rounded-md text-sm hover:text-zinc-50 font-semibold"
                    >
                      Delete
                    </button>
                    
                  </div>
                </li>

              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No profiles found.</p>
          )}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-zinc-900 p-6 rounded-xl shadow-lg w-full max-w-md space-y-4 border border-zinc-700">
            <h3 className="text-xl font-bold text-green-400">Add Medicine</h3>

            <input
              type="text"
              placeholder="Medicine Name"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
            required
              type="text"
              placeholder="Diseases"
              value={diseases}
              onChange={(e) => setDiseases(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
            required
              type="number"
              placeholder="Dose"
              value={dose}
              onChange={(e) => setDose(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMedician}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
