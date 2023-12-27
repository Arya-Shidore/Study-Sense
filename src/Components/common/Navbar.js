import React from 'react';
import logo from '../../assets/Logo/Logo-Full-Light.png';
import { Link, matchPath } from 'react-router-dom';
import { NavbarLinks } from '../../data/navbar-links';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({path:route},location.pathname);
  };

  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
      <div className='flex w-11/12 max-w-maxContent items-center justify-start gap-x-[200px]'>
        <Link to='/'>
          <img src={logo} width={160} height={160} loading='lazy' alt='Logo' />
        </Link>
        <div className='flex justify-start'>
          <nav>
            <ul className='flex gap-x-6 text-richblack-25'>
              {NavbarLinks.map((link, index) => (
                <li key={index}>
                  {link.title === 'Catalog' ? (
                    <div></div>
                  ) : (
                    <Link to={link.path}>
                      <p className={`${matchRoute(link.path) ? 'text-yellow-25' : 'text-richblack-25'}`}>
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className='flex justify-end'>
            <div className='flex items-center justify-center gap-x-4'>
                <Link to='/login'>
                <button className='bg-richblack-25 text-white font-bold py-2 px-4 rounded'>
                    Login
                </button>
                </Link>
                <Link to='/signup'>
                <button className='bg-richblack-25 text-white font-bold py-2 px-4 rounded'>
                    Sign Up
                </button>
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
