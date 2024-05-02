"use client"
import React, { useState } from 'react';
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from '@nextui-org/react';
import AsiaIcon from './AsiaIcon';
import EuropeIcon from './EuropeIcon';
import AmericasIcon from './AmericasIcon';
import { useSession } from 'next-auth/react';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { registerUser } from '@/lib/actions/authActions';

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

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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
      
      className='grid grid-cols-3 gap-3 p-4 shadow border border-secondary bg-foreground rounded-md'
      >
        <Avatar
        className='p-8'
        src={getValueOrDefault(session?.user?.image)}
        />
        <Input
        color='default'
        label="Username"
        type="text"
        disabled
        value={getValueOrDefault(session?.user?.name)} 
        className='dark col-span-1 rounded-xl'
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
