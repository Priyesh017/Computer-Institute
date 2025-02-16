"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import Image from "next/image";
import { images } from "@/data/index";

const GalleryWall = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedGallery, setSelectedGallery] = useState<{
    name: string;
    gallery: string[];
  } | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    anime({
      targets: ".gallery-item",
      opacity: [0, 1],
      scale: [0.8, 1],
      translateY: [50, 0],
      easing: "easeOutElastic(1, .8)",
      duration: 1000,
      delay: anime.stagger(150),
    });
  }, []);

  return (
    <div className="p-6">
      <motion.h2
        className="text-5xl font-bold fade-in mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Our Gallery Wall
      </motion.h2>
      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
          onClick={() => setFullscreenImage(null)}
        >
          <Image
            src={fullscreenImage}
            alt="Fullscreen View"
            width={800}
            height={600}
            className="max-w-full max-h-full rounded-lg"
            priority
          />
        </div>
      )}

      {/* Selected Gallery View */}
      {selectedGallery ? (
        <div>
          <h2 className="text-xl font-bold mb-4 text-center">
            {selectedGallery.name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {selectedGallery.gallery.map((src, index) => (
              <motion.div
                key={index}
                className="gallery-item relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => setFullscreenImage(src)}
              >
                <Image
                  src={src}
                  alt={selectedGallery.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-2xl"
                  priority
                />
              </motion.div>
            ))}
          </div>
          <button
            onClick={() => setSelectedGallery(null)}
            className="mt-4 px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 block mx-auto"
          >
            Back to Main Gallery
          </button>
        </div>
      ) : (
        // Main Gallery View
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {(images ?? []).map((image, index) => (
            <motion.div
              key={index}
              className="gallery-item relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() =>
                setSelectedGallery({
                  name: image.name,
                  gallery: image.gallery ?? [],
                })
              }
            >
              <Image
                src={image.src}
                alt={image.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-2xl"
                priority
              />
              <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-center p-2 text-sm">
                {image.name}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryWall;
