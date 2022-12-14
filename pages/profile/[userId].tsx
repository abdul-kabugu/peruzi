// @ts-nocheck
import {useState, useEffect, useContext} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Orbis} from '@orbisclub/orbis-sdk'
import UserBanner from '../../components/UserBanner'
import { TopNav, Sidebar, ProfileMain, TrendingBar, UserIdMain } from '../../components'
import UserStats from '../../components/UserStats'
import OrbisProvider from '../../context/orbisProvider'
import { setUser } from '../../redux/userSlice'


function UserDetails({userDetails, userDetailsError, userPosts, postsError}) {
 const [isGetUserLoading, setisGetUserLoading] = useState(false)
  console.log("the user details from  user details page", userDetails)
  const {user} = useSelector(state => state.user)
   const context = useContext(OrbisProvider)
   const dispatch = useDispatch()
    console.log("the user from  user id", user)

      useEffect(() => {
        const getConnectedAccount  =  async () => {
          let res = await context.isConnected();
            return res
        }
      
         const setConnectedUser =  async () =>  {
            const currentUser =  await getConnectedAccount()
              dispatch(setUser({currentUser}))
         }

          setConnectedUser()
        
      }, [])
      
  
  return (
    <div className='max-w-[1300px] h-screen mx-auto'>
    <TopNav  />
   <div className='flex sm:justify-center  hide-scrollbar '>
      <Sidebar   />
      
        <UserIdMain userDetails = {userDetails} userPosts = {userPosts} userAccount = {user}  />
        
        <TrendingBar />
        </div>
  </div>
  )
}

export default UserDetails


export const  getServerSideProps = async (context) => {
  let orbis = new Orbis();
      const  {params} = context
      const {userId} = params
      
      let { data, error } = await orbis.getProfile(userId)

      let { data :userPosts, error : userPostsError } = await orbis.getPosts({
        context : "peruzi10",
        did : userId,
        only_master : true
      });
    return {
      props : {
        userDetails : data,
        UserDetailsError : error,
        userPosts : userPosts,
        postsError : userPostsError
      }
    }
}