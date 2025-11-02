"use client";
import React, { useState } from 'react'
import Link from 'next/link'
import { GrTechnology } from 'react-icons/gr'
import { AiOutlineMenu } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io';
import styles from "./header.module.css"
// we use module css intead of regular css because its prevent overloads when we have similar css class names in more than one component

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <nav className={styles.navbar}>
      <div>
        <Link href="/" className={styles.logo}>CLOUD <GrTechnology /> HOSTING</Link>
        <div className={styles.menu}>
          {toggle ? (<IoMdClose onClick={() => setToggle(prev => !prev)} />) : <AiOutlineMenu onClick={() => setToggle(prev => !prev)} />}
        </div>
      </div>
      <div className={styles.navLinkWrapper}
        style={{
          clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)" || ""
        }}>
        <ul className={styles.navLinks}>
          <Link onClick={() => setToggle(false)} href="/" className={styles.navLink}>Home</Link>
          <Link onClick={() => setToggle(false)} href="/About" className={styles.navLink}>about</Link>
          <Link onClick={() => setToggle(false)} href="/info?pageNumber=1" className={styles.navLink}>info</Link>
          <Link onClick={() => setToggle(false)} href="/admin" className={styles.navLink}>admin dashboard</Link>
          <Link onClick={() => setToggle(false)} href="/contact" className={styles.navLink}>contact</Link>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar