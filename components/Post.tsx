// @ts-nocheck

import Image from "next/image"
import { useState, useEffect, useContext } from "react"
import { AiOutlineLock } from "react-icons/ai"
import { useSelector, useDispatch } from "react-redux"
import PostCardFooter from "./PostCardFooter"
import PostHeader from "./PostHeader"
import {Orbis} from '@orbisclub/orbis-sdk'
import {PINATA_GATEWAY, PINATA_KEY, PINATA_SECRET} from '../assets/constants'
import { setOrbisObject } from "../redux/userSlice"
import OrbisProvider from "../context/orbisProvider"
import { truncatetext } from "../hooks/useSubstring"
import Link from "next/link"


export default function Post({post}) {
  const [isLoading, setisLoading] = useState(false)
  const [decryptedPost, setdecryptedPost] = useState()
  const [status, setstatus] = useState()
      const dispatch = useDispatch()
    const {user, orbis} = useSelector(state => state.user)
     const context = useContext(OrbisProvider)

    
    useEffect(() => {
        // decrypt  post
      
       
         setisLoading(true)
       const decryptPosts = async () => { if(post.content?.body){
        setdecryptedPost(post.content.body)
     }else if(post.content?.encrypteBody?.encryptedString != {}){
       let res = await context.decryptPost(post.content);
       if(res.status === 300){
         setstatus(300)
       }else{
         setdecryptedPost(res.result)
         setisLoading(false)
       }


     }}

        decryptPosts()
        console.log("the context")
    }, [decryptedPost])
    
   
          //
  console.log("the context", post)
         //REMOVED_ THE  HEIGHT  DIMENSIONS 
          //xs:h-[210px] sm:h-[310] md:h-[326px] lg:h-[386px]
    //  post?.content?.body
            const handleBuyMembership = (url) =>  {
              window.open(url, "_blank")
            }
      const  displayPosts  = () =>  {
        if(!("title" in post?.content)){
          return(
            <div className="py-1 px-2">
           <Link href={`/post/${post.stream_id}`}><p className="font-sans text-lg">{decryptedPost && truncatetext(decryptedPost, 200)}</p> </Link> 
             <div className="bg-gray-400 w-[100%]   rounded-md ">
                {post?.content?.media?.map((img, i) => {
                  const imgUrl = img.url?.replace("ipfs://", `${img.gateway}`)
                  return(
                  <img key={i} src={imgUrl} alt='picture'
                    className="w-[100%] xs:h-[210px] sm:h-[310px]  max-h-[100%]  lg:h-[386px] object-cover rounded-md "
                  />
                  )
                })}
             </div>
             
          </div>
          )
        }else if(post?.content.body  === "" ){
          return(
            <div>
            <div className="py-1 px-2 relative">
              
            <div className="bg-gray-400 w-[100%] -order-first  rounded-md ">
               {post?.content?.media?.map((img, i) => {
                 const imgUrl = img.url?.replace("ipfs://", `${img.gateway}`)
                 return(
                 <img key={i} src={imgUrl} alt='picture ' 
                   className="w-[100%] xs:h-[210px] sm:h-[310px]  max-h-[100%]  lg:h-[386px] object-cover rounded-md "
                 />
                 )
               })}
            </div>
            <div className="w-[100%]  h-[100%] bg-black/80 absolute z-0 top-0 left-0 backdrop-blur-md rounded-md
              flex items-center justify-center text-white flex-col
            ">
                   <AiOutlineLock className="w-11 h-11 mb-2"  />
                   <p className="font-semibold">Unlock full content  by <br /> subscribing to creator</p>
                   <button className="mt-2 py-2 px-3 border border-purple-400 rounded-md" onClick={() => handleBuyMembership(post?.content?.data.purchaseUrl)}>Buy membership</button> 
            </div>
              
            </div>
            <div className="py-1 px-4 w-[100%]">
           <Link href={`/post/${post.stream_id}`}> <h1 className="font-semibold text-xl">{post?.content  && truncatetext(post.content.title, 100)}</h1></Link>
            </div>
            </div>
          )
        }else  {
          return(
            <div className="py-1 px-2">
            
             <div className="bg-gray-400 w-[100%]  rounded-md ">
                {post?.content?.media?.map((img, i) => {
                  const imgUrl = img.url?.replace("ipfs://", `${img.gateway}`)
                  return(
                  <img key={i} src={imgUrl} alt='picture ' 
                    className="w-[100%] xs:h-[210px] sm:h-[310px]  max-h-[100%]  lg:h-[386px] object-cover rounded-md "
                  />
                  )
                })}
             </div>
             <div className="py-1 px-4 w-[100%]">
              <Link href={`/post/${post.stream_id}`}> <h1 className="font-semibold text-xl">{post?.content  && truncatetext(post.content.title, 100)}</h1></Link>
            </div>
          </div>
          )
        }

        
      }
  return (
    <div className="w-[100%] border border-gray-300 my-2  rounded-lg  py-2 px-2">
       <PostHeader post = {post} />
        {
           displayPosts()
         }
         
         <PostCardFooter post = {post} />
    </div>
  )
}
