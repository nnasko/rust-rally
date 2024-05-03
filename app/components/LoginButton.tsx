
"use client"
import { ArrowDownCircleIcon, ArrowDownIcon } from '@heroicons/react/20/solid';
import { Button } from '@nextui-org/button';
import { Avatar, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link';
import React from 'react'

const LoginButton = () => {
    const { data:session } = useSession();
    const getValueOrDefault = (value: any) => value ?? 'Undefined';
  return (
        <div className='flex items-center gap-2'>
        {session && session.user ?
        <>
        <Avatar src={getValueOrDefault(session?.user?.image)} />
        <p>{session.user.name}</p>
        <Popover backdrop='opaque' showArrow placement='bottom' className='dark p6 gap-4'>
        <PopoverTrigger>
        <ArrowDownCircleIcon className='h-7 text-background' />
      </PopoverTrigger>
        <PopoverContent className='gap-2 p-4 bg-primary'>
          <Button as={Link} href='/account'>Account Settings</Button>
          <Button onClick={async () => await signOut()} className="text-secondary">Sign Out</Button>
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