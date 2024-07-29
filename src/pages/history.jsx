import History from '../components/History'
import Navbar from '../components/Navbar'
import { useState,useEffect } from 'react';
const  history=()=> {
const [showAfterLogin, setShowAfterLogin] = useState(false);
const [user, setUser] = useState(null);
const [isLogged, setIsLogged] = useState(false);
const [isdonor,setIsdonor]=useState(false);

useEffect(() => {
  // Define an async function to handle the async operation
  const fetchUserData = async () => {
    if (typeof window !== 'undefined') {
      const islogged = localStorage.getItem('islogged');
      
      if(islogged === 'true') {
        setIsLogged(true);
      }
      else{
        setIsLogged(false);
      }
    }

  // Call the async function
  fetchUserData();
}}, []);

  
    return( 
        <div>
             <Navbar islogged={isLogged} />
            <History/>
        </div>
    )
    }
export default history