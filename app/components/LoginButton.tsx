
"use client"
import { Button } from '@nextui-org/button';
import { useSession } from 'next-auth/react'
import Link from 'next/link';
import React from 'react'

const LoginButton = () => {
    const { data:session } = useSession();
  return (
        <div className='flex items-center gap-2'>
        {session && session.user ?
        <>
        <p>{session.user.name}</p>
        <Link className="text-secondary" href={"/api/auth/signout"}>Sign Out</Link>
        </>
         : <Button as={Link} href={"/api/auth/login"}>
            Login
            </Button>
        }
    </div>
  )
}

export default LoginButton