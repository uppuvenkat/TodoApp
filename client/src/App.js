import react,  {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';


function App() {
const [todos, setTodos] = useState([]) 
const [newTodo, setNewTodo] = useState("") 

useEffect(()=>{
  axios.get("https://todoapp-89ce.onrender.com/gettasks").then((res)=>{
    console.log(res.data)
    setTodos(res.data)
  }).catch((err)=>{
    console.log(err)
  })
},[])

const submitHandler = (e) =>{
  e.preventDefault();
  axios.post("https://todoapp-89ce.onrender.com/addtask", {todo:newTodo}).then((res)=>{
    setTodos(res.data)
  })
}
  
const onDelete = (id)=>{
  axios.delete(`https://todoapp-89ce.onrender.com/deletetask/${id}`).then((res)=>{
    setTodos(res.data)
  })
}
  return (
    <div className="App">
      <br></br>
      <form onSubmit={submitHandler}>
        <input type='text' value={newTodo} onChange={(e)=>setNewTodo(e.target.value)} />
        <input type='submit' value="submit" />
      </form>


      <br/>
      {todos.length>0 && todos.map((todo)=>
      <div key={todo._id}>
        {todo.todo}
        &nbsp; &nbsp; &nbsp;
        <button onClick={()=>onDelete(todo._id)}>Delete</button>
        </div>)}
    </div>
  );
}

export default App;
