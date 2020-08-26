import React from "react";
import { Navbar, Nav, NavItem, NavbarBrand } from "reactstrap";
import { faIdBadge } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { Button, ButtonHamburger } from "../../shared";

interface NavBarProps {
  brandText: string
  onToggleLeftSideBar: () => void
  onToggleRightSideBar: () => void
  navBarOpen: boolean
}

const Header: React.FC<NavBarProps> = ({ brandText, onToggleLeftSideBar, onToggleRightSideBar, navBarOpen }) => {

  return (
    <Navbar color="light" light className="navbar shadow-sm p-3 mb-5 bg-white rounded" expand="md">
      <ButtonHamburger active={!navBarOpen} color='dark' className='mr-3' onClick={onToggleLeftSideBar} />
      <NavbarBrand tag={Link} to='/dashboard'>{brandText}</NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <span>Guest</span>
          <Button variant='transparent' iconVariant='primary' iconSize='lg' icon={faIdBadge} onClick={onToggleRightSideBar} />
        </NavItem>
      </Nav>
    </Navbar>
  )
}

export default Header;
