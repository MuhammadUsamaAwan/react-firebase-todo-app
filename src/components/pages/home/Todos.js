import { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { db } from '../../../firebase.config'
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from 'firebase/firestore'

const Todos = () => {
  const [todo, setTodo] = useState({ task: '', timestamp: '' })
  const [todos, setTodos] = useState([])
  const auth = getAuth()
  const handleSubmit = e => {
    e.preventDefault()
    const todoCopy = { ...todo }
    todoCopy.timestamp = serverTimestamp()
    todoCopy.userRef = auth.currentUser.uid
    addDoc(collection(db, 'todos'), todoCopy)
    fetcthTodos()
  }
  const fetcthTodos = async () => {
    try {
      // get reference
      const todosRef = collection(db, 'todos')
      // create a query
      const q = query(todosRef, where('userRef', '==', auth.currentUser.uid))
      // execute query
      const querySnap = await getDocs(q)
      const todos = []
      querySnap.forEach(doc => {
        return todos.push({ id: doc.id, data: doc.data() })
      })
      setTodos(todos)
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    fetcthTodos()
  }, [])

  const handleDelete = async todoID => {
    await deleteDoc(doc(db, 'todos', todoID))
    setTodos(todos.filter(item => item.id !== todoID))
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Add Todo'
          value={todo.task}
          onChange={e => setTodo({ ...todo, task: e.target.value })}
          required
        />
        <input type='submit' value='Add' required />
      </form>
      <ul>
        {todos.map(item => (
          <li key={item.id}>
            {item.data.task}
            <span
              style={{ cursor: 'pointer', color: 'red' }}
              onClick={() => handleDelete(item.id)}
            >
              &#10008;
            </span>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Todos
