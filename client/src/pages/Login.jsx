import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [userData, setUserData] = useState({
    name: 'register',
    email: 'user@example.com'
  });

  const changeInputHandler = (e) => {
    setUserData(preState => {
      return {...preState, [e.target.name]: e.target.value}
    })
  }
  return (
    <section className="login">
      <div className="container">
        <h2>Sign In</h2>
        <form className="form login__form">
          <p className="form__error-message">This is an error message</p>
          <input onChange={changeInputHandler} type="text" name="email" id="" placeholder="Email" value={userData.email}/>
          <input onChange={changeInputHandler} type="password" name="password" id="" placeholder="Password" value={userData.password}/>
          <button type="submit" className="btn primary">Login</button>
        </form>
        <small>Do not have an account ? <Link to="/register">Sign up</Link></small>
      </div>
    </section>
  )
}

export default Login