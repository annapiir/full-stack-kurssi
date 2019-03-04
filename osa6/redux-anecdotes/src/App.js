import React from 'react';
import { voteOf } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'


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
      <AnecdoteForm store={store}/>
    </div>
  )
}

export default App
