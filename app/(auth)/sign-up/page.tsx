'use client'

import AuthForm from '@/components/AuthForm'
import { signUp } from '@/lib/actions/auth'
import { signupSchema } from '@/lib/validations'
import React from 'react'

const page = () => {
  return (
    <AuthForm
    type='sign-up'
    schema = {signupSchema}
    defaultValues = {{
        email:'',
        password:'',
        fullName:'',
        universityId:0,
        universityCard:''
    }}
    onSubmit  = {signUp}
    />
  )
}

export default page