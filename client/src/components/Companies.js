import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link } from '@mui/material';
function MyCard({ CNAME, JOBROLE,SAL,VACANCY,CURL}) {
  return (
     <Grid item xs={12} sm={6} md={3}>
       <Card style={{  color: 'black',border: '1px solid black', margin: '10px' }}>
         <CardContent>
           <Typography style={{ color: 'red' }} variant='h5'>{CNAME}</Typography>
          <Typography style={{ color: 'blue' }} variant='h6'>{JOBROLE}</Typography>
          <Typography variant='h6'>{SAL}</Typography>
          <Typography style={{ color: 'blue' }} variant='h6'>{VACANCY}</Typography>
          

<Typography variant="body2" component="span">
 <Link href={CURL} color="inherit">Visit</Link>.
</Typography>

         </CardContent>
         <CardActions>
           <Button size="small">View More</Button>
         </CardActions>
       </Card>
     </Grid>
  );
 }
 
 
function Companies() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8500/api/companies')
      .then(response => setCompanies(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); 

  const sortedCompanies = [...companies].sort((a, b) => a.CNAME - b.CNAME);//To Display ID wiseley its optional to keep

  
   
    return (
       <Grid container spacing={3}>
         {companies.map((company, CID) => (
           <MyCard key={CID} CID={company.CID} CNAME={company.CNAME} JOBROLE={company.JOBROLE} SAL={company.SAL} VACANCY={company.VACANCY} CURL={company.CURL}/>
         ))}
       </Grid>
    );
   }
   
  
export default Companies;