import React from 'react'
import { useParams } from 'react-router-dom'

const PersonalPage = () => {
    const { username } = useParams();
  return (
    <div>{username}</div>
  )
}

export default PersonalPage