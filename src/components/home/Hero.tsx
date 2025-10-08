import { TiTick } from 'react-icons/ti'
import Image from 'next/image';
//image component is better than image tag because it reduce the size of images which is making the loading faster
import CloudImage from '../../../public/cloud-hosting.png';
//if we want to use an image from global site or remote server then we need to edit config in next.config.js
import styles from './hero.module.css'

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.heroLeft}>
        <h1 className={styles.title}>Cloud Hosting</h1>
        <p className={styles.desc}>The best web hosting solutions for your online success</p>
        <div className={styles.services}>
          <div className={styles.serviceItem}><TiTick /> Easy to use control panel</div>
          <div className={styles.serviceItem}><TiTick /> Secure Hosting</div>
          <div className={styles.serviceItem}><TiTick /> Website Maintenance</div>
        </div>
      </div>
      <Image src={CloudImage} alt='cloud' width={500} height={500} />
    </div>
  )
}

export default Hero