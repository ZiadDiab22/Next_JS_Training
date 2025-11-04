"use client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import styles from "./header.module.css"

const LogoutButton = () => {
  const router = useRouter();
  const logoutHandler = async () => {
    try {
      await axios.get("http://localhost:3000/api/users/logout")
      router.push("/login")
      router.refresh()
    } catch (error) {
      toast.warning("something went wrong")
      console.log(error)
    }
  }

  return (
    <button onClick={logoutHandler}
      className={styles.btn}>
      Logout
    </button>
  )
}

export default LogoutButton