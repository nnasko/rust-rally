import AccountSettings from '@/app/components/AccountSettings'
import { user } from '@nextui-org/react'
import React from 'react'

const page = () => {
  return (
    <div>
        {user ? <AccountSettings user={user} /> : <div>Loading...</div>}
    </div>
  )
}

export default page