import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper";
import { SingleProductData } from "./single-product-data";

const ProductsSlider = ({ proData }: { proData: any }) => {
    return (
        <Swiper
            className="mb-7 w-[99%]"
            slidesPerView={2}
            modules={[Autoplay]}
            breakpoints={{
                // when window width is >= 640px
                1024: {
                    width: 1024,
                    slidesPerView: 4,
                },
                // when window width is >= 768px
                520: {
                    width: 520,
                    slidesPerView: 3
                },
            }}>
            {proData.map((pro_data: any, indx: number) => (
                <SwiperSlide className={`cursor-grab w-full mr-2 py-3 ${indx === 0 ? "ml-3" : ""}`}>
                    <SingleProductData pro_data={pro_data} isRowView={false} />
                </SwiperSlide>
            ))}

        </Swiper>
    )
}

export default ProductsSlider