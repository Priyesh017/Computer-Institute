"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { fetcherWc } from "@/helper";
import ConfirmationModal from "@/components/ConfirmationModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "@/components/Loader";

type Branch = {
  id: string;
  Centername: string;
  admin: {
    name: string;
    id: number;
  };
};

export default function BranchesPage() {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const {
    data: branches,
    isLoading,
    isError,
  } = useQuery<Branch[]>({
    queryKey: ["Admins"],
    queryFn: () => fetcherWc("/All_Center", "GET"),
    staleTime: 1000 * 60 * 10,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const openModal = useCallback((id: number) => {
    setSelectedBranchId(id);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedBranchId(null);
    setIsModalOpen(false);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!selectedBranchId) return;
    setLoading(true);
    try {
      const data = await fetcherWc("/Delete_Admin", "DELETE", {
        id: Number(selectedBranchId),
      });

      if (data.success) queryClient.invalidateQueries({ queryKey: ["Admins"] });
      toast(
        data.success
          ? "Branch deleted successfully."
          : "Failed to delete branch"
      );
    } catch (error) {
      console.log(error);
      toast("Unknown error");
    } finally {
      closeModal();
      setLoading(false);
    }
  }, [selectedBranchId, queryClient, closeModal]);

  if (isLoading) return <Loader />;

  if (branches == undefined || isError) return <h1>error happened</h1>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">All Branches</h2>

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
              <div>
                <h4 className="font-semibold text-lg text-zinc-800">
                  {branch.admin.name}
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
              onClick={() => openModal(branch.admin.id)}
              className="w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </motion.div>
        ))}
      </div>

      {isModalOpen && (
        <ConfirmationModal
          loading={loading}
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
