"use client";

import Plyr from "plyr-react";
import "plyr-react/plyr.css";

type PlyrPlayerProps = {
  sources: {
    src: string;
    size: number; // this should be the resolution: e.g., 360, 720
  }[];
};

export default function PlyrPlayer({ sources }: PlyrPlayerProps) {
  const sourceConfig: Plyr.SourceInfo = {
    type: "video",
    title: "Video with Quality Options",
    sources: sources.map((source) => ({
      src: source.src,
      type: "video/mp4",
      size: source.size,
    })),
  };

  const options: Plyr.Options = {
    controls: [
      "play-large",
      "play",
      "progress",
      "current-time",
      "mute",
      "volume",
      "settings",
      "fullscreen",
    ],

    speed: {
      selected: 1,
      options: [0.5, 0.75, 1, 1.25, 1.5, 2],
    },
    settings: ["quality", "speed"],
    quality: {
      default: sources[0].size,
      options: sources.map((s) => s.size),
      forced: true,
      onChange: (quality: number) => {
        console.log("Quality changed to", quality);
      },
    },
  };

  return <Plyr source={sourceConfig} options={options} />;
}
