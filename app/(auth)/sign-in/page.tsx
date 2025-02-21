
'use client'

import AuthForm from '@/components/AuthForm'
import { signInCredentials } from '@/lib/actions/auth'
import { signinSchema } from '@/lib/validations'
import React from 'react'

const page = () => {
  return (
    <AuthForm
    type='sign-in'
    schema = {signinSchema}
    defaultValues = {{email:'',password:''}}
    onSubmit  = {signInCredentials}
    />
  )
}

export default page