import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate()
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async e => {
    e.preventDefault()
    const { email, password } = formData
    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      if (userCredential.user) {
        alert('Login Success')
        navigate('/')
      }
    } catch (err) {
      alert('Invalid Credentials')
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign In</h1>
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
      <input type='submit' placeholder='Submit' required />
    </form>
  )
}

export default SignIn
