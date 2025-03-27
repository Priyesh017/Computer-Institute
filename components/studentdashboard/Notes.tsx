"use client";

import { motion } from "framer-motion";
import anime from "animejs";
import { useEffect, useState } from "react";

import Loader from "../Loader";
import { fetcher } from "@/helper";

const StackableNotes: React.FC = () => {
  const [notes, setnotes] = useState<string[]>([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    anime({
      targets: ".note-card",
      translateY: [50, 0],
      opacity: [0, 1],
      delay: anime.stagger(100, { start: 200 }),
      easing: "easeOutElastic(1, .8)",
    });

    const fetchGalleryImages = async () => {
      setloading(true);
      try {
        const { data } = await fetcher("/fetch_aws_res", "POST", {
          Prefix: `applications/notes`,
        });

        setnotes(data as string[]);

        setloading(false);
      } catch (error) {
        console.error("Error fetching gallery videos:", error);
      }
    };

    fetchGalleryImages();
  }, []);
  if (loading) return <Loader />;
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="flex flex-col space-y-4">
        {notes.map((note, index) => (
          <motion.div
            key={index}
            className="note-card relative w-full bg-gray-800 text-white p-5 rounded-lg shadow-lg border border-violet-500 cursor-pointer hover:bg-violet-700 transition"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => window.open(note, "_blank")}
          >
            <p className="text-lg font-medium">{note.split("/")[5]}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StackableNotes;
