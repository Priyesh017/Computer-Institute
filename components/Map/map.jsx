"use client"; // Ensures this runs only on the client

import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { renderToStaticMarkup } from "react-dom/server";
import { markers } from "@/data/index";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

const MapComponent = () => {
  const [L, setL] = useState(null);

  useEffect(() => {
    (async () => {
      const leaflet = await import("leaflet");
      setL(leaflet);
    })();
  }, []);

  if (!L) return null; // Prevent rendering until Leaflet is available

  // Create a custom icon
  const createIcon = () => {
    const svg = renderToStaticMarkup(
      <FaMapMarkerAlt style={{ fontSize: "20px", color: "red" }} />
    );
    return new L.Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(svg)}`,
      iconSize: [38, 38],
    });
  };

  const customIcon = createIcon();

  // Markers data

  return (
    <MapContainer
      center={[22.913277978815863, 87.0079102124601]}
      zoom={8}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "70%" }}
      className="relative top-5 md:top-[-20] md:min-w-[50%] min-w-fit max-h-72 md:max-h-full z-10"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position} icon={customIcon}>
          <Popup>{marker.label}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
