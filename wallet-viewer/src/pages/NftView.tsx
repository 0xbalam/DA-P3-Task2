import { useConnection } from '@solana/wallet-adapter-react';
import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { bundlrStorage, Metaplex, walletAdapterIdentity } from '@metaplex-foundation/js';
import { PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { useForm } from "react-hook-form";
import NftDisplay from '../components/NftDisplay';

const NftView: FC = () => {
    const { connection } = useConnection();
    const wallet = useWallet();
    const metaplex  = Metaplex.make(connection);
    const [ mintAddressTextValue, setMintAddressTextValue ] =  useState("");
    const [ imageUrl, setImageUrl ] = useState("");
    const [ nft, setNft ] = useState<any>();
    const [ mintId, setMintId] = useState("");
    const [ attributes, setAttributes] = useState<any[]>([]);
    const [ traitTypeTextField, setTraitTypeTextField ] =  useState("");
    const [ valueTextField, setValueTextField ] =  useState("");
    const { handleSubmit } = useForm();

    async function getNftData(mintAddressText: string) {
        try {
            const mintAddress = new PublicKey(mintAddressText);
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

    async function updateAttributes(traitTypeText: string, valueText: string) {
        try {
            if (nft && wallet && traitTypeText) {
                metaplex.use(walletAdapterIdentity(wallet));

                metaplex.use(bundlrStorage({
                    address: 'https://devnet.bundlr.network',
                    providerUrl: 'https://api.devnet.solana.com',
                    timeout: 60000,
                }));

                const updateJson = nft.json;
                type attributeType = {
                    trait_type?: string;
                    value?: string;
                }
                updateJson.attributes.forEach( (attribute: attributeType) => {
                    if (attribute["trait_type"] === traitTypeText) {
                        attribute["value"] = valueText
                    }
                });
                const { uri: newUri } = await metaplex.nfts().uploadMetadata(
                    
                        updateJson
                    )
                    .run();
                console.log(updateJson);
                const updatedNft = await metaplex.nfts().update(
                    {
                        nftOrSft: nft,
                        uri: newUri,
                    })
                    .run();
                getNftData(mintAddressTextValue);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const onAddressTextChange = (e: any) => {
        setMintAddressTextValue(e.target.value);
    }

    const onTraitTypeTextChange = (e: any) => {

        setTraitTypeTextField(e.target.value);
    }
    
    const onTraitValueTextChange = (e: any) => {

        setValueTextField(e.target.value);
    }

    const onSubmitAddress = async (e: any) => {
        //e.preventDefault()

        getNftData(mintAddressTextValue);
    }

    const onSubmitUpdateTrait = async (e: any) => {
       // e.preventDefault();
        
        updateAttributes(traitTypeTextField, valueTextField);
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
            <form onSubmit={handleSubmit(onSubmitAddress)}>
                <TextField id="mintAddressTextField" label="Mint Address" variant="outlined" 
                onChange={onAddressTextChange}
                value={mintAddressTextValue}/>
                <Box sx={{ p:1, m:1 }}>
                    <Button type="submit" variant="contained">Submit</Button>
                </Box>
            </form>
            <NftDisplay mintId={ mintId } imageUrl={ imageUrl } attributes={ attributes } />
            <Box sx={{ p:1, m:1 }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1}} >
                    Steps:
                    1. Connect wallet
                    2. Pick Nft address above
                    3. update one attribute
                </Typography>
                <form onSubmit={handleSubmit(onSubmitUpdateTrait)}>
                    <Grid container direction={"row"} spacing={2}>
                        <Grid item>
                            <TextField id="traitTypeTextField" label="Trait type" variant="outlined" 
                            onChange={onTraitTypeTextChange}
                            value={traitTypeTextField}/>
                        </Grid>
                        <Grid item>
                            <TextField id="valueTextField" label="value" variant="outlined" 
                            onChange={onTraitValueTextChange}
                            value={valueTextField}/>
                        </Grid>
                    </Grid>
                    <Box sx={{ p:1, m:1 }}>
                        <Button type="submit" variant="contained">Submit</Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}

export default NftView;