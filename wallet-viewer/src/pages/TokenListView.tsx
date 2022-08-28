import SplTokensTable from '../components/SplTokenTable';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { GetProgramAccountsFilter } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';

const TokenListView: FC = () => {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [tokenList, setTokenAccounts] = useState<any[]>([])

    useEffect(() => {
        if (wallet.publicKey) {
            getSplTokenAccounts();
        }
    }, [wallet.publicKey]);

    async function getSplTokenAccounts() {

        if (wallet != null && wallet.publicKey != null) {
            const filters:GetProgramAccountsFilter[] = [
                {
                    dataSize: 165, // size of account(bytes) for SPL tokens
                },
                {
                    memcmp: {
                        offset: 32,
                        bytes: wallet.publicKey.toBase58()
                    }
                }
            ];

            try {
                const accounts = await connection.getParsedProgramAccounts(
                    TOKEN_PROGRAM_ID,
                    {filters: filters}
                );
                const tokenList: any[] = [];
                accounts.forEach((account, i ) => {
                    // Parse token account
                    const parsedAccountInfo: any = account.account.data;
                    const mintAddress: string = parsedAccountInfo["parsed"]["info"]["mint"];
                    const tokenBalance: number = parsedAccountInfo["parsed"]["info"]["tokenAmount"]["uiAmount"];
                    const token = {
                        mintAddress: mintAddress,
                        tokenBalance: tokenBalance
                    }
                    tokenList.push(token);
                });
                setTokenAccounts(tokenList);
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <>
            <Box>
                <SplTokensTable tokenList={tokenList} />
            </Box>
        </>
    );
}

export default TokenListView;