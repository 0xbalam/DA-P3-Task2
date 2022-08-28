import './App.css';
import NavBar from './components/NavBar';
import WalletContextProvider from './components/WalletContextProvider';
import TokenListView from './pages/TokenListView';
import NftView from './pages/NftView';
import Box from "@mui/material/Box";

function App() {
    return (
        <>
            <WalletContextProvider>
                <NavBar />
                <div className="App"  style={{ width: '100%' }}>
                <Box
                sx={{
                    display: 'flex',
                    p:2
                }}
                alignItems="center"
                justifyContent="center">
                    <TokenListView />
                </Box>
                <Box
                sx={{
                    display: 'flex',
                    p:2,
                }}
                alignItems="center"
                justifyContent="center">
                    <NftView />
                </Box>
                </div>
            </WalletContextProvider>
        </>
    );
}

export default App;