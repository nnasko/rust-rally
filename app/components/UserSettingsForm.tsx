"use client"
import React, { useEffect, useState } from 'react';
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from '@nextui-org/react';
import AsiaIcon from './AsiaIcon';
import EuropeIcon from './EuropeIcon';
import AmericasIcon from './AmericasIcon';
import { signIn, useSession, getSession } from 'next-auth/react';
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from 'react-toastify';
import { updateUser } from '@/lib/actions/authActions';
function UserSettingsForm() {
  const { data: session, update, status  } = useSession({ 
    required: true,
  });
  const [selectedRegion, setSelectedRegion] = useState(session?.user?.region ?? ''); 

  const [formData, setFormData] = useState({
    name: session?.user?.name ?? '',
    age: session?.user?.age ?? NaN,
    email: session?.user?.email ?? '',
    discord: session?.user?.discord ?? '',
    steam: session?.user?.steam ?? '',
    region: session?.user?.region ?? '',
  });
  
  const { register, handleSubmit } = useForm();

  type UpdateUserType = {
    age?: number;
    name?: string;
    discord?: string;
    steam?: string;
    region?: string;
  };
  const saveUser: SubmitHandler<UpdateUserType> = async (data) => {
    try {
      const userId = getValueOrDefault(session?.user?.id);
      const updateData = (data.discord !== '' || data.steam !== '' || data.name !== '' || data.region !== '') 
      ? { ...data } 
      : { ...data, discord: undefined, steam: undefined, name: undefined, region: undefined, }; 
      const updatedUser = await updateUser(userId, {
        ...updateData,
        region: selectedRegion,
        age: data.age ? parseInt(data.age, 10) : undefined
      });
      toast.success("User information updated!");
      await getSession();
      console.log(session)
    } catch (error) {
      toast.error("Error updating user information");
      console.error(error);
    }
  };

  const getValueOrDefault = (value: any) => value ?? 'Undefined';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region); 
    setFormData((prevFormData) => ({
        ...prevFormData,
        region: region 
    }));
    console.log("Selected Region:", region);
    console.log("Form Data:", formData);
};

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
        placeholder={getValueOrDefault(session?.user?.name)} 
        className='dark col-span-1 rounded-xl'
        {...register('name')}
        />
        <Input
        color='default'
        label="Age"
        type="number"
        placeholder={getValueOrDefault(session?.user?.age)}
        className='dark col-span-1 rounded-xl'
        {...register('age')}
        onChange={handleChange}
        />
        <Input
        color='default'
        label="Email"
        type="text"
        disabled
        placeholder={session?.user.email}
        className='dark col-span-3 rounded-xl'
        {...register('email')}
        onChange={handleChange}
        />
        <Input
        label="Discord"
        variant='flat'
        color='default'
        type="text"
        placeholder={getValueOrDefault(session?.user?.discord)}
        className='dark col-span-1 rounded-xl'
        {...register('discord')}
        onChange={handleChange}
        />
        <Input
        label="Steam"
        variant='flat'
        color='default'
        type="text"
        placeholder={getValueOrDefault(session?.user?.steam)}
        className='dark col-span-1 rounded-xl'
        {...register('steam')}
        onChange={handleChange}
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
            onClick={() => handleRegionChange('Europe')}
            >
              Europe
            </DropdownItem>
            <DropdownItem
            startContent={<AmericasIcon h={12} w={20} />}
            onClick={() => handleRegionChange('Americas')}
            >
              Americas
            </DropdownItem>
            <DropdownItem
            startContent={<AsiaIcon h={12} w={20} />}
            onClick={() => handleRegionChange('Asia')}
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
