import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { setCookie, removeCookie } from 'typescript-cookie';

export default function Logout() {

  const router = useRouter()
  useEffect(() => {
    removeCookie('Username')
    removeCookie('Token')
    router.push('/login')
}, [])



  return (
    0
  )
}
