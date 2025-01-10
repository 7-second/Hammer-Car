import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function ShowTable({ users, setUsers }) {
  // Function to handle user deletion
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}user/${id}`);
  
      alert(response.data.message);
  
      // Remove the user from the state after successful deletion
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden flex">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 350 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="right">ID</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Role</TableCell>
                <TableCell align="right">Actions</TableCell> {/* Added Actions column */}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length &&
                users?.map((row) => (
                  <TableRow
                    key={row?._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="right">{row?._id}</TableCell>
                    <TableCell align="right">{row?.username}</TableCell>
                    <TableCell align="right">{row?.email}</TableCell>
                    <TableCell align="right">{row?.role}</TableCell>
                    <TableCell align="right">
                      {/* Delete Button */}
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(row?._id)} // Delete user by ID
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Large Screen */}
      <div className="hidden md:flex">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Role</TableCell>
                <TableCell align="right">Actions</TableCell> {/* Added Actions column */}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length &&
                users?.map((row) => (
                  <TableRow
                    key={row?._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{row?._id}</TableCell>
                    <TableCell align="right">{row?.username}</TableCell>
                    <TableCell align="right">{row?.email}</TableCell>
                    <TableCell align="right">{row?.role}</TableCell>
                    <TableCell align="right">
                      {/* Delete Button */}
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(row?._id)} // Delete user by ID
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
