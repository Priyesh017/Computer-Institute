import React, { useEffect, useRef } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import Hls from "hls.js";

type Props = {
  src: string; // must be .m3u8
};

const ReactPlyrExample = ({ src }: Props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<Plyr | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        const qualityOptions = hls!.levels
          .map((l) => l.height)
          .sort((a, b) => b - a);

        playerRef.current = new Plyr(video, {
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
          settings: ["quality", "speed"],
          speed: {
            selected: 1,
            options: [0.5, 0.75, 1, 1.25, 1.5, 2],
          },
          quality: {
            default: qualityOptions[0],
            options: qualityOptions,
            forced: true,
            onChange: (newQuality: number) => {
              const level = hls!.levels.findIndex(
                (l) => l.height === newQuality
              );
              if (level !== -1) hls!.currentLevel = level;
            },
          },
        });
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      playerRef.current = new Plyr(video); // Only here for Safari
    }

    return () => {
      hls?.destroy();
      playerRef.current?.destroy();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className=" w-full rounded-lg border-2 border-red-500"
    />
  );
};

export default ReactPlyrExample;
