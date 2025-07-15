College Bus Tracker

A web application to track college buses live, with an admin panel to simulate or update bus locations, and a passenger-friendly map view of stops and routes.

Built using React, Firebase Firestore, and Leaflet.js.

---

Features

- Live tracking of the bus on a map  
- Route polyline with all stops marked  
- Custom bus and stop icons for better UX  
- Admin panel to update/simulate bus position  
- Firestore as the real-time database  
- Responsive design for mobile & desktop

---

Tech Stack

- React.js (Vite or CRA)
- Firebase Firestore (real-time updates)
- Leaflet.js (interactive maps)
- CSS modules

---

Folder Structure

src/
├── assets/
│   └── bus.png
├── components/
│   ├── MapView.jsx
│   ├── AdminPanel.jsx
│   └── Simulator.jsx
├── firebase.js
├── App.js
└── index.js

---

Future Improvements

- ETA calculation for passengers
- User authentication for admin
- Notifications for bus arrival
- Real GPS tracking via driver’s phone

---

Author

Built by Dharun

Contributions & feedback welcome!
