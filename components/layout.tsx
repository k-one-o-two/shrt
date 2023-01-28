import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';

export interface ILayputProps {
  children: JSX.Element | JSX.Element[];
}

export function Layout({ children }: ILayputProps) {
  return (
    <Paper
      sx={{
        minHeight: '100vh',
      }}
      className="App"
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">shrt!</Typography>
        </Toolbar>
      </AppBar>
      <Paper sx={{ p: 2 }}>{children}</Paper>
    </Paper>
  );
}
