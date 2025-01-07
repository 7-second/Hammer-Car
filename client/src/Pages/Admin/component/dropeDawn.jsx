import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';

export default function DropDawn() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl
      width={20}
      fullWidth>
        <InputLabel id="demo-simple-select-label">Users</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}><Link to="aduser">Users</Link> </MenuItem>
          <MenuItem value={10}><Link to="admech">Mechanics</Link> </MenuItem>
          <MenuItem value={10}><Link to="adorg">Organizations</Link> </MenuItem>
         
        </Select>
      </FormControl>
    </Box>
  );
}