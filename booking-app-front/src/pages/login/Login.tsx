import axios from 'axios'
import { ChangeEvent, MouseEvent, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './Login.scss'

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined
  })
  const navigate = useNavigate()

  const { loading, error, dispatch } = useContext(AuthContext)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch({ type: 'LOGIN_START' })
    dispatch({ type: 'LOGIN_START' })
    try {
      const res = await axios.post(
        'http://localhost:8000/api/auth/login',
        credentials
      )
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data })
      //  localStorage.setItem('user', JSON.stringify(res.data))
      navigate('/')
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' })
    }
  }


  return (
    <div className='login'>
      <div className='lContainer'>
        <h1>Booking App</h1>
        <input
          type='text'
          placeholder='username'
          id='username'
          onChange={handleChange}
          className='lInput'
        />
        <input
          type='password'
          placeholder='password'
          id='password'
          onChange={handleChange}
          className='lInput'
        />
        <button disabled={loading} onClick={handleLogin} className='lButton'>
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  )
}
export default LoginPage
