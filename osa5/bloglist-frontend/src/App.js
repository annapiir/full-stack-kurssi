import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import  { useField } from './hooks'

const App = () => {
  const username = useField('text')
  const password = useField('text')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
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
      const name = username.value
      const word = password.value
      const user = await loginService.login({
        name, word
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()

    } catch (exeption) {
      notify('Wrong username or password', 'error')
      username.reset()
      password.reset()
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
      title: title.value,
      author: author.value,
      url: url.value
    })
    setBlogs(blogs.concat(createdBlog))
    title.reset()
    author.reset()
    url.reset()
    notify(`Blog ${createdBlog.title} was added`)

    return
  }

  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLabel='login'>
          <LoginForm
            handleLogin={handleLogin}
            handleUsernameChange={username.onChange}
            handlePasswordChange={password.onChange}
            username={username.value}
            password={password.value}
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
        handleTitleChange={title.onChange}
        handleAuthorChange={author.onChange}
        handleUrlChange={url.onChange}
        newTitle={title.value}
        newAuthor={author.value}
        newUrl={url.value}
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