import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate} from "react-router-dom";
import axios from "axios"
import About from "./components/About/About.jsx";
import Cards from './components/Cards/Cards.jsx';
import Detail from "./components/Detail/Detail.jsx";
import Favorites from './components/favorites/favorites.jsx';
import Form from './components/Form/Form.jsx';
import NavBar from "./components/NavBar/NavBar.jsx";
import './App.css';

function App() {

   const [characters, setCharacters] = useState([]);
   const navigate  = useNavigate();
   const [access, setAccess] = useState(false);
   const username = "sebalemos@gmail.com";
   const password = "123456";

   function login(userData) {
      if(userData.password === password && userData.username === username) {
         setAccess(true);
         navigate("/home");
      } else {
         alert("Por favor ingrese sus credenciales...")
      }
   }

   useEffect(() => {
      !access && navigate("/home");
   }, [access]);

   const location = useLocation();

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
      setCharacters(characters.filter(char => char.id !== Number(id)));
   }

   

   return (
      <div className='App' style={{padding: "25px"}} >
         {location.pathname !== "/" && <NavBar onSearch={onSearch} /> }
         <hr />
         <Routes>
         <Route 
         exact path='/' 
         element={<Form login={login} />} 
         />
         <Route 
         path="/home" 
         element={<Cards characters={characters} 
         onClose={onClose}/>
         } 
         />
         <Route 
         path="/about" 
         element={<About />} 
         />
         <Route 
         path="/detail/:id" 
         element={<Detail />} 
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
