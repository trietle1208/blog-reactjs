import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Uncategorized')
  const [description, setDescription] = useState('')
  const [thumbnail, setThumbnail] = useState('')

  const modules = {
    toolbar: [
      [{'header': [1, 2, 3, 4, 5, 6, false]}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ]
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  const POST_CATEGORIES = [
    "Agriculture",
    "Business",
    "Education",
    "Entertaiment",
    "Art",
    "Invesment",
    "Uncategorized",
    "Weather"
  ]

  return (
    <section className="create-post">
      <div className="container">
        <h2>Create Post</h2>
        <p className="form__error-message">This is an error message</p>
        <form className="form create-post__form">
          <input onChange={e => setTitle(e.target.value)} type="text" placeholder='Title' value={title} autoFocus/>
          <select onChange={e => setCategory(e.target.value)} name="category" id="" value={category}>
            {
              POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)
            }
          </select>
          <ReactQuill onChange={setDescription} modules={modules} formats={formats} value={description}></ReactQuill>
          <input onChange={e => setThumbnail(e.target.files[0])} type="file" accept='png, jpg, jpeg'/>
          <button type="submit" className="btn primary">Create</button>
        </form>
      </div>
    </section>
  )
}

export default CreatePost