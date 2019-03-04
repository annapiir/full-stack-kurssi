import React from 'react';
import { voteOf } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
    const store = props.store
    const anecdotes = props.store.getState()
    
    const vote = (id) => {
        store.dispatch(voteOf(id))
    }
    
    return (
        anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
          )

    )
}

export default AnecdoteList