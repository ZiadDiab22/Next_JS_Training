import Hero from "@/components/home/Hero"
import Link from "next/link"
import WebHostingPlan from "@/components/home/WebHostingPlan";

const HomePage = () => {
  return (
    <section>
      <Hero />
      <h2 className="text-center mt-10 text-3xl font-bold">
        Choose Your Web Hosting Plan
      </h2>
      <div className="flex justify-center items-center flex-wrap md:gap-7" style={{ padding: '2rem' }}>
        <WebHostingPlan />
        <WebHostingPlan />
        <WebHostingPlan />
      </div>
    </section>
  )
}

export default HomePage