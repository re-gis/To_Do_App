import React from 'react'

const Dashboard = () => {
    const userInfo = localStorage.getItem('userInfo')
    const userData = JSON.parse(userInfo)
  return (
    <div>
      <div>
        <h1>Hello {userData.username}</h1>
      </div>
    </div>
  )
}

export default Dashboard
