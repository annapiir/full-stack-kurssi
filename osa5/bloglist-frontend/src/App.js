import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 
import BlogForm from './components/BlogForm';
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle]= useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [notification, setNotification] = useState({
    message: null
  })

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


  const notify = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null }), 10000)
  }

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

    } catch (exeption) {
      notify('Wrong username or password', 'error')
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
    notify(`Blog ${createdBlog.title} was added`)

    return
  }

  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLabel='login'>
          <LoginForm 
            handleLogin={handleLogin}
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
            username={username} 
            password={password}
          /> 
       </Togglable>
      </div>
    )
  }

  const logoutForm = () => {
    return (
      <div>
        <p>{user.name} logged in</p>
        <form onSubmit={handleLogout}>
          <button type="submit">logout</button>
        </form>
      </div>
    )
  }

  const handleTitleChange = (event) => setNewTitle(event.target.value)
  const handleAuthorChange = (event) => setNewAuthor(event.target.value)
  const handleUrlChange = (event) => setNewUrl(event.target.value)
  const handleUsernameChange = (event) => setUsername(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value)


  return (
    <div>
      <h2>Blogs</h2>
      <Notification notification={notification}/>

      {user === null ?
        loginForm() :
        logoutForm()
      }
      
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


export default App