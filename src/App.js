import axios from 'axios';
import React, { useState, useEffect } from 'react';
import api from './api/api';

function App() {
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])

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
