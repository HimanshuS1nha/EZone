import HeroSection from "./components/HeroSection"
import ShowCase from "./components/Showcase"

export default async function Home() {
  return (
    <>
      <HeroSection />
      <ShowCase category="electronics" limit={4} />
      <ShowCase category="jewelery" limit={4} />
      <ShowCase category="men's clothing" limit={4} />
      <ShowCase category="women's clothing" limit={4} />
    </>
  )
}
