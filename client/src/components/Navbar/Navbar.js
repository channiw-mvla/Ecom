import React, { useState } from 'react';
import './Navbar.css';
import { IconButton, Menu, MenuItem } from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    handleMenuClose();
  };

  return (
    <div className="navigation-main">
      <div className="navigation-container">
        <div className="navigation-left">
          <div className="navigation-logo">
            <ul>
              <li className="navigation-list-item logo">
                <a href="/">FootWise</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navigation-center">
          <ul className="navigation-list">
            <li className="navigation-list-item">
              <a className="menu-link" href="/">
                Shop All
              </a>
            </li>
            <li className="navigation-list-item">
              <a className="menu-link" href="/">
                Bestsellers
              </a>
            </li>
            <li className="navigation-list-item">
              <a className="menu-link" href="/">
                Weekend Boot
              </a>
            </li>
            <li className="navigation-list-item">
              <a className="menu-link" href="/">
                About
              </a>
            </li>
          </ul>
        </div>
        <div className="navigation-right">
          <ul className="navigation-list">
            <li className="navigation-list-item">
              <div>
                <IconButton onClick={handleMenuOpen}>
                  <PersonOutlineOutlinedIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => handleOptionSelect('signin')}> <Link to={'/signin'}>Sign In</Link></MenuItem>
                  <MenuItem onClick={() => handleOptionSelect('signup')}><Link to={'/signup'}>Sign Up</Link></MenuItem>
                </Menu>
              </div>
            </li>
            <li className="navigation-list-item">
              <a href="/cart">
                <ShoppingCartOutlinedIcon />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
