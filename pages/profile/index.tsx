// @ts-nocheck
import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Orbis} from '@orbisclub/orbis-sdk'
import { setUser, setOrbisObject } from '../../redux/userSlice'
import {PINATA_GATEWAY, PINATA_KEY, PINATA_SECRET} from '../../assets/constants'
import { Sidebar, TopNav, TrendingBar } from '../../components'
import ProfileMain from '../../components/ProfileMain'
export default function index() {
    const [userInfo, setuserInfo] = useState()
    const [isError, setisError] = useState()
    const [userPosts, setuserPosts] = useState()
    const [userPostsError, setuserPostsError] = useState()
    const [isUserPostsLoading, setisUserPostsLoading] = useState(false)
    const [isUserInfoLoading, setisUserInfoLoading] = useState(false)
    const {user, isAuthenticated, orbis} = useSelector(state => state.user)

      console.log("the user id", user.did)
    const profileOrbis = new Orbis({
        PINATA_GATEWAY: PINATA_GATEWAY,
        PINATA_API_KEY: PINATA_KEY,
        PINATA_SECRET_API_KEY: PINATA_SECRET
    })
    const dispatch = useDispatch()
    const getSession = async () => {
          const res = await profileOrbis.isConnected();
           return res
  }
  
   // console.log("the  user", userData)
   const  getConnectedUser = async () => {
     const currentUser = await getSession()
      dispatch(setUser({currentUser}))
     dispatch(setOrbisObject(profileOrbis))
      console.log("The get  session  is  re-running" )
   }
         
  useEffect(() => {
      
    getConnectedUser()  
    
  }, [isAuthenticated])

    useEffect(() => {
      let orbis = new Orbis();
      const fetchUserData = async () =>  {
       
        let { data, error } = await orbis.getProfile(user.did);
         setuserInfo(data)
         setisError(error)

      }
    
      fetchUserData()

       const fetchUserPosts = async () =>  {
        setisUserPostsLoading(true)
        let { data, error } = await orbis.getPosts({
          context : "peruzi10",
          did : user.did,
          only_master : true
        });
          setisUserInfoLoading(false)
          setuserPosts(data)
          setuserPostsError(error)
       }
       fetchUserPosts()
    }, [user])
  
  return (
    <div className='max-w-[1300px] h-screen mx-auto'>
      <TopNav  />
     <div className='flex sm:justify-center  hide-scrollbar '>
        <Sidebar   />
         <ProfileMain  />
          <TrendingBar />
          </div>
    </div>
  )
}

 /*export async function getServerSideProps(){
  let orbis = new Orbis();
  let { data, error } = await orbis.getProfile(user.id);

  return {
    props : {
      userData : data,
       userError : error
    }
  }
}
*/