"use client"
import {
    EnvelopeIcon,
    EyeIcon,
    EyeSlashIcon,
    KeyIcon,
    PhoneIcon,
    UserIcon,
  } from "@heroicons/react/20/solid";
import { Button, Checkbox, Input, Link } from '@nextui-org/react'
import React, { useState } from 'react'

const RegisterForm = () => {
    const [isVisiblePass, setIsVisiblePass] = useState(false);
    const toggleVisiblePass = ()=>setIsVisiblePass(prev=>!prev);
  return (
    <form className='grid grid-cols-2 gap-3 p-4 shadow border bg-foreground rounded-md'>
        <Input 
        label="Username" 
        startContent={<UserIcon className="w-4"/>} 
        className="dark col-span-2" 
        />
        <Input 
        label="Email" 
        startContent={<EnvelopeIcon className="w-4"/>} 
        className="dark col-span-1" 
        />
        <Input 
        label="Phone" 
        startContent={<PhoneIcon className="w-4"/>} 
        className="dark col-span-1" 
        />
        <Input 
        label="Password" 
        type={isVisiblePass?"text" : "password"}
        startContent={<KeyIcon className="w-4"/>} 
        className="dark col-span-1"
        endContent={
            isVisiblePass? <EyeSlashIcon className="w-4 cursor-pointer" onClick={toggleVisiblePass}/>
        : <EyeIcon className="w-4 cursor-pointer" onClick={toggleVisiblePass} />}
        />
        <Input 
        label="Confirm Password" 
        type={isVisiblePass?"text" : "password"}
        startContent={<KeyIcon className="w-4"/>} 
        className="dark col-span-1"
        />
        <Checkbox className="dark">
            I accept the <Link className="" href="/terms">Terms</Link>. 
        </Checkbox>
    <Button 
    type="submit" 
    color="primary"
    className="rounded-lg dark"
    >
        Submit
    </Button>
    </form>
  )
}

export default RegisterForm