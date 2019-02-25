import React from 'react'

const LoginForm = (props) => {
  return (
    <div>
      <h2>Log In</h2>

      <form onSubmit={props.handleLogin}>
        <div>
          Username
          <input
            value={props.username.value}
            onChange={props.username.onChange}
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={props.password.value}
            onChange={props.password.onChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm