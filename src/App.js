import React, {useState, useEffect} from 'react';
import './App.css';
import Sitebar from './Components/Home/Navbar';
import Auth from './Components/Auth/Auth';
import NutritionIndex from './Components/Client/NutritionIndex'
import ClientIndex from './Components/Coach/ClientIndex';

function App() {
  const [sessionToken, setSessionToken] = useState('');
  const [coach, setCoach] = useState(false);        // this is used to figure out if we are going to the coaching page or the client page

  useEffect(() => {
    if(localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'));
    }
  }, []);

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  };

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
    setCoach(false);
  }

  const protectedView = () => {
    return(
       (sessionToken === localStorage.getItem('token') && (coach)) ? <ClientIndex /> 
       : (sessionToken === localStorage.getItem('token')) ? <NutritionIndex token={sessionToken}  /> 
       : <Auth updateToken={updateToken} coach={coach} setCoach={setCoach} /> 
    )
  }

  return (
    <div>
      <Sitebar clearToken={clearToken} />
      {/* <Auth updateToken={updateToken} coach={coach} setCoach={setCoach} /> */}
      {protectedView()}
      
    </div>
  );
}

export default App;
