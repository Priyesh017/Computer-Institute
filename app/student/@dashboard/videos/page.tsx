"use client";
import dynamic from "next/dynamic";

// Lazy load the client component to avoid SSR crash
const ReceivedVideos = dynamic(() => import("@/components/VideoComp"), {
  ssr: false,
});

export default function Page() {
  return <ReceivedVideos />;
}
