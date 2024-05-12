import React from 'react'
import UserSettingsForm from '../components/UserSettingsForm'

const page = () => {
  return (
    <div className='h-screen bg-background rust items-center place-items-center pt-48 text-white'>
      <div className="grid grid-cols-1 place-items-center items-center gap-3 bg-background">
        <p className='text-2xl font-medium text-secondary'>Account Settings</p>
      <UserSettingsForm />
      </div>
    </div>
  )
}

export default page