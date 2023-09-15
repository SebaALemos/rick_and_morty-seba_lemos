import Card from '../Card/Card.jsx';

export default function Cards({characters, onClose}) {


   return (
   <div style={{display:"flex", justifyContent: "space-between", backgroundColor: "magenta"}} >
      {
         characters.map((character,index) => (
            <Card 
            id={character.id}
            key = {character.id}
            name = {character.name}
            status = {character.status}
            species = {character.species}
            gender = {character.gender}
            origin = {character.origin.name}
            image = {character.image}
            onClose={() => onClose(character.id)}
            />
         ))}
   </div>
   );
}
