"use client"
import React, { useState } from 'react';
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from '@nextui-org/react';
import AsiaIcon from './AsiaIcon';
import EuropeIcon from './EuropeIcon';
import AmericasIcon from './AmericasIcon';
import { useSession } from 'next-auth/react';
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from 'react-toastify';
import { updateUser } from '@/lib/actions/authActions';
function UserSettingsForm() {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    name: session?.user?.name ?? '',
    age: session?.user?.age ?? '',
    email: session?.user?.email ?? '',
    discord: session?.user?.discord ?? '',
    steam: session?.user?.steam ?? '',
    region: session?.user?.region ?? '',
  });
  
  const { register, handleSubmit } = useForm();

  type UpdateUserType = {
    age?: number;
    discord?: string;
    steam?: string;
    // ... other updatable fields
  };

  const saveUser: SubmitHandler<UpdateUserType> = async (data) => {
    try {
      const userId = getValueOrDefault(session?.user?.id);
      const result = await updateUser(userId, data); 
      toast.success("User information updated!");
    } catch (error) {
      toast.error("Error updating user information");
      console.error(error);
    }
  };

  const getValueOrDefault = (value: any) => value ?? 'Undefined';

  const getRegionIcon = () => {
    const region = session?.user?.region;
    switch (region) {
      case 'Europe':
        return <EuropeIcon h={12} w={20} />;
      case 'Americas':
        return <AmericasIcon h={12} w={20} />;
      case 'Asia':
        return <AsiaIcon h={12} w={20} />;
      default:
        return null; // Return null if region is not recognized or not provided
    }
  };


  return (
      <form
      onSubmit={handleSubmit(saveUser)}
      className='grid grid-cols-3 gap-3 p-4 shadow border border-secondary bg-foreground rounded-md'
      >
        <Avatar
        className='h-14 w-14'
        src={getValueOrDefault(session?.user?.image)}
        />
        <Input
        color='default'
        label="Username"
        type="text"
        disabled
        value={getValueOrDefault(session?.user?.name)} 
        className='dark col-span-1 rounded-xl'
        {...register('name')}
        />
                <Input
        color='default'
        label="Age"
        type="text"
        value={getValueOrDefault(session?.user?.age)}
        className='dark col-span-1 rounded-xl'
        />
        <Input
        color='default'
        label="Email"
        type="text"
        disabled
        value={session?.user.email}
        className='dark col-span-3 rounded-xl'
        />
        <Input
        label="Discord"
        variant='flat'
        color='default'
        type="text"
        value={getValueOrDefault(session?.user?.discord)}
        className='dark col-span-1 rounded-xl'
        />
        <Input
        label="Steam"
        variant='flat'
        color='default'
        type="text"
        value={getValueOrDefault(session?.user?.steam)}
        className='dark col-span-1 rounded-xl'
        />
        <Dropdown className='dark'>
        <DropdownTrigger>
          <Button
            className='dark p-7'
            variant='solid'
            color='default'
          >
            <div className="flex items-center">
            {getRegionIcon()}
              <span className="ml-2">Region</span>
            </div>
          </Button>
        </DropdownTrigger>
          <DropdownMenu className='p-3'>
            <DropdownItem
            startContent={<EuropeIcon h={12} w={20} />}
            >
              Europe
            </DropdownItem>
            <DropdownItem
            startContent={<AmericasIcon h={12} w={20} />}
            >
              Americas
            </DropdownItem>
            <DropdownItem
            startContent={<AsiaIcon h={12} w={20} />}
            >
              Asia
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div className='col-span-3 flex justify-center place-items-center'>
        <Button 
        type="submit"
        className='dark p-7 pl-12 pr-12 rounded-xl'
        >
        Save Changes
        </Button>
        </div>
      </form>
  );
}

export default UserSettingsForm;
