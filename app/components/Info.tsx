import Link from 'next/link'
import React from 'react'

const Info = () => {
  return (
    <div>
        <div className='p-4 md:p-8 md:pb-12 shadow border border-secondary bg-foreground rounded-md md:pl-8 md:pr-8'>
            <p className='pb-2 md:pb-4 text-xl font-bold text-secondary'>What are we about?</p>
            <div className='bg-background rounded-xl'>
                <p className='md:max-w-4xl text-sm md:text-2xl font-light bg-transparent rounded-lg p-8'>
                    This project was created by <Link href={'https://atanaskyurkchiev.info/'} className='text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-400'>Atanas Kyurkchiev </Link> 
                    as requested by his college (<Link href={'https://www.accesscreative.ac.uk/'} className='text-transparent bg-clip-text bg-gradient-to-r from-[#9936ff] to-[#DBFF00]'>Access Creative College</Link>)
                    It is a platform designed for users to be able to login/register, and create posts which help other users
                    find them and connect using the respective social buttons on the post. This website was developed to allow Rust 
                    players to find teammates and rally together to dominate the field.
                </p>
            </div>
        </div>
    </div>
  )
}

export default Info