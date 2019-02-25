import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div onClick={() => setVisible(!visible)}>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>
          {blog.likes} likes <button onClick={() => console.log('click')}>like</button>
        </p>
        <p>
          Added by {blog.user.name}
        </p>
      </div>
    </div>
  )
}

export default Blog