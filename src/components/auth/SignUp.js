import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { db } from '../../firebase.config'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const navigate = useNavigate()
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async e => {
    e.preventDefault()
    const { name, email, password, confirmPassword } = formData
    if (password === confirmPassword) {
      try {
        //creating user
        const auth = getAuth()
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )
        const user = userCredential.user //getting user
        updateProfile(auth.currentUser, { displayName: name }) //updating display name
        //saving data to firestore
        const formDataCopy = { ...formData }
        delete formDataCopy.password
        delete formDataCopy.confirmPassword
        formDataCopy.timestamp = serverTimestamp()

        await setDoc(doc(db, 'users', user.uid), formDataCopy)

        alert('User Registered')
        navigate('/')
      } catch (err) {
        console.error(err)
      }
    } else {
      alert("Passwords Don't Match")
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <input
        type='text'
        placeholder='name'
        name='name'
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type='text'
        placeholder='Email'
        name='email'
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type='password'
        placeholder='Password'
        name='password'
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        type='password'
        placeholder='Confirm Password'
        name='confirmPassword'
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
      <input type='submit' placeholder='Submit' required />
    </form>
  )
}

export default SignUp
