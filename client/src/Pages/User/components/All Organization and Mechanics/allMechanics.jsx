import { Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MechanicCard from './mechCard';
import { FaSun, FaMoon } from 'react-icons/fa';


const AllMechanics = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
      };
    useEffect(() => {
        // Fetch mechanics data from an API or database
        // fetch('/api/mechanics')
        //     .then(response => response.json())
        //     .then(data => setMechanics(data))
        //     .catch(error => console.error('Error fetching mechanics:', error));
    }, []);

    return (
       
       <>
       
      
       <div className="flex flex-wrap gap-4 justify-center">

        <MechanicCard />
        <MechanicCard />
        <MechanicCard />
        <MechanicCard />
        <MechanicCard />
        <MechanicCard />
        <MechanicCard />
       </div>
 
      </>
                
    );
};

export default AllMechanics;



  

//   useEffect(() => {
//     // Fetch mechanics data from an API or database
//     // fetch('/api/mechanics')
//     //     .then(response => response.json())
//     //     .then(data => setMechanics(data))
//     //     .catch(error => console.error('Error fetching mechanics:', error));
//   }, []);



//   return (
//     <div className={isDarkMode ? 'dark' : ''}>
//       <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800">
//         <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">All Mechanics</h1>
      
//       </div>
//       <div className="flex flex-wrap gap-4 justify-center p-4 bg-gray-100 dark:bg-gray-800">
//         <MechanicCard />
//         <MechanicCard />
//         <MechanicCard />
//         <MechanicCard />
//         <MechanicCard />
//         <MechanicCard />
//         <MechanicCard />
//       </div>
//     </div>
//   );
// };
