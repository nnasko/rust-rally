import LoginForm from '@/app/components/LoginForm'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='h-screen bg-background items-center place-items-center pt-48 text-white'>
    <div className="grid grid-cols-1 place-items-center items-center gap-3 bg-background">
      <div className="md:col-span-2 flex justify-center items-center">
        <Link href={"/auth/login"} color='foreground'>Forgot your <span className='text-foreground'>password</span>?</Link>
      </div>
        <LoginForm />
    </div>
    </div>
  )
}

export default page