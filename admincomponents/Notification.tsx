"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import anime from "animejs";
import { X, Trash2 } from "lucide-react";

interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  isNew: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "New inspection assigned",
    description: "QW0001 - Pepsi Asia",
    time: "Now",
    isNew: true,
  },
  {
    id: 2,
    title: "New inspection assigned",
    description: "AR5567 - Pepsi Europe",
    time: "1h ago",
    isNew: true,
  },
  {
    id: 3,
    title: "Inspection import",
    description: "has been successfully created",
    time: "4h ago",
    isNew: true,
  },
  {
    id: 4,
    title: "Terms of use",
    description: "was updated tempus",
    time: "05 May 2019",
    isNew: false,
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  const deleteAll = () => {
    anime({
      targets: ".notification",
      opacity: 0,
      duration: 500,
      easing: "easeInOutQuad",
    });
    setTimeout(() => setNotifications([]), 500);
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const openNotification = (notif: Notification) => {
    setSelectedNotification(notif);
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, isNew: false } : n))
    );
  };

  return (
      <motion.div
        className="max-w-4xl mx-auto my-10 rounded-2xl p-6 bg-gray-50 shadow-lg border border-gray-300"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <button
            onClick={deleteAll}
            className="text-red-500 hover:text-red-700"
          >
            Delete All
          </button>
        </div>
        <div className="mt-4 space-y-2 max-h-96 overflow-y-auto">
          {notifications.map((notif) => (
            <motion.div
              key={notif.id}
              className={`notification flex justify-between items-center p-3 rounded-lg cursor-pointer transition-all ${
                notif.isNew
                  ? "bg-rose-100"
                  : "bg-gray-200"
              } hover:bg-blue-100 `}
              onClick={() => openNotification(notif)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex items-center space-x-2">
                {notif.isNew && (
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                )}
                <div>
                  <p className="font-bold">{notif.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {notif.description}
                  </p>
                  <p className="text-xs text-gray-400">{notif.time}</p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNotification(notif.id);
                }}
                className="text-gray-500 hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
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
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 relative">
              <button
                className="absolute top-2 right-2"
                onClick={() => setSelectedNotification(null)}
              >
                <X className="w-5 h-5 text-gray-600 hover:text-red-500" />
              </button>
              <h3 className="text-lg font-bold">
                {selectedNotification.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {selectedNotification.description}
              </p>
              <p className="mt-2 text-xs text-gray-400">
                {selectedNotification.time}
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
  );
}
