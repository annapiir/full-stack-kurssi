import React from 'react' 

const LoginForm = ({
   handleLogin,
   handleUsernameChange,
   handlePasswordChange,
   username, 
   password 
  }) => {
  return (
    <div>
      <h2>Log In</h2>

      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
      </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm