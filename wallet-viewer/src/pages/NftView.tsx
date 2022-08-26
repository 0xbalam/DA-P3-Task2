import { useConnection } from '@solana/wallet-adapter-react';
import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { Metaplex } from '@metaplex-foundation/js';
import { PublicKey } from '@solana/web3.js';

const NftView: FC = () => {
    const { connection } = useConnection();
    const metaplex  = Metaplex.make(connection);
    const [ mintAddressTextValue, setMintAddressTextValue ] =  useState("");
    const [ nft, setNft ] = useState<any>();
    const [ imageUrl, setImageUrl ] = useState("");
    const [ mintId, setMintId] = useState("");
    const [ attributes, setAttributes] = useState<any[]>([]);

    async function getNftData() {
        try {
            const mintAddress = new PublicKey(mintAddressTextValue);
            const nft = await metaplex.nfts().findByMint({ mintAddress }).run();
            if (nft != null && nft.json != null &&  nft.json.image != null) {
                const imageUrl = nft.json.image;
                setNft(nft);
                setImageUrl(imageUrl);
                setMintId(nft.address.toBase58());
                setAttributes(nft.json.attributes as Object[]);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const onTextChange = (e: any) => {
        setMintAddressTextValue(e.target.value);
    }

    const onSubmit = async (e: any) => {
        e.preventDefault()
        getNftData();
    }

    return (
        <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            p:2,
            bgcolor: (theme) => ('white')
        }}
        alignItems="center"
        justifyContent="center">
            <form onSubmit={onSubmit}>
                <TextField id="mintAddressTextField" label="Mint Address" variant="outlined" 
                onChange={onTextChange}
                value={mintAddressTextValue}/>
            </form>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Mint Id</TableCell>
                            <TableCell align="left">{ mintId }</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Box display="flex">
                                    <img src={imageUrl}
                                    height="270px"/>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Table aria-label="simple table">
                                    <TableBody>
                                    {attributes.map((attribute:any, i:number) => (
                                        <TableRow
                                        key={ i }
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row">{ attribute.trait_type }</TableCell>
                                            <TableCell align="right">{ attribute.value }</TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default NftView;