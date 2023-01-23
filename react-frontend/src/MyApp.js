import Table from './Table'
import Form from './Form';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
function MyApp() {
    
  const [characters, setCharacters] = useState([
    
]);
  function removeOneCharacter (index) {
    const updated = characters.filter((character, i) => {
        if(i==index){
          const id = characters[i].id;
        }
        return i !== index
      });
      makeDeleteCall(id).then( result => {
        if (result && result.status === 204)
          setCharacters(updated);
      
        });
      
  }
  return (
    
      <div className="container">
        <Table characterData={characters} removeCharacter={removeOneCharacter} />  
        <Form handleSubmit={updateList} />
      </div>
    
  )
  
   

  async function fetchAll(){
    try {
       const response = await axios.get('http://localhost:5000/users');
       return response.data.users_list;     
    }
    catch (error){
       //We're not handling errors. Just logging into the console.
       console.log(error); 
       return false;         
    }
 }
 async function makePostCall(person){
  try {
     const response = await axios.post('http://localhost:5000/users', person);
     return response;
  }
  
  catch (error) {
     console.log(error);
     return false;
  }
}
async function makeDeleteCall(id){
  try {
     const response = await axios.delete('http://localhost:5000/users'+id);
     return response;
  }
  
  catch (error) {
     console.log(error);
     return false;
  }
}

function updateList(person) { 
  makePostCall(person).then( result => {
  if (result && result.status === 201)
    person=response.
     setCharacters([...characters, person] );

  });
}
 useEffect(() => {
  fetchAll().then( result => {
     if (result)
        setCharacters(result);
   });
}, [] );
}

export default MyApp;