import React from 'react'
import Info from '../components/Info'
import Nasko from '../components/Nasko'

const page = () => {
  return (
    <div className='h-screen bg-background items-start place-items-start pt-24 md:pt-32 md:pl-16 flex pr-8 pl-8 md:pr-16 gap-3'>
    <div className="grid grid-cols-1 place-items-start items-left gap-3 bg-background">
        <Info />
    </div>
      <div className='hidden md:grid md:grid-cols-1 border-2 border-secondary rounded-lg'>
        <Nasko h={380} w={600} />
      </div>
    </div>
  )
}

export default page