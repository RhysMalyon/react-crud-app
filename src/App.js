import axios from 'axios';
import React, { useState, useEffect } from 'react';
import api from './api/api';

function App() {
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const getData = async () => {
      await axios.all([
        api.get('/posts'),
        api.get('/users')
      ])
      .then(response => {
        setPosts(response[0].data)
        setUsers(response[1].data)
      })
      .catch(err => console.error(err))
    }

    getData()
  }, [])

  const findUser = (id) => {
    const foundUser = users.filter(user => user.id === id)
    return foundUser[0] ? foundUser[0].name : null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1
    const newPost = { id, title, userId, body }
    try {
      const response = await api.post('/posts', newPost)
      console.log(response.data)
      const allPosts = [...posts, response.data]
      setPosts(allPosts)
      setTitle('')
      setBody('')
      setUserId('')
    } catch (err) {
      console.err(`Error: ${err.message}`)
    }
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleBodyChange = (e) => {
    setBody(e.target.value)
  }
  
  const handleUserChange = (e) => {
    setUserId(parseInt(e.target.value))
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`)
      const filteredPosts = posts.filter(post => post.id !== id)
      setPosts(filteredPosts)
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }

  const postsDisplay = posts.map(post => {
    const { id, title, userId } = post
    
    return (
      <div key={id}>
        <h2>{id}. {title}</h2>
        <p>{findUser(userId)}</p>
        <button onClick={() => handleDelete(id)}>Delete</button>
      </div>
    )
  })

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={handleTitleChange}
          required
        />
        <input
          type="textarea"
          placeholder="What you want to write about..."
          name="body"
          value={body}
          onChange={handleBodyChange}
          required
        />
        <select
          onChange={handleUserChange}
          name="user"
          value={userId}
          required
        >
          <option value="">--- Choose ---</option>
          {users.map(user => {
            return (
              <option key={user.id} value={user.id}>{user.name}</option>
            )
          })}
        </select>
        <button>Submit</button>
      </form>
      {postsDisplay}
    </div>
  );
}

export default App;
