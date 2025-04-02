"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import anime from "animejs";
import { X } from "lucide-react";
import { Dropzone } from "@/components/dropzone";

interface Member {
  id: number;
  name: string;
  image: string | null; // Updated to allow data URLs
  area: string;
}

export default function EntryForm() {
  const [coordinator, setCoordinator] = useState({
    name: "",
    image: null as string | null, // Updated to allow data URLs
    district: "",
  });
  const [members, setMembers] = useState<Member[]>([]);

  const addMember = () => {
    setMembers((prev) => [
      ...prev,
      { id: Date.now(), name: "", image: null, area: "" },
    ]);
    anime({
      targets: ".member-entry",
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 500,
      easing: "easeOutElastic",
    });
  };

  const updateMember = (
    id: number,
    key: keyof Member,
    value: string | null
  ) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, [key]: value } : member
      )
    );
  };

  const handleDeleteImage = () => {
    setCoordinator((prev) => ({ ...prev, image: null }));
  };

  const removeMember = (id: number) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  };

  const onDrop = (acceptedFiles: File[], memberId?: number | "district") => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (memberId === "district") {
        // Update coordinator image with the data URL
        setCoordinator((prev) => ({ ...prev, image: reader.result as string }));
      } else if (typeof memberId === "number") {
        // Update member image with the data URL
        updateMember(memberId, "image", reader.result as string);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const formData = {
      coordinator,
      members,
    };

    console.log("Submitting Data:", formData);

    fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Data submitted successfully!");
        } else {
          alert("Failed to submit data.");
        }
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        alert("An error occurred while submitting data.");
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 text-black rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-center">Coordinator Entry</h2>

      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            District Co-Ordinator Name
          </label>
          <input
            type="text"
            placeholder="District Co-Ordinator Name"
            className="w-full p-2 rounded bg-gray-200 text-black"
            onChange={(e) =>
              setCoordinator({ ...coordinator, name: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            District Name
          </label>
          <input
            type="text"
            placeholder="District Name"
            className="w-full p-2 rounded bg-gray-200 text-black"
            onChange={(e) =>
              setCoordinator({ ...coordinator, district: e.target.value })
            }
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-start items-center w-full gap-4">
        <div className="w-full md:w-auto">
          <label
            htmlFor="profileImage"
            className="block text-sm font-medium text-gray-700"
          >
            District Co-Ordinator Image
          </label>
          <Dropzone
            onDrop={(files) => onDrop([files], "district")}
            accept="image/*"
          />
        </div>

        {coordinator.image && (
          <div className="relative w-auto h-[98.91px]">
            <motion.img
              src={coordinator.image} // Directly use the data URL
              alt="profile_image"
              className="w-32 h-32 object-cover rounded-md shadow-md"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            <button
              onClick={handleDeleteImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-700 shadow-lg"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      <h3 className="text-xl font-semibold">Sub-District Co-Ordinators</h3>
      {members.map((member) => (
        <motion.div
          key={member.id}
          className="member-entry bg-gray-100 border border-gray-300 p-4 rounded-lg space-y-2 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sub-District Co-Ordinator Name
              </label>
              <input
                type="text"
                placeholder="Sub-District Co-Ordinator Name"
                className="w-full p-2 bg-gray-200 text-black rounded-md"
                value={member.name}
                onChange={(e) =>
                  updateMember(member.id, "name", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sub-District Name
              </label>
              <input
                type="text"
                placeholder="Sub-District Name"
                className="w-full p-2 bg-gray-200 text-black rounded-md"
                value={member.area}
                onChange={(e) =>
                  updateMember(member.id, "area", e.target.value)
                }
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-start items-center w-full gap-4">
            <div className="w-full md:w-auto">
              <label
                htmlFor="profileImage"
                className="block text-sm font-medium text-gray-700"
              >
                Sub-District Co-Ordinator Image
              </label>
              <Dropzone
                onDrop={(files) => onDrop([files], member.id)}
                accept="image/*"
              />
            </div>

            {member.image && (
              <div className="relative w-auto h-[98.91px]">
                <motion.img
                  src={member.image} // Directly use the data URL
                  alt="member_image"
                  className="w-32 h-32 object-cover rounded-md shadow-md"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
                <button
                  onClick={() => removeMember(member.id)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-700 shadow-lg"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      ))}

      <button
        onClick={addMember}
        className="w-full p-2 text-white bg-violet-600 rounded-lg hover:bg-violet-500"
      >
        Add Member
      </button>
      <button
        onClick={handleSubmit}
        className="w-full p-2 text-white bg-green-600 rounded-lg hover:bg-green-500"
      >
        Submit
      </button>
    </div>
  );
}
