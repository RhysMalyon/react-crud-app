import axios from 'axios';
import React, { useState, useEffect } from 'react';
import api from './api/api';

function App() {
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [user, setUser] = useState('')

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

  const postsDisplay = posts.map(post => {
    const { id, title, userId } = post
    
    return (
      <div key={id}>
        <h2>{id}. {title}</h2>
        <p>{findUser(userId)}</p>
      </div>
    )
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1
    const newPost = { id, title, user, body }
    
    const allPosts = [...posts, newPost]
    setPosts(allPosts)
    setTitle('')
    setBody('')
    setUser('')
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleBodyChange = (e) => {
    setBody(e.target.value)
  }
  
  const handleUserChange = (e) => {
    setUser(e.target.value)
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={handleTitleChange}
        />
        <input
          type="textarea"
          placeholder="What you want to write about..."
          name="body"
          value={body}
          onChange={handleBodyChange}
        />
        <select
          onChange={handleUserChange}
          name="user"
          value={user}
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
