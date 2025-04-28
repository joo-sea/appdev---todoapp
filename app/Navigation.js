"use client"

import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation({ session }) {
    let callToAction;
    if (session) {
      callToAction = (
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              placeholderInitials={session.user.name.substring(0,2).toUpperCase()}
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{session.user.name}</span>
          </Dropdown.Header>
          <Dropdown.Item onClick={() => signOut()}>Sign out</Dropdown.Item>
        </Dropdown>
      );
    } else {
      callToAction = <Button onClick={() => signIn()}>Login</Button>
    }
    return (
      <Navbar fluid rounded>
        <Navbar.Brand href="/" as={Link}>
          <Image
            src="/favicon.ico"
            width="25"
            height="25"
            className="mr-3"
            alt="Flowbite React Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Flowbite React
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          {callToAction}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="/" as={Link} active={usePathname() === '/'}>
            Home
          </Navbar.Link>
          <Navbar.Link href="/todos" as={Link} active={usePathname() === '/todos'}>Todos</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    );
  }