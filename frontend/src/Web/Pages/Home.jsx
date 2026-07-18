import React from 'react'
import Navbar from '../components/common/Navbar'
import Hero from '../components/HomePage/Hero'
import FeaturedProducts from '../components/HomePage/FeaturedProducts'
import OffersSection from '../components/HomePage/OffersSection'
import Brands from '../components/HomePage/Brands'
import Testimonials from '../components/HomePage/Testimonials'
import Newsletter from '../components/HomePage/Newsletter'
import Footer from '../components/common/Footer'
import ScrollProgressBar from './ScrollProgressBar'


function Home() {
  return (
    <>

      <Navbar />
      <Hero />
      <FeaturedProducts />
      <OffersSection />
      <Brands />
      <Testimonials />
      <Newsletter />
      <Footer />
      <ScrollProgressBar />



    </>
  )
}

export default Home
