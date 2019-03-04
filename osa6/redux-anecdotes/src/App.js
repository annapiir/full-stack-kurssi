import React from 'react';

const voteOf = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

const App = (props) => {
  const anecdotes = props.store.getState()
  const store = props.store
  
  const vote = (id) => {
    store.dispatch(voteOf(id))
  }

  
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App
