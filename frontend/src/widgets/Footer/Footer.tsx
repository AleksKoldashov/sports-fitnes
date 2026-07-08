import { Typography } from '@/ui';

export const Footer = () => (
  <Typography size="12" style={{ color: '#94a3b8', fontWeight: 500 }}>
    © {new Date().getFullYear()} SPORTS-FIT. Все права защищены. Разработано на
    React + FSD.
  </Typography>
);
