import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { SingleProductData } from "./single-product-data";
import { Pagination, Navigation, Autoplay, Swiper as SwiperType } from "swiper";
import { useRef } from 'react';
import { useRouter } from 'next/router';
const ProductsSlider = ({ proData }: { proData: any }) => {
    const swiperRef = useRef<SwiperType>()
    return (
        <div className='relative'>
            <button onClick={() => swiperRef.current?.slidePrev()} className='absolute top-0 bottom-0 -left-10 xl:block hidden'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-7 h-7 fill-slate-400 -rotate-180" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                </svg>
            </button>
            <Swiper
                className="mb-7 w-[99%] "
                slidesPerView={2}
                modules={[Autoplay, Navigation, Pagination]}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
                speed={700}
                pagination={true}
                breakpoints={{
                    991: {
                        width: 991,
                        slidesPerView: 4
                    },
                    767: {
                        width: 767,
                        slidesPerView: 4
                    },
                    372: {
                        width: 671,
                        slidesPerView: 3
                    }

                }}>
                {proData.map((pro_data: any, indx: number) => (
                    <SwiperSlide className={`cursor-grab mr-2 py-3 ${indx === 0 ? "ml-3" : ""}`}>
                        <SingleProductData pro_data={pro_data} isRowView={false} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <button onClick={() => swiperRef.current?.slideNext()} className='absolute top-0 bottom-0 -right-10 xl:block hidden'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-7 h-7 fill-slate-400 " viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                </svg>
            </button>
        </div>
    )
}

export default ProductsSlider