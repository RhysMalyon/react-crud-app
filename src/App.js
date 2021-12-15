import React, { useState, useEffect } from 'react';
import api from './api/api';

function App() {
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      const response = await api.get('/posts')
      setPosts(response.data)
    }

    const getUsers = async () => {
      const response = await api.get('/users')
      setUsers(response.data)
    }

    getPosts()
    getUsers()
  }, [])

  const findUser = (id) => {
    const foundUser = users.filter(user => user.id === id)
    return foundUser[0].name
  }

  return (
    <div className="App">
      {posts.map(post => {
        return (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{findUser(post.userId)}</p>
          </div>
        )
      })}
    </div>
  );
}

export default App;
