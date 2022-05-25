import React,{useState,useEffect}from "react"
function Todo() {
  const [page,setPage]=useState(1)
  const [todos,setTodo]=useState([]);
  const [newTodo,setNewTodo]=useState("")
  const saveInfo=()=>{
      fetch("http://localhost:3004/todos/",{
          method:"POST",
          headers:{"content-type":"application/json",},
          body: JSON.stringify({
              title:newTodo,
              author:newTodo,
              isCompleted:true,
          }),
      }).then((res)=>res.json()).then((d)=>{
          setTodo([...todos,d]);
          setNewTodo("");
      });
  };
  useEffect(()=>{
    fetch(`http://localhost:3004/todos/?_page=${page}&_limit=5`).then((res)=>res.json()).then((d)=>{
    setTodo(d);
    });
  },[page]);
  console.log(todos)
    return (
        <div>
            <div>
            <input placeholder="Enter Something"  value={newTodo} onChange={(e)=>setNewTodo(e.target.value)}/>
            <button onClick={saveInfo} >Save</button>
            </div>
          <h1>Todos</h1> 
          {todos.map((todo)=>(
            <p key={todo.id}>{todo.title}</p>
          ))}

          <button onClick={()=>setPage(page-1)} >{`<`}</button>
          <button onClick={()=>setPage(page+1)}>{`>`}</button>
       </div>
    )

}

export default Todo;
