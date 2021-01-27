import React ,{useEffect} from 'react'
import Navb from './Nav/Navb';
import Routes from './route/Routes'


export default function App() {
  useEffect(() => {
    document.title = "Hangeulpa : Korean conjugation practice"
 }, []);
  
   return (
    <div className="App">
      
      
        <Navb />
        <Routes/>
      
      
    
      
    </div>
    
  );
}



