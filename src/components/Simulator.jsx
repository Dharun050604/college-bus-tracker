import { useEffect } from "react";
import { db } from "../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

function Simulator() {
  useEffect(() => {
    let intervalId;

    async function startSimulation() {
      const routeDoc = await getDoc(doc(db, "routes", "route1"));
      if (!routeDoc.exists()) return;

      const stops = routeDoc.data().stops;
      if (!stops || stops.length === 0) return;

      let i = 0;
      let direction = 1; // 1 = forward, -1 = backward

      intervalId = setInterval(async () => {
        const stop = stops[i];
        console.log("Updating bus to stop:", stop.name);

        await updateDoc(doc(db, "buses", "bus1"), {
          current_location: {
            lat: stop.lat,
            lon: stop.lon,
          },
        });

        i += direction;

        if (i >= stops.length) {
          i = stops.length - 2;
          direction = -1; // reverse
        } else if (i < 0) {
          i = 1;
          direction = 1; // forward
        }
      }, 3000); // every 3 seconds
    }

    startSimulation();

    return () => clearInterval(intervalId);
  }, []);

  return null;
}

export default Simulator;
