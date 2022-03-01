import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Nav from './components/layout/Nav'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import Todos from './components/pages/home/Todos'
import PrivateRoute from './components/utils/PrivateRoute'

const App = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route exact path='/' element={<Todos />} />
        </Route>
        <Route exact path='/signup' element={<SignUp />} />
        <Route exact path='/signin' element={<SignIn />} />
      </Routes>
    </Router>
  )
}

export default App
