"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { fetcherWc } from "@/helper";
import ConfirmationModal from "@/components/ConfirmationModal";

type Branch = {
  id: string;
  Centername: string;
  adminName: string;
  adminImage: string;
};

export default function BranchesPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetcherWc("/All_Center", "GET");
        setBranches(response);
      } catch (error) {
        console.error("Error fetching branches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  console.log(branches);

  const openModal = (id: string) => {
    setSelectedBranchId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBranchId(null);
    setIsModalOpen(false);
  };

  const confirmDelete = async () => {
    if (!selectedBranchId) return;

    try {
      const data = await fetcherWc("/Delete_Admin", "DELETE", {
        id: Number(selectedBranchId),
      });

      console.log("Delete response:", data);
      if (data.success) {
        setBranches((prev) =>
          prev.filter((branch) => branch.id !== selectedBranchId)
        );
        toast("Branch deleted successfully.");
      } else {
        console.error("Server error:", data.message || "Unknown error");
        toast("Failed to delete branch: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Network or unexpected error:", error.message);
        toast("An error occurred: " + error.message);
      } else {
        console.error("Unexpected error:", error);
        toast("An unexpected error occurred. Please try again.");
      }
    } finally {
      closeModal();
    }
  };

  console.log("selectedBranchId:", selectedBranchId);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">All Branches</h2>

      {loading ? (
        <p className="text-center text-zinc-500">Loading...</p>
      ) : (
        <div className="space-y-4">
          {branches.map((branch, index) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white rounded-2xl shadow-md"
            >
              <div className="flex items-start sm:items-center gap-4">
                {branch.adminImage ? (
                  <Image
                    src={branch.adminImage}
                    alt={"Branch Admin Image"}
                    width={50}
                    height={50}
                    className="rounded-full border border-zinc-300"
                  />
                ) : (
                  <div className="w-12 h-12 p-1 rounded-full border border-zinc-300 bg-gray-200 flex items-center justify-center">
                    <span className="text-sm text-gray-500">No Image</span>
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-lg text-zinc-800">
                    {branch.adminName}
                  </h4>
                  <p className="text-sm text-zinc-600">
                    <span className="font-medium">Branch:</span>{" "}
                    {branch.Centername}
                  </p>
                  <p className="text-sm text-zinc-600">
                    <span className="font-medium">Branch ID:</span> {branch.id}
                  </p>
                </div>
              </div>
              <Button
                variant="destructive"
                onClick={() => openModal(branch.id)}
                className="w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            </motion.div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={confirmDelete}
          title="Delete Branch"
          message="Are you sure you want to delete this branch? This action cannot be undone."
        />
      )}
    </div>
  );
}
