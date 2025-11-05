import React from 'react'
import Link from 'next/link'
import styles from "./header.module.css"
import Navbar from './Navbar'
import { cookies } from 'next/headers'
import { verifyTokenForPage } from '@/utils/verifyToken'
import LogoutButton from './LogoutButton'
// we use module css intead of regular css because its prevent overloads when we have similar css class names in more than one component

const Header = async () => {
  const token = (await cookies()).get("jwtToken")?.value || ""
  const user = verifyTokenForPage(token)

  return (
    <header className={styles.header}>
      <Navbar />
      <div className={styles.right}>
        {user ? (<>
          <Link href="/" className='text-blue-800 md:text-xl capitalize'>
            {user?.username}
          </Link>
          <LogoutButton />
        </>) :
          (<><Link href="/login" className={styles.btn}>login</Link>
            <Link href="/register" className={styles.btn}>register</Link></>)}
      </div>
    </header>
  )
}

export default Header