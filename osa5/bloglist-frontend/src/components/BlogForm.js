import React from 'react'

const BlogForm = (props) => {
    return(
   <div>
        <form onSubmit={props.handleAddBlog}>
            <div>
                Title: <input onChange={props.handleTitleChange} value={props.newTitle} />
            </div>
            <div>
                Author: <input onChange={props.handleAuthorChange} value={props.newAuthor} />
            </div>
            <div>
                Url: <input onChange={props.handleUrlChange} value={props.newUrl} />
            </div>
            <div>
                <button type="submit">Create</button>
            </div>
        </form>
   </div> 
)}

export default BlogForm