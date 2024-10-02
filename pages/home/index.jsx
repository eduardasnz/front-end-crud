import { useEffect, useState, useRef } from "react";
import Trash from "../../src/assets/trash.svg";
import "./style.css";
import api from "../../src/services/api";
// eslint-disable-next-line no-undef
const apiUrl = process.env.REACT_APP_API_URL;

function Home() {
  
  const [ users, setUsers ] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers(){
    const usersFromApi = await api.get(`${apiUrl}/usuarios`)
    
    setUsers(usersFromApi.data)
  }

  async function createUsers(){
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })

    getUsers()
  }

  async function deleteUsers(id){
    await api.delete(`/usuarios/${id}`)

    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder="Name" name="name" type="name" ref={inputName}/>
        <input placeholder="Age" name="age" type="number" ref={inputAge}/>
        <input placeholder="Email" name="email" type="email" ref={inputEmail}/>
        <button onClick={createUsers} type="button">Cadastrar</button>
      </form>

      {users.map((user) => (
        <div className="card" key={user.id}>
          <div>
            <p>Nome:  <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
