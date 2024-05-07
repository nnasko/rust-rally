// components/Navbar.tsx
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import Link from 'next/link';
import Logo from './Logo';
import LoginButton from './LoginButton';

const Navigationbar = () => {
  return (
    <Navbar className='bg-foreground border-b border-secondary'>
      <NavbarBrand>
        <Logo h={50} w={50} />
        <Link href="/">
        <p className="font-bold text-xs">RUSTRALLY</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-16" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            HOME
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/posts" aria-current="page">
            POSTS
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/contact">
            CONTACT US
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <LoginButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Navigationbar;
