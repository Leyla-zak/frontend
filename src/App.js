import { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Grid, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getEvents } from './api'; // Импорт только ОДИН раз
import ThreatMap from './components/ThreatMap';

// Создаем темную тему
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

// Компонент для отображения уровня угрозы
const SeverityBadge = ({ value }) => {
  const level = value > 7 ? 'error' : value > 4 ? 'warning' : 'success';
  return (
    <span style={{
      color: level === 'error' ? '#ff4444' : level === 'warning' ? '#ffbb33' : '#00C851',
      fontWeight: 'bold'
    }}>
      {value}/10
    </span>
  );
};

// Колонки для таблицы
const columns = [
  { 
    field: 'timestamp', 
    headerName: 'Время', 
    width: 200,
    valueFormatter: (params) => new Date(params.value).toLocaleString()
  },
  { field: 'source_ip', headerName: 'IP адрес', width: 150 },
  { field: 'event_type', headerName: 'Тип события', width: 200 },
  { 
    field: 'severity', 
    headerName: 'Уровень угрозы', 
    width: 150,
    renderCell: (params) => <SeverityBadge value={params.value} />
  }
];

// Функция геокодирования IP (объединенная версия)
const geocodeIP = (ip) => ({
  lat: 50 + Math.random() * 10 - 5,
  lng: 30 + Math.random() * 20 - 10
});

// Главный компонент приложения
export default function App() {
  const [events, setEvents] = useState([]);
  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEvents();
        const data = response.data || [];
        
        setEvents(data);
        
        const threatsWithCoords = data.map(event => ({
          ...event,
          ...geocodeIP(event.source_ip)
        }));
        setThreats(threatsWithCoords);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Мониторинг угроз безопасности
        </Typography>

        {/* Карточки статистики */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary">Всего событий</Typography>
                <Typography variant="h4">{events.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Добавьте другие карточки по аналогии */}
        </Grid>

        {/* Карта угроз */}
        <ThreatMap threats={threats} loading={loading} />

        {/* Таблица событий */}
        <div style={{ height: 600, width: '100%', marginTop: '20px' }}>
          <DataGrid
            rows={events}
            columns={columns}
            loading={loading}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
          />
        </div>
      </Container>
    </ThemeProvider>
  );
}