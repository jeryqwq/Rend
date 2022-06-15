import { getUserInfo } from "@/server/login"
import { useState } from "react"

export default function useUserInfo(){
  const userStr = localStorage.getItem('USER')
  const [userInfo, setUserInfo] = useState(userStr && JSON.parse(userStr))
  return {
    user: userInfo,
    login: (user: any) => {
      setUserInfo(user)
      localStorage.setItem('USER', JSON.stringify(user))
    },
    tk: localStorage.getItem('TK')
  }
}
