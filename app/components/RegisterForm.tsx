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
import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordStrength } from "check-password-strength";
import PasswordStrength from "./passwordStrength";
import { registerUser } from "@/lib/actions/authActions";
import { toast } from "react-toastify";

const FormSchema = z
    .object({
        name: z
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
            message: "Please accept the terms",
          }),
        }),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords dont match!",
        path: ["confirmPassword"],
      });

type InputType = z.infer<typeof FormSchema>;

const RegisterForm = () => {
    const {register, handleSubmit,reset, control, watch, formState:{errors} } = useForm<InputType>({
      resolver:zodResolver(FormSchema),
    });
    const [passStrength, setPassStrength] = useState(0);
    const [isVisiblePass, setIsVisiblePass] = useState(false);

    useEffect(()=> {

    setPassStrength(passwordStrength(watch().password).id);
    }, [watch]);
    const toggleVisiblePass = ()=>setIsVisiblePass(prev=>!prev);

    const saveUser: SubmitHandler<InputType> = async (data) => {
        const { accepted, confirmPassword, ...user } = data;
        try {
          const result = await registerUser(user);
          toast.success("Registered Successfully.");
        } catch (error) {
          toast.error("Something Went Wrong!");
          console.error(error);
        } 
    };

  return (
    <form onSubmit={handleSubmit(saveUser)} className='grid grid-cols-2 gap-3 p-4 shadow border border-secondary bg-foreground rounded-md'>
        <Input
        errorMessage={errors.name?.message}
        isInvalid={!!errors.name}
        {...register("name")}
        label="Name" 
        startContent={<UserIcon className="w-4"/>} 
        className="dark col-span-2 rounded-xl" 
        />
        <Input
        errorMessage={errors.email?.message}
        isInvalid={!!errors.email}
        {...register("email")}
        label="Email" 
        startContent={<EnvelopeIcon className="w-4"/>} 
        className="dark col-span-1" 
        />
        <Input
        errorMessage={errors.phone?.message}
        isInvalid={!!errors.phone}
        {...register("phone")}
        label="Phone" 
        startContent={<PhoneIcon className="w-4"/>} 
        className="dark col-span-1" 
        />
        <Input 
        errorMessage={errors.password?.message}
        isInvalid={!!errors.password}
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
        errorMessage={errors.confirmPassword?.message}
        isInvalid={!!errors.confirmPassword}
        {...register("confirmPassword")}
        label="Confirm Password" 
        type={isVisiblePass?"text" : "password"}
        startContent={<KeyIcon className="w-4"/>} 
        className="dark col-span-1"
        />
        <PasswordStrength passStrength={passStrength} />
        <Controller control={control} name="accepted" render={({field}) => (
          <Checkbox onChange={field.onChange} onBlur={field.onBlur} className="dark">
            I accept the <Link className="" href="/terms">Terms</Link>. 
          </Checkbox>
    )} />
      {!!errors.accepted && (
        <p className="text-white text-xs">{errors.accepted.message}</p>
      )}
    <Button 
    type="submit" 
    color="primary"
    className="rounded-lg dark col-span-2 items-center flex justify-center"
    >
        Submit
    </Button>
    </form>
  )
}

export default RegisterForm

