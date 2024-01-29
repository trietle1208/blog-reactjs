import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  const [userData, setUserData] = useState({
    name: 'register',
    email: 'user@example.com',
    password: 'password',
    password2: 'password2'
  });

  const changeInputHandler = (e) => {
    setUserData(preState => {
      return {...preState, [e.target.name]: e.target.value}
    })
  }
  return (
    <section className="register">
      <div className="container">
        <h2>Sign Up</h2>
        <form className="form register__form">
          <p className="form__error-message">This is an error message</p>
          <input onChange={changeInputHandler} type="text" name="name" id="" placeholder="Full name" value={userData.name}/>
          <input onChange={changeInputHandler} type="text" name="email" id="" placeholder="Email" value={userData.email}/>
          <input onChange={changeInputHandler} type="password" name="password" id="" placeholder="Password" value={userData.password}/>
          <input onChange={changeInputHandler} type="password" name="password2" id="" placeholder="Confirm Password" value={userData.password2}/>
          <button type="submit" className="btn primary">Register</button>
        </form>
        <small>Already have an account ? <Link to="/login">Sign in</Link></small>
      </div>
    </section>
  )
}

export default Register