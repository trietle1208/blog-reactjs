import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Avatar from '../images/avatar15.jpg'
import {FaEdit, FaCheck} from 'react-icons/fa'

const UserProfile = () => {
  const [avatar, setAvatar]  = useState(Avatar);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  
  return (
    <section className="profile">
      <div className="container profile__container">
        <Link to={`/myposts/dadd`} className="btn">My Posts</Link>
        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img src={avatar} alt="" />
            </div>
            <form action="" className="avatar__form">
              <input onChange={e => setAvatar(e.target.files[0])} type="file" name="avatar" id="avatar" accept="png, jpg, jpeg"/>
              <label htmlFor="avatar" className="profile__avatar-btn"><FaEdit></FaEdit></label>
            </form>
            <button className="profile__avatar-btn"><FaCheck></FaCheck></button>
          </div>
          <h1>Ernest</h1>
          <form className="form profile__form">
            <p className="form__error-message">This is an error message</p>
            <input onChange={e => setName(e.target.value)} type="text" placeholder="Full Name" value={name}/>
            <input onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" value={email}/>
            <input onChange={e => setCurrentPassword(e.target.value)} type="password" placeholder="Current Password" value={currentPassword}/>
            <input onChange={e => setNewPassword(e.target.value)} type="password" placeholder="New Password" value={newPassword}/>
            <input onChange={e => setConfirmNewPassword(e.target.value)} type="password" placeholder="Confirm Password" value={confirmNewPassword}/>
            <button type="submit" className="btn primary">Update Details</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default UserProfile