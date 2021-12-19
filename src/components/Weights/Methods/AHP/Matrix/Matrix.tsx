import * as React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@material-ui/core';

interface props {
  criteriaAmount: number
  matrix: number[][]
}

export default function Matrix({criteriaAmount, matrix}: props) {
  return (
    <TableContainer component={Paper} style={{margin: '2% 0'}}>
      <Table style={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Kryteria</TableCell>
            {Array(criteriaAmount).fill(0).map((col, index) => (
              <TableCell component="th" key={index}>
                C{index+1}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array(criteriaAmount).fill(0).map((row, index) => (
            <TableRow
              key={index}
            >
              <TableCell>
                C{index+1}
              </TableCell>
              {Array(criteriaAmount).fill(0).map((col, index2) => (
                <TableCell component="th" key={index+index2}>
                  {matrix[index][index2].toFixed(2)}
                </TableCell>
              ))}
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
