import { Chip } from '@mui/material';

const colors = {
  high: 'error',
  medium: 'warning',
  low: 'success'
};

export default function SeverityBadge({ value }) {
  const level = value > 7 ? 'high' : value > 4 ? 'medium' : 'low';
  return (
    <Chip 
      label={`Level ${value}`}
      color={colors[level]}
      variant="outlined"
    />
  );
}