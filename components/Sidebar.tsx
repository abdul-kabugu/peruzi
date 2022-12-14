// @ts-nocheck
import Image from 'next/image'
import {useState} from 'react'
import Link from 'next/link'
import {Links} from '../assets/constants'
import { AiOutlineUpload } from 'react-icons/ai'
import { RiBookOpenLine, RiCloseLine } from 'react-icons/ri'
import { HiOutlineDotsHorizontal, HiOutlineMenu } from 'react-icons/hi'
import { useSelector, useDispatch } from 'react-redux'
import { toggleNavbar } from '../redux/toggleSlice'
import {PINATA_GATEWAY} from "../assets/constants"

export default function Sidebar() {
   //const [isMobileMenuOpen, setIsmobileMenuOpen] = useState(false)
   const [isShowLogOut, setisShowLogOut] = useState(false)
   const {isMobileMenuOpen} = useSelector(state => state.navbar)
   const {user, orbis, isAuthenticated } = useSelector(state => state.user)
   const toggleIsShowLogout = () =>  {
     isShowLogOut ? setisShowLogOut(false) : setisShowLogOut(true)
   }
       const dispatch  =  useDispatch()
   console.log("the user", user)
       const toggleNavigation = () => {
        dispatch(toggleNavbar(false))
      
     }
     const pfpUrl = user?.details?.profile?.pfp?.replace("ipfs://", PINATA_GATEWAY)
       const handleLogOut = async () =>  {
        let res = await orbis.logout();
         toggleIsShowLogout()
       }
      const GetNavbar = ({handleClick}) =>  {
         
          return(
            <>
             {Links.map((item, i) => {

               return(
                <div className='' key={item.to}>
                <Link href={item.to} onClick={handleClick && handleClick()}>
                  <div className={`flex items-center gap-3 py-2 my-2  hover:text-purple-500 
                    ${item.isFirst && "text-purple-700"}
                  `}>
                  <item.icon   size={25} className={`${item.isFirst && "text-2xl"}`} />
                   <p className={`font-semibold hover:text-xl ${item.isFirst && "text-2xl"} `}>{item.name}</p>
                  </div>
                </Link>
                </div>
               )
             })}
              <div className='flex gap-2 items-center bg-purple-600 w-[180px] py-3 px-5 rounded-lg text-white justify-center cursor-pointer'>
      <AiOutlineUpload size={25} />
        <button className='capitalize text-xl font-semibold'> <Link href='/create-post'>Post</Link> </button>
          
        </div>
         {isAuthenticated &&
          <div className='flex flex-col items-center gap-4 w-[200px] mt-auto py-3 mb-3'>
             {isShowLogOut && <div>
                <div className='flex items-center gap-2 py-2 px-3 border border-purple-200 rounded-lg cursor-pointer' onClick={handleLogOut}> <p>Logout</p> <p>@ {user?.details?.profile.username}</p></div>
              </div>}
              <div className='flex items-center gap-3'>
            <div className='w-[40px] h-[40px] ring-2 ring-purple-400 rounded-full flex items-center justify-center '>
              <img   src={pfpUrl || "/img/peruzi.png"} alt="user"
                className='w-[80%] rounded-full'
              />

             
            </div>
             <p>{user?.details?.profile?.username}</p>
            <HiOutlineDotsHorizontal className='cursor-pointer' onClick={toggleIsShowLogout} />
            </div>
          </div>
         }
       
             </>
          )
          
      }
     
  return (
    <>
    <div className='md:flex hidden flex-col w-[300px] h-screen  pt-3 px-4' >
        <div className='flex items-end gap-2 mb-4 mt-1 '>
            <Image  src="/img/peruzi.png" alt='logo' width={60} height={60} />
             <p className='text-gray-400 font-semibold'>Beta</p>
        </div>
        <GetNavbar  />
        
            
    </div>
    {/*
    <div className='absolute xs:hidden sm:block md:hidden block top-6 left-3'>
    <HiOutlineMenu onClick={() => setIsmobileMenuOpen(true)}/>
     </div>
  */}
           <div className={`absolute top-0 h-screen w-2/3 z-10 backdrop-blur-lg px-4 py-4 xs:hidden sm:block md:hidden
             bg-black text-white smooth-transition ${isMobileMenuOpen ? "left-0" : "-left-full "}
           `} >
             <div className='flex items-center justify-between'>
        <div className='flex items-end gap-2 mb-4'>
            <Image  src="/img/black-logo.png" alt='logo' width={60} height={60} />
             <p className='text-gray-400 font-semibold'>Beta</p>
        </div>
          <RiCloseLine   size={30} className="cursor-pointer" onClick={() => toggleNavigation()}  />
        </div>
        <GetNavbar  />
        
            
    </div>
      <div className='fixed  top-auto bottom-0 sm:hidden w-[100vw] bg-white z-10 rounded-t-xl py-3'>
         <div className='flex gap-4 justify-between px-6'>
         {Links.map((link, i) => {

          return(
            <Link key={i} href={link.to} >
                <div className=''>
                  <link.icon className='w-8 h-8 xs:w-6 xs:h-6' />
                </div>
            </Link>
          )
         })}
      </div>
      </div>
    </>
  )
}
