import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import EastIcon from '@mui/icons-material/East';
import Smooth from '../utils/smooth'
import ProductListCard from './ProductListCard'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, EffectCoverflow, Keyboard } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import Link from 'next/link';


const Collections = () => {
  const categories = useSelector((state) => state.auth.categories)
  const collections = useSelector((state) => state.auth.collections)
  const products = useSelector((state) => state.auth.products)
  const selectedCategory = useSelector((state) => state.auth.selectedCategory)
  const [filterCollection, setFilterCollection] = useState([])
  useEffect(() => {
    if (selectedCategory) {
      setFilterCollection(collections.filter((collection) => {
        return collection.category == selectedCategory.title
      }))
    } else {
      setFilterCollection(collections)
    }
  }, [filterCollection, collections, selectedCategory])

  return (
    <Smooth className=' flex flex-col gap-10 mt-10'>
      {filterCollection?.map((collection, index) => (
        <div key={collection._id} className=' flex flex-col items-center gap-4'>
          <div className='flex flex-col items-center gap-0'>
            <p className=' uppercase text-xl cursor-default'>{collection.title}</p>
            <Link href={`/search/${collection.title}`} className=' text-xs flex items-center gap-1 hover:gap-4 cursor-pointer transition-all duration-200'>Checkout All Products<EastIcon /></Link>
          </div>
          <div className='w-[100%]'>
            <Swiper
              breakpoints={{
                0: {
                  slidesPerView: 3,
                  spaceBetween: 10
                },
                600: {
                  slidesPerView: 4,
                  spaceBetween: 10
                },
                1000: {
                  slidesPerView: 5,
                  spaceBetween: 10
                },
              }}
              slidesPerView={5}
              spaceBetween={30}
              navigation={true}
              grabCursor={true}
              loop={true}
              pagination={{
                clickable: true,
              }}
              keyboard={{
                enabled: true,
              }}
              modules={[Pagination, Navigation, Autoplay, Keyboard]}
              className="mySwiper"
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                reverseDirection: index % 2 === 0 ? true : false
              }}
            >
              {products?.filter((product) => product.collectionName === collection.title).map(product => (
                <SwiperSlide key={product._id} className=' mb-10'>
                  <ProductListCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      ))}
    </Smooth>
  )
}

export default Collections