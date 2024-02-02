import axios from 'axios'
import {useState} from 'react'

export default function Profile() {
    const [result, setResult] = useState(null)

    if(result == null) {
        axios.get('http://localhost:8081/show').then((response) => {
            console.log(JSON.stringify(response.data));
            setResult(response.data);
        })
        return (
            <div>
                There is No Data to Display
            </div>
        );
    }
    else {
        return(
            <div>
                The User Data is Given Below <br/><br/>
                <table border="1">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
                {result.map((user) => {
                    return(
                        <tr>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                        </tr>
                    );
                })}
                </table>
            </div>
        );
    }
    
}