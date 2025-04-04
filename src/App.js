import { useState, useEffect } from 'react';
import { getEvents } from './api';

export default function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then(res => setEvents(res.data || []));
  }, []);

  return (
    <div className="App">
      <h1>Security Events</h1>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            {event.timestamp} - {event.event_type} (IP: {event.source_ip})
          </li>
        ))}
      </ul>
    </div>
  );
}

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
