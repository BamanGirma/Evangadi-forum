import {useState,useEffect,createContext} from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import {Routes,Route,useNavigate} from 'react-router-dom'
import axios from './axiosConfig'

export const AppState =createContext();
function App() {
  const [user, setuser] = useState();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
   async function checkUser() {
     try {
       const {data} = await axios.get("/users/check",{
          headers:{
            Authorization:'Bearer ' + token
          }
       });
       setuser(data);
     } catch (error) {
       console.log(error.response);
       navigate("/login");
     }
   }
  useEffect(() => { 
    checkUser();
  }, [])
  
  
  return (
    <AppState.Provider value={{ user,setuser }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AppState.Provider>
  );
}

export default App
