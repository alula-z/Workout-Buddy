
import { TableContainer, TableHead, TableRow,TableCell, TableBody} from "@mui/material";
import {Table} from '@mui/material';
export default function basketballTable(){
    return(
        <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Sport</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            </TableBody>
        </Table>
        </TableContainer>
    )
}