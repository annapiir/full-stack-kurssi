const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const goodState = state.good + 1
      return {...state, good: goodState}
    case 'OK':
      const okState = state.ok + 1
      return {...state, ok: okState}
    case 'BAD':
      const badState = state.bad + 1
      return {...state, bad: badState}
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer