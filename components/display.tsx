"use client";

import { motion } from "framer-motion";
import anime from "animejs";
import { useEffect } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { fetcherWc } from "@/helper";

interface idata {
  success: boolean;
  data2: {
    name: string;
    id: number;
    DistrictName: string;
    imgUrl: string;
  };
}
export default function CoordinatorCard() {
  const {
    isPending,
    error,
    data: coordinator,
  } = useQuery<idata>({
    queryKey: ["repoData"],
    queryFn: () => fetcherWc("/Fetch_Coordinator", "GET"),
    staleTime: 1000 * 60 * 100,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    anime({
      targets: ".coordinator-card",
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(200),
      duration: 800,
      easing: "easeOutQuad",
    });
  }, []);

  if (isPending || !coordinator) return;

  return (
    <div className="fixed top-0 right-0 flex flex-wrap justify-center gap-3 p-2">
      <motion.div
        key={coordinator.data2.id}
        className="flex flex-row justify-center items-center gap-3 w-fit p-2 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg overflow-hidden hover:scale-105 transition-transform"
        whileHover={{ scale: 1.05 }}
      >
        <Image
          src={coordinator.data2.imgUrl}
          alt={coordinator.data2.name}
          width={160}
          height={160}
          className="w-16 h-16 object-cover rounded-full"
        />
        <div className="">
          <h3 className="text-lg font-semibold text-gray-800">
            {coordinator.data2.name}
          </h3>
          <p className="text-sm text-gray-500">District Coordinator</p>
        </div>
      </motion.div>
    </div>
  );
}
