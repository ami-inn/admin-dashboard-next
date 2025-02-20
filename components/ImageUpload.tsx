
'use client'
import React from 'react'
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import config from '@/lib/config';

const authenticator = async ()=>{
    try {
        const response = await fetch(`${config.env.apiEndPoint}/api/auth/imageKit`)
      
        if(!response.ok){
          const errorText = await response.text()
          throw new Error(`Request failed with status ${response.status}: ${errorText}`)
        }

    const data = await response.json()

    const {signature,expires,token} = data
    
    return {signature,expires,token}

        
    } catch (error:any) {
        throw new Error(`Error authenticating user: ${error}`)
    }




}

const ImageUpload = () => {
  return (
    <div>ImageUpload</div>
  )
}

export default ImageUpload