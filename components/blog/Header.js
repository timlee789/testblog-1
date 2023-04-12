import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"

import { Menu } from '@headlessui/react';
import DropdownLink from '../flyer/dropdownlink';
import { Store } from '../../utils/Store';
import  Cookie  from 'js-cookie';
import { ToastContainer } from 'react-toastify';
import Menubar from '../munubar'
import Footer from "./Footer";


const Header = () => {

  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const sellername = Cookie.get('Sellername');
  const seller = Cookie.get('Seller');
  const [hydrated, setHydrated] = React.useState(false);

  useEffect(() => {
    setHydrated(true);
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);
  if (!hydrated) {
    return null;
  }
  const logoutClickHandler = () => {
    signOut({ callbackUrl: '/' });
  };
  
  return (
    <div className="w-full h-20 border-b-[1px] border-b-black font-titleFont sticky top-0 bg-white z-50 px-4 pt-4">
       <ToastContainer position="bottom-center" limit={1} autoClose={2000} />
       <header>
      <div className="max-w-7xl h-full mx-auto flex justify-between items-center">      
        {session?.user?.isAdmin? ( 
              <Link href="/">
              <div className="text-sm font-bold">{session.user.name}</div>
              </Link>
            ) : sellername? (
              <div >
                   <div>
                      <Link href={`/store/${seller}`}>
                      <div className="mobile: text-sm text-black font-bold  laptop:text-lg text-black font-bold  ">{sellername}</div>
                      </Link>
                    </div>                                                        
                    </div>
            ) : (
              <div className=''>
                      <Link href="/">
                        <div className='mobile: text-sm text-black font-bold  laptop:text-lg text-black font-bold'>Localflyer.online</div>
                      </Link>
              </div>
            )
           }    
        <div >
          <ul className="hidden lg:inline-flex gap-8 uppercase text-sm font-semibold">
            <li className="headerLi">Home</li>
            <li className="headerLi">Beauty News</li>
            <li className="headerLi">Landing Page</li>
            <li className="headerLi">Beauty video</li>
            <li className="headerLi">Contact</li>
          </ul>
        </div>
       <div className="md:hidden">
       <Menu as="div" className="relative inline-block z-10 ml-12">
                            <Menu.Button className="text-black font-bold text-md">       
                            {/* { session.user.name } */}
                            Menu
                            </Menu.Button>
                            <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
                              
                              <Menu.Item>
                              <DropdownLink
                                  className="dropdown-link"
                                  href="#"
                                >
                                  Beauty News
                                </DropdownLink>
                              </Menu.Item>
                            
                              <Menu.Item> 
                                <DropdownLink
                                  className="dropdown-link"
                                  href="#"
                                >
                                  Landing Page
                                </DropdownLink>
                              </Menu.Item>
                              <Menu.Item>
                                <DropdownLink
                                  className="dropdown-link"
                                  href="#"
                                >
                                  Beauty video
                                </DropdownLink>
                              </Menu.Item>
                            
                              <Menu.Item>
                              <DropdownLink
                                  className="dropdown-link"
                                  href="#"
                                >
                                 contact
                                 </DropdownLink>
                              </Menu.Item>
                              
                            </Menu.Items>
                          </Menu>
       </div>
        <div className="flex items-center gap-8 text-lg">
          <div className="flex items-center gap-1">
            {/* <img
              className="w-8 h-8 rounded-full"
              src="https://www.noormohammad.live/static/media/roundedProfile.477a194221d255c8ce26.png"
              alt="logo"
            /> */}
             <Link href="/cart"> 
                      <div className='flex flex-col-2'>
                       <div className="mobile:font-bold ml-12 "> Cart</div>
                       <div>
                        {cartItemsCount > 0 && (
                          <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                            {cartItemsCount}
                          </span>
                        )}</div> 
                        </div>
            </Link>
            {/* <p className="text-sm font-medium">
             Welcome {session ? session?.user!.name : ""} 
            </p> */}
          </div>
        {session? (         <Menu as="div" className="relative inline-block z-10 ml-12">
                            <Menu.Button className="text-black font-bold text-md">       
                            {/* { session.user.name } */}
                            Menu
                            </Menu.Button>
                            <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
                              
                              <Menu.Item>
                              <DropdownLink
                                  className="dropdown-link"
                                  href="/admin/orders"
                                >
                                  Orders
                                </DropdownLink>
                              </Menu.Item>
                            
                              <Menu.Item> 
                                <DropdownLink
                                  className="dropdown-link"
                                  href="/admin/products/productadd"
                                >
                                  Product Add
                                </DropdownLink>
                              </Menu.Item>
                              <Menu.Item>
                                <DropdownLink
                                  className="dropdown-link"
                                  href="/admin/products/productedit"
                                >
                                  Product Edit
                                </DropdownLink>
                              </Menu.Item>
                            
                              <Menu.Item>
                                <div
                                  className="dropdown-link text-blue-500 font-bold"
                                  
                                  onClick={logoutClickHandler}
                                  >
                                  Logout
                                </div>
                              </Menu.Item>
                              
                            </Menu.Items>
                          </Menu>
                   
                  ) : (
                    <Link href="/login">
                    <button 
                        className="uppercase text-sm border-[1px] border-primaryColor hover:border-secondaryColor 
                        px-4 py-1 font-semibold hover:text-white rounded-md hover:bg-secondaryColor transition-all 
                        duration-300 active:bg-yellow-600">
                        Sign In
                    </button>
                    </Link>
                  )
        }
         
        </div>
      </div>
      </header>
      
     
    </div>
  );
};

export default Header;
