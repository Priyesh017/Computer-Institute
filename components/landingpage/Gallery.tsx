"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import Image from "next/image";
import { images } from "@/data/index";
import { fetcher } from "@/helper";

const GalleryWall = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [folder, setFolder] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  useEffect(() => {
    if (!folder) return;
    const fetchGalleryImages = async () => {
      try {
        const { data } = await fetcher("/fetch_aws_res", "POST", {
          Prefix: `images/${folder}`,
        });

        setGalleryImages(data as string[]);
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      }
    };

    fetchGalleryImages();
  }, [folder]);

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
    <div className="text-center px-6 pt-16 xl:pt-24">
      <motion.h2
        className="text-5xl font-bold fade-in mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Our Gallery Wall
      </motion.h2>

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
            className="max-w-fit max-h-fit rounded-lg"
            priority
          />
        </div>
      )}

      {folder ? (
        <div>
          <h2 className="text-xl font-bold mb-4 text-center">{folder}</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {galleryImages.map((src, index) => (
              <motion.div
                key={index}
                className="gallery-item relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => setFullscreenImage(src)}
              >
                <Image
                  src={src}
                  alt={folder}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-2xl"
                  priority
                />
              </motion.div>
            ))}
          </div>
          <button
            onClick={() => setFolder(null)}
            className="mt-4 px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 block mx-auto"
          >
            Back to Main Gallery
          </button>
        </div>
      ) : (
        <div ref={gridRef} className="grid md:grid-cols-4 gap-6">
          {images?.map((image, index) => (
            <motion.div
              key={index}
              className="gallery-item relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => setFolder(image.name)}
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
