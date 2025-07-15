import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MapView from "./components/MapView";
import AdminPanel from "./components/AdminPanel";
import Simulator from "./components/Simulator";

function App() {
  return (
    <BrowserRouter>
      <nav
        style={{
          backgroundColor: "#0077cc",
          color: "white",
          padding: "0.75rem 1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          College Bus Tracker
        </div>
        <div>
          <Link
            to="/"
            style={{
              color: "white",
              marginRight: "1rem",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            Map
          </Link>
          <Link
            to="/admin"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            Admin Panel
          </Link>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <MapView />
              <Simulator />
            </>
          }
        />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>

      <footer
        style={{
          textAlign: "center",
          marginTop: "2rem",
          padding: "1rem",
          color: "#666",
          fontSize: "0.9rem",
        }}
      >
        © 2025 College Bus Tracker
      </footer>
    </BrowserRouter>
  );
}

export default App;
