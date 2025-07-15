import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import styles from "./AdminPanel.module.css";

function AdminPanel() {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [stops, setStops] = useState([]);
  const [newStop, setNewStop] = useState({ name: "", lat: "", lon: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoute = async () => {
      const routeDoc = await getDoc(doc(db, "routes", "route1"));
      if (routeDoc.exists()) {
        setStops(routeDoc.data().stops || []);
      }
      setLoading(false);
    };
    fetchRoute();
  }, []);

  const handleBusLocationSubmit = async (e) => {
    e.preventDefault();
    const busRef = doc(db, "buses", "bus1");
    await updateDoc(busRef, {
      current_location: { lat: parseFloat(lat), lon: parseFloat(lon) },
    });
    alert("Bus location updated!");
    setLat("");
    setLon("");
  };

  const handleStopChange = (idx, field, value) => {
    const updated = [...stops];
    updated[idx][field] = field === "lat" || field === "lon" ? parseFloat(value) : value;
    setStops(updated);
  };

  const handleAddStop = () => {
    setStops([...stops, {
      name: newStop.name,
      lat: parseFloat(newStop.lat),
      lon: parseFloat(newStop.lon),
    }]);
    setNewStop({ name: "", lat: "", lon: "" });
  };

  const handleSaveStops = async () => {
    const routeRef = doc(db, "routes", "route1");
    await updateDoc(routeRef, { stops });
    alert("Route stops updated!");
  };

  if (loading) return <div className={styles.panel}>Loading stops…</div>;

  return (
    <div className={styles.panel}>
      <div className={styles.heading}>Admin Panel — Update Bus Location</div>
      <form onSubmit={handleBusLocationSubmit}>
        <input
          type="text"
          placeholder="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Longitude"
          value={lon}
          onChange={(e) => setLon(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>
          Update Location
        </button>
      </form>

      <hr style={{ margin: "2rem 0" }} />

      <div className={styles.heading}> Manage Route Stops</div>

      <table className={styles.stopsTable}>
        <thead>
          <tr>
            <th>Stop Name</th>
            <th>Latitude</th>
            <th>Longitude</th>
          </tr>
        </thead>
        <tbody>
          {stops.map((stop, idx) => (
            <tr key={idx}>
              <td>
                <input
                  className={styles.input}
                  value={stop.name}
                  onChange={(e) => handleStopChange(idx, "name", e.target.value)}
                />
              </td>
              <td>
                <input
                  className={styles.input}
                  type="number"
                  value={stop.lat}
                  onChange={(e) => handleStopChange(idx, "lat", e.target.value)}
                />
              </td>
              <td>
                <input
                  className={styles.input}
                  type="number"
                  value={stop.lon}
                  onChange={(e) => handleStopChange(idx, "lon", e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={handleSaveStops} className={styles.button}>
          Save All Stops
        </button>
      </div>

      <div className={styles.heading} style={{ marginTop: "2rem" }}>
        ➕ Add New Stop
      </div>
      <input
        placeholder="Name"
        className={styles.input}
        value={newStop.name}
        onChange={(e) => setNewStop({ ...newStop, name: e.target.value })}
      />
      <input
        placeholder="Lat"
        type="number"
        className={styles.input}
        value={newStop.lat}
        onChange={(e) => setNewStop({ ...newStop, lat: e.target.value })}
      />
      <input
        placeholder="Lon"
        type="number"
        className={styles.input}
        value={newStop.lon}
        onChange={(e) => setNewStop({ ...newStop, lon: e.target.value })}
      />
      <button onClick={handleAddStop} className={styles.button}>
        Add Stop
      </button>
    </div>
  );
}

export default AdminPanel;
