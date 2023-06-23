import './Navbar.css';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

export default function Navbar() {
  return (
    <div className='navigation-main'>
      <div className='navigation-container'>
        <div className='navigation-left'>
          <div className='navigation-logo'>
            <ul>
              <li className='navigation-list-item logo'>
                <a href='/'>FootWise</a>
              </li>
            </ul>
          </div>
        </div>
        <div className='navigation-center'>
          <ul className='navigation-list'>
            <li className='navigation-list-item'>
              <a className='menu-link' href='/'>
                Shop All
              </a>
            </li>
            <li className='navigation-list-item'>
              <a className='menu-link' href='/'>
                Bestsellers
              </a>
            </li>
            <li className='navigation-list-item'>
              <a className='menu-link' href='/'>
                Weekend Boot
              </a>
            </li>
            <li className='navigation-list-item'>
              <a className='menu-link' href='/'>
                About
              </a>
            </li>
          </ul>
        </div>
        <div className='navigation-right'>
          <ul className='navigation-list'>
            <li className='navigation-list-item'>
              <a href='/'>
                <PersonOutlineOutlinedIcon />
              </a>
            </li>
            <li className='navigation-list-item'>
              <a href='/'>
                <ShoppingCartOutlinedIcon />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
