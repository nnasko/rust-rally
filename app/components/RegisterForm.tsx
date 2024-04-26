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
import { z } from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import validator from "validator"
import React, { useState } from 'react'

const FormSchema = z
    .object({
        Username: z
        .string()
        .min(3,"Username must be atleast 3 characters")
        .max(20,"Username must be less than 20 characters"),
        email: z.string().email("Please enter a valid email address"),
        phone: z
        .string()
        .refine(validator.isMobilePhone, "Please enter a valid phone number."),
        password: z
        .string()
        .min(6, "Password must be at least 6 characters ")
        .max(50, "Password must be less than 50 characters"),
        confirmPassword: z
        .string()
        .min(6, "Password must be at least 6 characters ")
        .max(50, "Password must be less than 50 characters"),
        accepted: z.literal(true, {
            errorMap: () => ({
              message: "Please accept all terms",
            }),
          }),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: "Password and confirm password doesn't match!",
          path: ["confirmPassword"],
        });

type InputType = z.infer<typeof FormSchema>;

const RegisterForm = () => {
    const {register, handleSubmit,reset, control} = useForm<InputType>();
    const [isVisiblePass, setIsVisiblePass] = useState(false);
    const toggleVisiblePass = ()=>setIsVisiblePass(prev=>!prev);

    const saveUser: SubmitHandler<InputType> = async (data)=>{
        console.log({data});
    }

  return (
    <form onSubmit={handleSubmit(saveUser)} className='grid grid-cols-2 gap-3 p-4 shadow border border-secondary bg-foreground rounded-md'>
        <Input
        {...register("Username")}
        label="Username" 
        startContent={<UserIcon className="w-4"/>} 
        className="dark col-span-2" 
        />
        <Input
        {...register("email")}
        label="Email" 
        startContent={<EnvelopeIcon className="w-4"/>} 
        className="dark col-span-1" 
        />
        <Input 
        {...register("phone")}
        label="Phone" 
        startContent={<PhoneIcon className="w-4"/>} 
        className="dark col-span-1" 
        />
        <Input 
        {...register("password")}
        label="Password" 
        type={isVisiblePass?"text" : "password"}
        startContent={<KeyIcon className="w-4"/>} 
        className="dark col-span-1"
        endContent={
            isVisiblePass? <EyeSlashIcon className="w-4 cursor-pointer" onClick={toggleVisiblePass}/>
        : <EyeIcon className="w-4 cursor-pointer" onClick={toggleVisiblePass} />}
        />
        <Input 
        {...register("confirmPassword")}
        label="Confirm Password" 
        type={isVisiblePass?"text" : "password"}
        startContent={<KeyIcon className="w-4"/>} 
        className="dark col-span-1"
        />
        <Controller control={control} name="accepted" render={({field}) => (
          <Checkbox onChange={field.onChange} onBlur={field.onBlur} className="dark">
            I accept the <Link className="" href="/terms">Terms</Link>. 
          </Checkbox>
    )} />
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

