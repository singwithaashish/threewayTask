import React from 'react'

function Home() {
  // verify token
  

  return (
    <div className="grid place-items-center h-screen bg-gray-200">
      <button onClick={() => {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
      }>Logout</button>
    </div>
  )
}

export default Home