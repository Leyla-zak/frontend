import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Фикс для иконок маркеров
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Создаем кастомные иконки
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const orangeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function ThreatMap({ threats }) {
  return (
    <MapContainer 
      center={[51.505, -0.09]} 
      zoom={2} 
      style={{ height: '500px', width: '100%' }}
      className="map-container"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {threats.map((threat) => (
        <Marker 
          key={`${threat.source_ip}-${threat.timestamp}`} 
          position={[threat.lat, threat.lng]}
          icon={threat.severity > 7 ? redIcon : orangeIcon}
        >
          <Popup>
            <div>
              <strong>IP:</strong> {threat.source_ip}<br />
              <strong>Тип:</strong> {threat.event_type}<br />
              <strong>Уровень:</strong> {threat.severity}/10<br />
              <small>{new Date(threat.timestamp).toLocaleString()}</small>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}