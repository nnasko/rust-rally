import RegisterForm from '@/app/components/RegisterForm'
import { Link } from '@nextui-org/react'
import React from 'react'

const RegisterPage = () => {
  return (
    <div className='h-screen bg-background items-center place-items-center pt-48 text-white'>
    <div className="grid grid-cols-1 place-items-center items-center gap-3 bg-background">
      <div className="md:col-span-2 flex justify-center items-center">
        <p className="text-center p-2">Already Signed up?</p>
        <Link href={"/auth/login"} color='foreground'>Login</Link>
      </div>
        <RegisterForm />
    </div>
    </div>
  );
};

export default RegisterPage