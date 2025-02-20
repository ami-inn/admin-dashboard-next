
'use client'

import AuthForm from '@/components/AuthForm'
import { signinSchema } from '@/lib/validations'
import React from 'react'

const page = () => {
  return (
    <AuthForm
    type='sign-in'
    schema = {signinSchema}
    defaultValues = {{email:'',password:''}}
    onSubmit  = {()=>{}}
    />
  )
}

export default page