import Image from 'next/image';
//image component is better than image tag because it reduce the size of images which is making the loading faster
import CloudImage from '../../../public/cloud-hosting.png';
//if we want to use an image from global site or remote server then we need to edit config in next.config.js

const AboutPage = () => {
  return (  
    <section className="fix-height container m-auto">
      <h1 className="text-3xl font-bold text-gray-800 p-5">About Page</h1>
      <div>
        <Image src={CloudImage} alt='cloud' width={500} height={500} priority />
      </div>
    </section>
  )
}

export default AboutPage