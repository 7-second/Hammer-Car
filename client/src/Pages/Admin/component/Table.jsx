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
      // Show a confirmation before deletion
      const confirmDelete = window.confirm("Are you sure you want to delete this user?");
      if (confirmDelete) {
        // Make the API request to delete the user
        const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}user/${id}`);
        
        if (response.status === 200) {
          // Update the state to remove the user from the UI
          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
          alert("User deleted successfully!");
        } else {
          alert("Failed to delete user.");
        }
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user due to an error.");
    }
  };

  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden flex flex-col p-4 gap-4 bg-white shadow-lg rounded-lg">
        {users?.map((row) => (
          <div key={row?._id} className="flex justify-between items-center border-b pb-4">
            <div className="flex-1">
              <div className="font-semibold text-sm">{row?.username}</div>
              <div className="text-xs text-gray-500">{row?.email}</div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="font-medium text-xs text-gray-400">{row?.role}</div>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(row?._id)} // Delete user by ID
                className="text-xs"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Large Screen */}
      <div className="hidden md:flex p-4 bg-white shadow-lg rounded-lg">
        <TableContainer component={Paper} className="w-full">
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
              {users.length > 0 && users.map((row) => (
                <TableRow key={row?._id}>
                  <TableCell>{row?._id}</TableCell>
                  <TableCell align="right">{row?.username}</TableCell>
                  <TableCell align="right">{row?.email}</TableCell>
                  <TableCell align="right">{row?.role}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(row?._id)} // Delete user by ID
                      className="text-xs"
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
