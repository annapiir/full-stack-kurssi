import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 
import BlogForm from './components/BlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle]= useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('käyttäjätunnus tai salasana virheellinen')
  }
}

const handleLogout = async (event) => {
  event.preventDefault()
  window.localStorage.removeItem('loggedBlogappUser')
  blogService.setToken(null)
  setUser(null)
}

const handleAddBlog = async (event) => {
  event.preventDefault()

  const createdBlog = await blogService.create({
    title: newTitle,
    author: newAuthor,
    url: newUrl
  })
  setBlogs(blogs.concat(createdBlog))
  setNewTitle('')
  setNewAuthor('')
  setNewUrl('')

  return
}

const handleTitleChange = (event) => setNewTitle(event.target.value)
const handleAuthorChange = (event) => setNewAuthor(event.target.value)
const handleUrlChange = (event) => setNewUrl(event.target.value)

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
        <div>
          käyttäjätunnus
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          salasana
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
      </div>
    )
  } else {

  return (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in</p>
      <p></p>
      <form onSubmit={handleLogout}>
        <button type="submit">logout</button>
      </form>
      <h2>Create New</h2>
      <BlogForm
        handleTitleChange={handleTitleChange}
        handleAuthorChange={handleAuthorChange}
        handleUrlChange={handleUrlChange}
        newTitle={newTitle}
        newAuthor={newAuthor}
        newUrl={newUrl}
        handleAddBlog={handleAddBlog}
      />
      <h2>List of Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
  }
}


export default App