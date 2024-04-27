import RegisterForm from '@/app/components/RegisterForm'
import { Image, Link } from '@nextui-org/react'
import React from 'react'

const RegisterPage = () => {
  return (
    <div className='h-screen bg-background items-center place-items-center pt-48'>
    <div className="grid grid-cols-1 place-items-center items-center gap-3 bg-background">
      <div className="md:col-span-2 flex justify-center items-center">
        <p className="text-center p-2">Already Signed up?</p>
        <Link href={"/auth/login"} color='foreground'>LogIn</Link>
      </div>
        <RegisterForm />
    </div>
    </div>
  );
};

export default RegisterPage