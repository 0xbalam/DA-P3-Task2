import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FC } from 'react';

const SplTokensTable: FC<{tokenList: any[]}> = ({ tokenList }) => {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Mint Id</TableCell>
                        <TableCell align="left">Tokens</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tokenList.map((token) => (
                        <TableRow
                        key={token.mintAddress}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">{token.mintAddress}</TableCell>
                            <TableCell align="right">{token.tokenBalance}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SplTokensTable;