import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { FC } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from "@mui/material/Box";
import { grey } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

require('@solana/wallet-adapter-react-ui/styles.css');

const theme = createTheme({
  palette: {
    primary: {
        light: '#718792',
        main: '#455a64',
        dark: '#1c313a',
        contrastText: '#fff',
    },
    secondary: {
        main: grey["100"],
    },
  },
});

const NavBar: FC = () => {
    return (
            <ThemeProvider theme={theme}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1}} >
                            DA-P3-Task2
                        </Typography>
                        <WalletMultiButton />
                    </Toolbar>
                    </AppBar>
                </Box>
            </ThemeProvider>
    );
};

export default NavBar;