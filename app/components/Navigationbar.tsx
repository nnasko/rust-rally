// components/Navbar.tsx
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import Link from 'next/link';
import Logo from './Logo';

const Navigationbar = () => {
  return (
    <Navbar className='bg-foreground border-b border-secondary'>
      <NavbarBrand>
        <Logo h={50} w={50} />
        <p className="font-bold text-xs">RUSTRALLY</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-16" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/info">
            INFO
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
          <Button as={Link} color='secondary' variant="flat" className='rounded-lg' href='/auth/register'>
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Navigationbar;
