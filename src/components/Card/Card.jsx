import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import { addFav, removeFav } from "../../redux/actions";
import { connect } from "react-redux";
import { useEffect, useState } from "react";


function Card(props) {

   const [isFav, setIsFav] = useState(false);

   useEffect(() => {
      props.allCharacters.forEach((fav) => {
         if (fav.id === props.id) {
            setIsFav(true);
         }
      });
   }, [props.allCharacters]);

   const handleFavorite = event => {
      if(isFav) {
         setIsFav(false);
         props.removeFav(props.id)
      } else {
         setIsFav(true);
         props.addFav(props);
      }
   }

   return (
      <div className={styles.container}>
         {
            isFav ? (
               <button onClick={handleFavorite}>❤️</button>
               ) : (
               <button onClick={handleFavorite}>🤍</button> )
               }
               
         
         <div className={styles.buttonContainer} >
         <button 
         onClick={props.onClose}
         >X</button>
         </div>
         <div className={styles.dataContainer} >
            <h2> {props.name} </h2>
            <h3> {props.status} </h3>
            <h4> {props.species} </h4>
            <h5> {props.gender} </h5>
            <h6> {props.origin} </h6>
         </div>
         <Link to={`/detail/${props.id}`} >
         <img className={styles.image} src={props.image} alt={props.name} />
         </Link>
      </div>
   );
}

const mapStateToProps = state => {
   return {
      allCharacters: state.allCharacters
   }
}

const mapDispatchToProps = dispatch => {
   return {
      addFav: character => {
         dispatch(addFav(character))
      },
      removeFav: id => {
         dispatch(removeFav(id))
      }
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
