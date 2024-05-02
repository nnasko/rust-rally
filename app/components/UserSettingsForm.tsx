"use client"
import React from 'react';
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from '@nextui-org/react';
import AsiaIcon from './AsiaIcon';
import EuropeIcon from './EuropeIcon';
import AmericasIcon from './AmericasIcon';
import { useSession } from 'next-auth/react';

function UserSettingsForm() {
  const { data:session } = useSession();

  return (
      <form
      className='grid grid-cols-3 gap-3 p-4 shadow border border-secondary bg-foreground rounded-md'
      >
        <Avatar
        className='p-8'
        src={session?.user.image}
        />
        <Input
        color='default'
        label="Username"
        type="text"
        disabled
        value={session?.user.name}  
        className='dark col-span-1 rounded-xl'
        />
                <Input
        color='default'
        label="Age"
        type="text"
        value={session?.user.age}
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
        value={session?.user.discord} 
        className='dark col-span-1 rounded-xl'
        />
        <Input
        label="Steam"
        variant='flat'
        color='default'
        type="text"
        value={session?.user.steam} 
        className='dark col-span-1 rounded-xl'
        />
        <Dropdown className='dark'>
          <DropdownTrigger>
            <Button 
            className='dark p-7' 
            variant='solid'
            color='default'
            >
              Region
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
