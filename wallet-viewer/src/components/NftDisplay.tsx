import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FC } from 'react';

const NftDisplay: FC<{mintId: string, imageUrl:string, attributes: any[]}> = ({ mintId, imageUrl, attributes }) => {

    return (
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
    );
};

export default NftDisplay;