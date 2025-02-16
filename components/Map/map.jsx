"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { FaMapMarkerAlt } from "react-icons/fa";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

// Create a custom icon using react-icons
const createIcon = () => {
  const svg = renderToStaticMarkup(
    <FaMapMarkerAlt style={{ fontSize: "20px", color: "red" }} />
  );
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(svg)}`,
    iconSize: [38, 38],
  });
};

const customIcon = createIcon();

// Markers data
const markers = [
  { position: [28.6139, 77.209], label: "New Delhi" },
  { position: [19.076, 72.8777], label: "Mumbai" },
  { position: [13.0827, 80.2707], label: "Chennai" },
  { position: [22.5726, 88.3639], label: "Kolkata" },
  { position: [12.9716, 77.5946], label: "Bangalore" },
];

// Component that renders markers
const MapMarkers = () => (
  <>
    {markers.map((marker, index) => (
      <Marker key={index} position={marker.position} icon={customIcon}>
        <Popup>{marker.label}</Popup>
      </Marker>
    ))}
  </>
);

export default function App() {
  const center_view = [20.5937, 78.9629]; // Center view of India

  return (
    <MapContainer
      center={center_view}
      zoom={5}
      style={{ height: "50vh", width: "50%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapMarkers />
    </MapContainer>
  );
}
