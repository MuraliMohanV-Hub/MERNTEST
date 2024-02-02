import {Routes,Route} from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar';
import Students from './components/Students';
import Login from './components/Login';
import Entry from './components/Entry';
import Profile from './components/Profile';
import Viewdata from './components/Viewdata';
import Upload from './components/Upload';
import OtpMail from './components/otpMail';
import VerifyOtp from './components/verifyotp';
import SendMail from './components/sendMail';
import Companies from './components/Companies';
import UploadCompanies from './components/UploadCompanies';
function App() {
  return (
    <div className="App">
       <NavigationBar/>
      <Routes>
     
        <Route path='/students' Component={Students}/>
        <Route path='/login' Component={Login}/>
        <Route path='/entry' Component={Entry}/>
        <Route path='/viewstudents' Component={Viewdata}/>
        <Route path='/uploadstudents' Component={Upload}/>
        <Route path='/sendmail' Component={SendMail}/>
        <Route path='/otpmail' Component={OtpMail}/>
        <Route path='/verifyotp' Component={VerifyOtp}/>
        <Route path='/uploadcompanies' Component={UploadCompanies}/>
        <Route path='/companies' Component={Companies}/>
      
      
      

      </Routes>
      
      </div>
  );
}

export default App;
