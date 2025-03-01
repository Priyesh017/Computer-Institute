"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import anime from "animejs";
import { X, Trash2 } from "lucide-react";

interface Notification {
  id: number;
  name: string;
  email: string;
  description: string;
  time: string;
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    name: "John Doe",
    email: "foo@example.com",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore iste nam accusantium soluta ducimus quis tenetur repudiandae nemo alias. Itaque quam, aliquam labore excepturi magni ratione odit repudiandae numquam rem.",
    time: "Now",
  },
  {
    id: 2,
    name: "John Doe",
    email: "foo@example.com",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore iste nam accusantium soluta ducimus quis tenetur repudiandae nemo alias. Itaque quam, aliquam labore excepturi magni ratione odit repudiandae numquam rem. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore iste nam accusantium soluta ducimus quis tenetur repudiandae nemo alias. Itaque quam, aliquam labore excepturi magni ratione odit repudiandae numquam rem.",
    time: "1h ago",
  },
  {
    id: 3,
    name: "John Doe",
    email: "foo@example.com",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore iste nam accusantium soluta ducimus quis tenetur repudiandae nemo alias. Itaque quam, aliquam labore excepturi magni ratione odit repudiandae numquam rem.",
    time: "4h ago",
  },
  {
    id: 4,
    name: "John Doe",
    email: "foo@example.com",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore iste nam accusantium soluta ducimus quis tenetur repudiandae nemo alias. Itaque quam, aliquam labore excepturi magni ratione odit repudiandae numquam rem.",
    time: "05 May 2019",
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
      className="min-w-4xl min-h-80vh] mx-auto rounded-2xl p-6 bg-gray-50 shadow-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Enquiry</h2>
        {/* <button onClick={deleteAll} className="text-red-500 hover:text-red-700">
          Delete All
        </button> */}
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
                {notif.description}
              </p>
              <p className="text-xs text-gray-400">{notif.time}</p>
            </div>
            {/* <button
              onClick={(e) => {
                e.stopPropagation();
                deleteNotification(notif.id);
              }}
              className="text-gray-500 hover:text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </button> */}
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
