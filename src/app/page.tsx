import Link from "next/link"

const HomePage = () => {
  return (
    <div className="fix-height">
      <h1>HomePage</h1>
      <p>Welcome to next js - Home Page</p>
      <div>
        <Link href="/About">go to About page</Link>
      </div>
    </div>
  )
}

export default HomePage