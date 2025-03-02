"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetcherWc } from "@/helper";
import Loader from "@/components/Loader";
interface idata {
  data: Notification[];
}
interface Notification {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function Notifications() {
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const { isPending, error, data } = useQuery<idata>({
    queryKey: ["repoData"],
    queryFn: () => fetcherWc("/FetchAllEnquiry", "GET"),
  });
  if (isPending) {
    <Loader />;
    return;
  }
  if (error) return;

  const notifications = data.data;
  const openNotification = (notif: Notification) => {
    setSelectedNotification(notif);
  };

  return (
    <motion.div
      className="min-w-4xl min-h-80vh] mx-auto rounded-2xl p-6 bg-gray-50 shadow-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Enquiry</h2>
      </div>
      <div className="mt-4 space-y-2 h-full overflow-y-auto">
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            className="notification flex justify-between items-center p-3 rounded-lg cursor-pointer transition-all bg-gray-200 hover:bg-blue-200"
            onClick={() => openNotification(notif)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex flex-col max-h-20">
              <p className="font-semibold text-red-600">{notif.name}</p>
              <p className="font-bold">{notif.email}</p>
              <p className="text-sm text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis max-w-xs md:max-w-4xl">
                {notif.message}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(notif.createdAt).toDateString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedNotification && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedNotification(null)}
        >
          <div className="bg-white p-6 rounded-lg max-w-[70%] relative">
            <button
              className="absolute top-2 right-2"
              onClick={() => setSelectedNotification(null)}
            >
              <X className="w-5 h-5 text-gray-600 hover:text-red-500" />
            </button>
            <p className="font-semibold text-red-600">
              {selectedNotification.name}
            </p>
            <h3 className="text-lg font-bold">{selectedNotification.email}</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {selectedNotification.message}
            </p>
            <p className="mt-2 text-xs text-gray-400">
              {new Date(selectedNotification.createdAt).toDateString()}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
