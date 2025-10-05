import React from 'react'
import Link from 'next/link'
import styles from "./header.module.css"
import Navbar from './Navbar'
// we use module css intead of regular css because its prevent overloads when we have similar css class names in more than one component

const Header = () => {
  return (
    <header className={styles.header}>
      <Navbar />
      <div className={styles.right}>
        <Link href="/login" className={styles.btn}>login</Link>
        <Link href="/register" className={styles.btn}>register</Link>
      </div>
    </header>
  )
}

export default Header