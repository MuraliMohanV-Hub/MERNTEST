import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';

export default function Entry() {

    function handleSubmit() {
        console.log({
            sid: document.getElementById("idsid").value,
            sname: document.getElementById("idsname").value,
            pstatus: document.getElementsByName("status")[0].value,
            scompany: document.getElementById("idscompany").value,
            sctc: document.getElementById("idsctc").value
        })
        axios.post('http://localhost:8081/entry', {
            sid: document.getElementById("idsid").value,
            sname: document.getElementById("idsname").value,
            pstatus: document.getElementsByName("status")[0].value,
            scompany: document.getElementById("idscompany").value,
            sctc: document.getElementById("idsctc").value
        }).then((response) => {
            console.log(response.data);
        })
    }

    function handleUpdate() {
        axios.put('http://localhost:8081/entry', {
            sid: document.getElementById("idsid").value,
            sname: document.getElementById("idsname").value,
            pstatus: document.getElementsByName("status")[0].value,
            scompany: document.getElementById("idscompany").value,
            sctc: document.getElementById("idsctc").value
        }).then((response) => {
            console.log(response.data);
        })
    }

    return(
        <div>
            Student ID: <input type="text" name="sid" id="idsid" /> <br/><br/>
            Student Name: <input type="text" name="sname" id="idsname" /> <br/><br/>
            Placement Status: 
            <Select
                  id="idstatus"
                  label="Status"
                  name="status" 
                  defaultValue="select"
                >
                  <MenuItem value="select">Select Placement Status</MenuItem>
                  <MenuItem value="Placed">Placed</MenuItem>
                  <MenuItem value="Not Placed">Not Placed</MenuItem>
            </Select> <br/><br/>
            Company Name: <input type="text" name="scompany" id="idscompany" /> <br/><br/>
            CTC: <input type="text" name="sctc" id="idsctc" /> <br/><br/>
            <button onClick={handleSubmit}> Save Data </button>
            <button onClick={handleUpdate}> Update Data </button>
        </div>
    );
}