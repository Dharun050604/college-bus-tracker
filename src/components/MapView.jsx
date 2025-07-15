import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { db } from "../firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import styles from "./MapView.module.css";
import busIconUrl from "../assets/bus.png";
import stopIconUrl from "../assets/stop.png";

function RecenterMap({ lat, lon }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lon]);
  }, [lat, lon, map]);
  return null;
}

// 🔷 Bus icon
const busIcon = L.icon({
  iconUrl: busIconUrl,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// 🔷 Stop icon
const stopIcon = L.icon({
  iconUrl: stopIconUrl,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

function MapView() {
  const [busLocation, setBusLocation] = useState(null);
  const [stops, setStops] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "buses", "bus1"), (docSnap) => {
      const data = docSnap.data();
      if (data?.current_location?.lat != null && data?.current_location?.lon != null) {
        console.log("📍 Bus Location from Firestore:", data.current_location);
        setBusLocation(data.current_location);
      }
    });

    async function fetchRoute() {
      const routeDoc = await getDoc(doc(db, "routes", "route1"));
      if (routeDoc.exists()) {
        setStops(routeDoc.data().stops);
      }
    }
    fetchRoute();

    return () => unsub();
  }, []);

  if (!busLocation) {
    return <div className={styles.loader}>Loading bus location…</div>;
  }

  return (
    <MapContainer
      center={[busLocation.lat, busLocation.lon]}
      zoom={16}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {/* Recenter map on busLocation change */}
      <RecenterMap lat={busLocation.lat} lon={busLocation.lon} />

      {/* Bus Marker with custom icon */}
      <Marker position={[busLocation.lat, busLocation.lon]} icon={busIcon}>
        <Popup>🚌 College Bus: Main Campus Route</Popup>
      </Marker>

      {/* Route Polyline */}
      {stops.length > 1 && (
        <Polyline
          positions={stops.map((stop) => [stop.lat, stop.lon])}
          pathOptions={{ color: "blue", weight: 4, opacity: 0.7 }}
        />
      )}

      {/* Stop Markers with custom stop icon */}
      {stops.map((stop, idx) => (
        <Marker
          key={idx}
          position={[stop.lat, stop.lon]}
          icon={stopIcon}
        >
          <Popup>📍 Stop: {stop.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;
