import React from 'react'

const BlogForm = (props) => {
  return(
    <div>
      <form onSubmit={props.handleAddBlog}>
        <div>
            Title: <input onChange={props.title.onChange} value={props.title.value} />
        </div>
        <div>
            Author: <input onChange={props.author.onChange} value={props.author.value} />
        </div>
        <div>
            Url: <input onChange={props.url.onChange} value={props.url.value} />
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  )}

export default BlogForm