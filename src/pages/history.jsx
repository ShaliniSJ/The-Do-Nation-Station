import History from '../components/History'
import Navbar from '../components/Navbar'
import { useState,useEffect } from 'react';
const  history=()=> {
const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const islogged = localStorage.getItem('islogged');
      setIsLogged(Boolean(islogged));
    }
  }, [isLogged]);
    return( 
        <div>
            <Navbar islogged={isLogged} />
            <History/>
        </div>
    )
    }
export default history