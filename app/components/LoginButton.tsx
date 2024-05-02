
"use client"
import { ArrowDownIcon } from '@heroicons/react/20/solid';
import { Button } from '@nextui-org/button';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
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
        <Popover backdrop='opaque' showArrow placement='bottom' className='dark p6 gap-4'>
        <PopoverTrigger>
        <ArrowDownIcon className='h-5 text-background' />
      </PopoverTrigger>
        <PopoverContent className='gap-2 p-4 bg-primary'>
          <Button as={Link} href='/account'>Account Settings</Button>
          <Button as={Link} className="text-secondary" href={"/api/auth/signout"}>Sign Out</Button>
        </PopoverContent>
        </Popover>
        </>
         : <Button as={Link} href={"/api/auth/signin"} variant='light' className='rounded-lg text-secondary'>
            Login
            </Button>
        }
    </div>
  )
}

export default LoginButton