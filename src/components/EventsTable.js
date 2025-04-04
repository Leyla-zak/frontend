import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'timestamp', headerName: 'Time', width: 200 },
  { field: 'source_ip', headerName: 'Source IP', width: 150 },
  { field: 'event_type', headerName: 'Event Type', width: 200 },
  { 
    field: 'severity', 
    headerName: 'Severity', 
    renderCell: (params) => (
      <SeverityBadge value={params.value} />
    )
  }
];

export default function EventsTable({ events }) {
  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={events}
        columns={columns}
        pageSize={10}
      />
    </div>
  );
}