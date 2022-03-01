import { Link, useNavigate } from 'react-router-dom'
import { useAuthStatus } from '../../hooks/useAuthStatus'
import { getAuth } from 'firebase/auth'

const Nav = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  const { loggedIn, setLoggedIn } = useAuthStatus()
  const logOut = () => {
    auth.signOut()
    setLoggedIn(false)
    alert('You are now Logged Out')
    navigate('/signup')
  }

  return (
    <nav>
      {loggedIn ? (
        <>
          <Link to='/'>Todos</Link>
          <button onClick={logOut}>Logout</button>
        </>
      ) : (
        <>
          <Link to='/signup'>Sign Up</Link>
          <Link to='/signin'>Sign In</Link>
        </>
      )}
    </nav>
  )
}

export default Nav
