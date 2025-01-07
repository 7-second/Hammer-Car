// &nbsp; is used to add space between the text and the next text

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function ShowTable({users}) {
  return (
    <>
    <div className=" md:hidden  flex">

    
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length && users?.map((row) => (
            <TableRow
              key={row?._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              <TableCell align="right">{row?._id}</TableCell>
              <TableCell align="right">{row?.username}</TableCell>
              <TableCell align="right">{row?.email}</TableCell>
              <TableCell align="right">{row?.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>


    {/* larg screen */}
    <div className="hidden   md:flex">

    
<TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
    <TableHead>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell align="right">Name</TableCell>
        <TableCell align="right">Email</TableCell>
        <TableCell align="right">Role</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {users.length && users?.map((row) => (
        <TableRow
          key={row?._id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>     
          <TableCell align="right">{row?._id}</TableCell>
          <TableCell align="right">{row?.username}</TableCell>
          <TableCell align="right">{row?.email}</TableCell>
          <TableCell align="right">{row?.role}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
</div>

    </> );
}