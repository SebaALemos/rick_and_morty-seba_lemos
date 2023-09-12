import { useState, useEffect } from 'react';
import './App.css';
import Cards from './components/Cards/Cards.jsx';
import NavBar from "./components/NavBar/NavBar";
import axios from "axios"
import { Routes, Route, useLocation, useNavigate} from "react-router-dom";
import About from "./components/About/About.jsx";
import Detail from "./components/Detail/Detail.jsx";
import Form from './components/Form/Form';
import Favorites from './components/favorites/favorites';

function App() {

   const [characters, setCharacters] = useState([]);
   const [access, setAccess] = useState(false);
   const username = "sebalemos@gmail.com";
   const password = "123456";
   const navigate  = useNavigate();

   function login(userData) {
      if(userData.password === password && userData.username === username) {
         setAccess(true);
         navigate("/home");
      }
   }

   useEffect(() => {
      !access && navigate("/home");
   }, [access]);

   function onSearch(id) {
      axios(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
         } else {
            window.alert('¡No hay personajes con este ID!');
         }
      });
   }

   const onClose = id => {
      setCharacters(characters.filter(char => char.id !== id));
   }

   const location = useLocation();
   

   return (
      <div className='App' style={{padding: "25px"}} >
         {location.pathname !== "/" && <NavBar onSearch={onSearch} /> }
         <hr />
         <Routes>
         <Route 
         exact path='/' element={<Form login={login} />} 
         />
         <Route 
         path="/about" element={<About />} 
         />
         <Route 
         path="/home" element={
            <Cards characters={characters} onClose={onClose}/>
         } 
         />
         <Route 
         path="/detail/:detailId" element={<Detail />} 
         />
         <Route
         path ="/favorites"
         element={<Favorites onClose={onClose} />} 
         />
         <Route
         path ="*"
         element={<About />} 
         />
         </Routes>

      </div>
   );
}

export default App;
