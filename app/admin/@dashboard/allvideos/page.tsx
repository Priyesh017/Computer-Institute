"use client";
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
  () => import("@/components/VideoComp"),
  { ssr: false }
);

const Page = () => {
  return <DynamicComponentWithNoSSR />;
};

export default Page;
