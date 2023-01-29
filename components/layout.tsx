import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';

export interface ILayputProps {
  children: JSX.Element | JSX.Element[];
}

export function Layout({ children }: ILayputProps) {
  return (
    <>
      <CssBaseline />
      <Paper>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">shrt!</Typography>
          </Toolbar>
        </AppBar>
        <Paper sx={{ p: 2 }}>{children}</Paper>
      </Paper>
    </>
  );
}
