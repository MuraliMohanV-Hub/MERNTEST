import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

function MyCard({ID, Name, mobilenumber}) {
  return (
     <Grid item xs={12} sm={6} md={3}>
       <Card style={{  color: 'black',border: '1px solid black', margin: '10px' }}>
         <CardContent>
           <Typography style={{ color: 'red' }} variant='h5'>{ID}</Typography>
          <Typography style={{ color: 'blue' }} variant='h6'>{Name}</Typography>
          <Typography variant='h6'>{mobilenumber}</Typography>
         </CardContent>
         <CardActions>
           <Button size="small">View More</Button>
         </CardActions>
       </Card>
     </Grid>
  );
 }
 
 
function Viewdata() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8500/viewdata')
      .then(response => setStudents(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); 

  const sortedStudents = [...students].sort((a, b) => a.ID - b.ID);//To Display ID wiseley its optional to keep

  
   
    return (
       <Grid container spacing={3}>
         {students.map((student, ID) => (
           <MyCard key={ID} ID={student.ID} Name={student.Name} mobilenumber={student.mobilenumber}/>
         ))}
       </Grid>
    );
   }
   
  
export default Viewdata;