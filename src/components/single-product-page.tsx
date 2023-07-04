import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaRegStar, FaStarHalfAlt, FaMinus, FaPlus } from 'react-icons/fa';
import { useLanguage } from "@/hooks/useLanguage";
import AddtoCartMobileview from "./add-cart-mobile-view";
import { useSession } from "next-auth/react";
import { useDispatch } from 'react-redux';
import { addToCart, decrementQuantity, incrementQuantity } from '../redux/cart.slice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { toast } from 'react-toastify';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import ContentLoader from "react-content-loader";
import ProductsSlider from "./products-slider";
import BreadCrumb from "./breadcrumb";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
const SingleProductsContent = ({ pro_data, relatedProductsData }: { pro_data: any, relatedProductsData: any }) => {

    const getProductQuantity = (productId: any) => {
        const productItem = cartItems.find((item: any) => item.id === productId);
        return productItem ? productItem.quantity : 0;
    };
    const dispatch = useDispatch();
    const [cartValue, setCartValue] = useState<number>(1);
    const [readMorClick, setReadMoreCLick] = useState(false)
    const [FeaturedImage, setFeaturedImage] = useState("https://www.lifepharmacy.com/images/default-product-image.png")
    const { data: session } = useSession()
    const [domLoaded, setDomLoaded] = useState(false)
    const [wishListItem, setWishlistedItem] = useState(false)
    const { currency } = useLanguage()
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const cartItems = useSelector((state: RootState) => state.cart);

    useEffect(() => {
        setDomLoaded(true)
        setFeaturedImage(pro_data.images.featured_image);

        getProductQuantity(pro_data.id) > 1 ?
            setCartValue(getProductQuantity(pro_data.id))
            : null
    }
        , [])

    const incrementCartQuantity = () => {
        dispatch(incrementQuantity(pro_data.id))
        setCartValue(value => value + 1)
        toast.info(`Cart successfully updated`);
    }

    const decrementCartQuantity = () => {
        dispatch(decrementQuantity(pro_data.id))
        setCartValue(value => value - 1)
        toast.info(`Cart successfully updated`);
    }

    const addedToCart = () => {
        dispatch(addToCart(pro_data))
        toast.success(`Item Added to the cart`);
    }

    function calculateRating(rating: number) {
        const fullStars = Math.round(rating);
        const halfStars = Math.round((rating - fullStars) * 2);

        const stars = new Array(5).fill(<FaRegStar className="text-amber-500 w-4 h-4" />);
        stars.fill(<FaStar className="text-amber-500 w-4 h-4" />, 0, fullStars);
        if (halfStars === 1) {
            stars[fullStars] = <FaStarHalfAlt className="text-amber-500 w-4 h-4" />;
        }
        return stars;
    }


    return (
        <div className="max-w-[1450px] mx-auto  sm:px-[10px] px-[5px]  md:text-sm sm:text-xs md:bg-white bg-slate-50  ">
            <BreadCrumb menuData={["Products", pro_data.title]} type={"products"} />
            <div>
                <div className="mx-auto  grid grid-cols-12 gap-x-5 my-5 ">
                    {pro_data && domLoaded ?
                        <>
                            <div className="flex md:col-span-4 min-[570px]:col-span-6 col-span-full border-2 border-muted rounded-lg shadow-md p-2 h-fit lg:flex-row md:flex-col-reverse">
                                <div className="hidden md:block col-span-2 ">
                                    {pro_data.images && pro_data.images.gallery_images[0] ?
                                        <div className="mr-4 lg:h-[21rem] h-fit no-scrollbar overflow-auto lg:block flex lg:space-x-0 space-x-2">
                                            {pro_data.images.gallery_images.map((gal_img: any, indx: number) => (
                                                <div className=" mb-3">
                                                    <input defaultChecked={"0galImg" === (indx + "galImg") ? true : false} type="radio" id={indx + "galImg"} className="hidden peer" name="proGalleryImage" />
                                                    <label htmlFor={indx + "galImg"} className=" peer-checked:brightness-100 rounded-lg  brightness-75 transition-all duration-400 ">
                                                        < Image className={`lg:max-w-[4.5rem] max-h-[4rem] rounded-lg cursor-pointer peer-checked:border-blue-500 border`} src={gal_img.thumbnail} height={80} width={80} onClick={() => {
                                                            setFeaturedImage(gal_img.medium)
                                                        }} alt="thumbnail-img" />
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                        : null
                                    }
                                </div>

                                <div className=" w-full  m-2 relative  bg-bottom col-span-10">
                                    <div className="w-full items-center h-full object-cover object-center rounded-lg bg-white">
                                        <Image alt="ecommerce" className="w-full  " height={300} width={300} src={FeaturedImage} />
                                    </div>
                                    {pro_data.offers && pro_data.offers.value ?
                                        <div className="absolute right-3 top-3 bg-[#00b929] rounded-lg text-white md:text-sm text-xs  px-2 py-1 shadow-lg text-center ">~ {parseFloat(pro_data.offers.value).toFixed(0)}% OFF</div> : null}
                                    {pro_data.label ? <div style={{ background: pro_data.label.color_code }} className={`skeleton-box flex absolute left-0 top-0 w-fit text-white px-3 items-center rounded-tl-lg rounded-br-2xl text-[9px] sm:py-1 py-[2px] sm:text-xs h-fit`}>{pro_data.label.label_text}</div> : null}
                                    <div className="absolute right-3 bottom-2 space-y-5">
                                        {wishListItem ?
                                            <svg onClick={() => setWishlistedItem(false)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-6 h-6 fill-blue-950" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                            </svg>
                                            :
                                            <svg onClick={() => setWishlistedItem(true)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-6 h-6 fill-blue-950" viewBox="0 0 16 16">
                                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                            </svg>
                                        }
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-6 h-6 fill-blue-950" viewBox="0 0 16 16">
                                            <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className=" pt-6 lg:mt-0 md:col-span-5  min-[570px]:col-span-6 col-span-full">
                                <h1 className=" xl:text-xl text-base  title-font mb-1 text-life">{pro_data.title}</h1>
                                <div className=" flex">
                                    <span className="flex items-center">
                                        {calculateRating(pro_data.rating).map(str => (
                                            str
                                        ))}
                                    </span>
                                    <span className="text-gray-600 ml-3">{pro_data.rating}</span>
                                </div>
                                {pro_data.categories ?
                                    <div className=" pt-2 ">
                                        {pro_data.categories.map((cat_data: any) => (
                                            <Link href={`/products?categories=${cat_data.slug}`} className=" inline-flex mr-3 hover:text-white hover:bg-red-600 text-red-600  px-2 text-[10px] py-0.4 border border-red-600 rounded-md my-1 transition-colors duration-200">{cat_data.name}</Link>
                                        ))}
                                    </div>
                                    : null}
                                <div className="flex justify-between py-2">
                                    <div className="flex space-x-1">
                                        <small>Brand: </small>
                                        <Link href={`/${pro_data.brand.brand_url}`}>
                                            <small className="text-primary hover:text-blue-700 transition-colors duration-200">{pro_data.brand.name}</small>
                                        </Link>
                                    </div>
                                    <div className="flex space-x-1">
                                        <small>SKU: </small>
                                        <small className="text-life ">{pro_data.sku}</small>
                                    </div>
                                </div>
                                <div className="relative md:block hidden mb-10">
                                    <div className={` text-gray-500 md:text-sm sm:text-sm text-xs h-[8rem]  ${readMorClick ? "from-white to-gray-200 overflow-y-auto" : " overflow-y-hidden bg-gradient-to-b "}`} dangerouslySetInnerHTML={{ __html: pro_data.short_description }} />
                                    {readMorClick === false ?
                                        <div className={`absolute -bottom-6 left-0 right-0 text-center ${readMorClick ? '' : 'bg-gradient-to-b from-transparent to-white'} pt-16`}>
                                            <button onClick={() => setReadMoreCLick(true)} className=' rounded-full text-sm    text-primary hover:text-blue-500 p-1 px-2'>Read More</button>
                                        </div>
                                        : null}
                                </div>
                                <div className="border-muted border rounded-lg mt-6">
                                    <div className="flex  items-center p-2  border-b-2 border-gray-100 justify-between">
                                        <div className="title-font font-medium text-2xl text-gray-900">
                                            {pro_data.prices ? pro_data.prices[0].price.offer_price != pro_data.prices[0].price.regular_price ?
                                                <div className="flex justify-between">
                                                    <div className="text-red-500 mr-3">
                                                        <span className="text-[8px] lg:text-xs">{currency} </span>
                                                        <span className="font-semibold text-2xl">{pro_data.sale_price}</span>
                                                    </div>
                                                    <div className="text-life text-xs my-auto">
                                                        <span ><del>{currency} {parseFloat(pro_data.filter_price).toFixed(2)}</del></span>
                                                    </div>
                                                </div> :
                                                <div className='text-blue-400' >
                                                    <span className="md:text-sm text-xs ">{currency}</span> <span className="lg:text-lg sm:text-base text-sm ">{pro_data.prices ? parseFloat(pro_data.prices[0].price.regular_price).toFixed(2) : null}</span>
                                                </div> : null}

                                        </div>
                                        <div className="flex   py-1 px-2 text-violet-800 rounded-full ">
                                            <Image className="my-auto" data-v-11f2193b="" src="https://www.lifepharmacy.com/images/express-nr.svg" width={20} height={22} alt={"delivery-spped"} />
                                            <span className="text-xs my-auto ml-3 ">1-3 HOURS</span>
                                        </div>
                                    </div>
                                    <div className=" justify-center h-fit p-3 bg-gray space-x-2 min-[570px]:flex hidden ">
                                        <div className="flex">
                                            <button className="border  border-sky-600 text-white px-3 rounded-lg" onClick={() => cartValue > 1 ? decrementCartQuantity() : null}>
                                                <FaMinus className="text-sky-600 h-[10px] " />
                                            </button>
                                            <input type="text" value={cartValue} min="1" max="20" className=" rounded rounded-r-none bg-slate-100 w-10 border-none text-center text-sm text-gray-500 " />
                                            <button onClick={() => incrementCartQuantity()} className="border  bg-sky-500 hover:bg-sky-600 transition-colors duration-300 text-white px-3 rounded-lg ">
                                                <FaPlus className="h-[10px]" />
                                            </button>
                                        </div>

                                        <button onClick={() => addedToCart()} className="  text-white bg-sky-500 hover:bg-sky-600 transition-colors duration-300 border-0 py-2 px-4 focus:outline-none  rounded w-full lg:text-base md:text-xs text-[10px] whitespace-nowrap">
                                            <svg className="inline-block w-5 h-5 my-auto fill-white mr-2" fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M 4 7 C 3.449219 7 3 7.449219 3 8 C 3 8.550781 3.449219 9 4 9 L 6.21875 9 L 8.84375 19.5 C 9.066406 20.390625 9.863281 21 10.78125 21 L 23.25 21 C 24.152344 21 24.917969 20.402344 25.15625 19.53125 L 27.75 10 L 25.65625 10 L 23.25 19 L 10.78125 19 L 8.15625 8.5 C 7.933594 7.609375 7.136719 7 6.21875 7 Z M 22 21 C 20.355469 21 19 22.355469 19 24 C 19 25.644531 20.355469 27 22 27 C 23.644531 27 25 25.644531 25 24 C 25 22.355469 23.644531 21 22 21 Z M 13 21 C 11.355469 21 10 22.355469 10 24 C 10 25.644531 11.355469 27 13 27 C 14.644531 27 16 25.644531 16 24 C 16 22.355469 14.644531 21 13 21 Z M 16 7 L 16 10 L 13 10 L 13 12 L 16 12 L 16 15 L 18 15 L 18 12 L 21 12 L 21 10 L 18 10 L 18 7 Z M 13 23 C 13.5625 23 14 23.4375 14 24 C 14 24.5625 13.5625 25 13 25 C 12.4375 25 12 24.5625 12 24 C 12 23.4375 12.4375 23 13 23 Z M 22 23 C 22.5625 23 23 23.4375 23 24 C 23 24.5625 22.5625 25 22 25 C 21.4375 25 21 24.5625 21 24 C 21 23.4375 21.4375 23 22 23 Z"></path></g></svg>
                                            Add to Cart
                                        </button>

                                    </div>
                                    {session?.token.addresses.length > 0 ?
                                        <div className="min-[570px]:hidden block  rounded-lg w-full p-3 space-y-2">
                                            <p className="text-[10px]" >DELIVER TO <span className="text-black text-[10px] font-semibold">{session?.token.addresses[0].state} , </span><span className="text-black text-[10px] font-semibold">{session?.token.addresses[0].country}</span> </p>
                                            <div className="flex justify-between">
                                                <div className="flex space-x-3">
                                                    <Image src={"https://www.lifepharmacy.com/images/standard-nr.svg"} height={"20"} width={"20"} alt="delivery" />
                                                    <p className="text-[10px] text-life">IN 1-2 DAYS</p>
                                                </div>
                                                <h6 className="text-life text-[10px] font-bold ml-auto">CHANGE</h6>
                                            </div>
                                        </div>
                                        : null}
                                </div>
                            </div>
                        </> :
                        <div className=" w-full h-fit md:col-span-9 col-span-full ">

                            <ContentLoader
                                viewBox="0 0 600 300"
                                backgroundColor="#f3f3f3"
                                foregroundColor="#ecebeb"
                                className=""
                            >
                                <rect x="1" y="0" rx="2" ry="2" width="72" height="72" className="lg:block hidden" />
                                <rect x="1" y="80" rx="2" ry="2" width="72" height="72" className="lg:block hidden" />
                                <rect x="1" y="160" rx="2" ry="2" width="72" height="72" className="lg:block hidden" />
                                <rect x="88" y="0" rx="2" ry="2" width="230" height="230" className="lg:block hidden" />
                                <rect x="5" y="240" rx="2" ry="2" width="72" height="72" className="lg:hidden block" />
                                <rect x="95" y="240" rx="2" ry="2" width="72" height="72" className="lg:hidden block" />
                                <rect x="185" y="240" rx="2" ry="2" width="72" height="72" className=" lg:hidden block" />

                                <rect x="1" y="0" rx="2" ry="2" width="260" height="230" className="lg:hidden block" />

                                <rect x="339" y="0" rx="2" ry="2" width="195" height="21" />
                                <rect x="339" y="28" rx="2" ry="2" width="74" height="21" />
                                <rect x="339" y="56" rx="2" ry="2" width="152" height="16" />
                                <rect x="345" y="203" rx="2" ry="2" width="167" height="24" />
                                <rect x="529" y="208" rx="2" ry="2" width="65" height="19" />
                                <rect x="341" y="88" rx="2" ry="2" width="49" height="13" />
                                <rect x="401" y="83" rx="2" ry="2" width="78" height="23" />
                                <rect x="401" y="116" rx="2" ry="2" width="78" height="23" />
                                <rect x="401" y="149" rx="2" ry="2" width="78" height="23" />
                                <rect x="341" y="122" rx="2" ry="2" width="49" height="13" />
                                <rect x="341" y="154" rx="2" ry="2" width="49" height="13" />
                            </ContentLoader>
                        </div>


                    }
                    <ul className="md:flex hidden col-span-3  flex-col ml-auto justify-around  py-4 px-3  border border-gray-200 rounded-lg h-fit space-y-12 w-full">
                        <li className="flex    w-[9rem]">
                            <Image src={"https://www.lifepharmacy.com/images/svg/ecommerce-gift.svg"} height={25} width={25} alt="free delivery" />
                            <div className="flex flex-col ml-4">
                                <h5 className="text-life lg:text-xs text-[12px] font-semibold whitespace-nowrap">Free Delivery</h5>
                                <div className="text-[10px] whitespace-nowrap text-gray-400 lg:text-xs my-1">For all orders over AED 29</div>
                            </div>
                        </li>
                        <li className="flex  ">
                            <Image src={"https://www.lifepharmacy.com/images/svg/ecommerce-return.svg"} height={25} width={25} alt="free delivery" />
                            <div className="flex flex-col ml-4">
                                <h5 className="text-life lg:text-xs text-[12px] font-semibold whitespace-nowrap">Easy Return</h5>
                                <div className="text-[10px] whitespace-nowrap lg:text-xs text-gray-400 my-1">Easy return and refund</div>
                            </div>
                        </li>
                        <li className="flex   ">
                            <Image src={"https://www.lifepharmacy.com/images/svg/ecommerce-shield.svg"} height={25} width={25} alt="free delivery" />
                            <div className="flex flex-col ml-4">
                                <h5 className="text-life lg:text-xs text-[12px] font-semibold whitespace-nowrap">Secure Payments</h5>
                                <div className="my-1">
                                    <Image src={"https://www.lifepharmacy.com/images/payment-method.svg"} height={200} width={200} alt="free delivery" />
                                </div>
                            </div>
                        </li>
                        <li className="flex   ">
                            <Image src={"https://www.lifepharmacy.com/images/svg/ecommerce-phone.svg"} height={25} width={25} alt="free delivery" />
                            <div className="flex flex-col ml-4">
                                <h5 className="text-life lg:text-xs text-[12px] font-semibold whitespace-nowrap">24/7 Support</h5>
                                <div className="lg:text-xs text-gray-400 text-[10px] whitespace-nowrap my-1">Dedicated Support</div>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-3 gap-y-3">
                    <div>
                        <img src="https://lifeadmin-app.s3.me-south-1.amazonaws.com/mobile-app/homescreen/Product%20page%20banner/ppb-1.gif" className="w-full" />
                    </div>
                    <div>
                        <img src="https://lifeadmin-app.s3.me-south-1.amazonaws.com/mobile-app/homescreen/Product%20page%20banner/ppb-2.gif" className="w-full" />
                    </div>
                </div>
                <div className="py-6 px-2 border-b border-muted">
                    <h5 className="text-life-2 md:text-xl text-base font-semibold mb-2">Overview</h5>
                    <div dangerouslySetInnerHTML={{ __html: pro_data.short_description }} className="text-gray-500 px-3 md:text-sm text-xs leading-relaxed " />
                </div>
                <div className="py-6 px-2 border-b border-muted">
                    <h5 className="text-life-2  md:text-xl text-base font-semibold mb-2 details-sec">Details</h5>
                    <div dangerouslySetInnerHTML={{ __html: pro_data.description }} className="text-gray-500 px-3 md:text-sm text-xs leading-relaxed " />
                </div>
                <div className="py-6 px-2 border-b border-muted">
                    <h5 className="text-life-2 md:text-xl text-base font-semibold mb-2">More Info</h5>
                    <div className="text-gray-500 text-xs">SKU: {pro_data.sku}</div>
                </div>

                <div className="lg:flex justify-around my-5 border-b border-muted py-6">
                    <div className="lg:w-3/12 w-full lg:px-0 px-6">
                        <div className="text-center">
                            <h3 className="text-blue-500 font-semibold md:text-2xl text-xl p-2">Product Rating</h3>
                            <h2 className=" font-semibold text-4xl p-5">{pro_data.rating}<span className="text-gray-600">/5</span></h2>
                            <div className="lg:w-1/2 w-1/4 mx-auto flex justify-around">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-4 h-4">
                                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-4 h-4">
                                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                </svg>

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-4 h-4">
                                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                </svg>

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-4 h-4">
                                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                </svg>

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-4 h-4">
                                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <div className="text-gray-500 text-center py-3">Based on {pro_data.number_of_reviews} Ratings</div>
                            <div className="flex justify-between mb-2">
                                <div className="w-full bg-gray-200  h-3 rounded-full">
                                    <div className="bg-yellow-400 h-3 rounded-full" style={{ width: '85%' }}></div>
                                </div>
                            </div>
                            <div className="flex justify-between mb-2">
                                <div className="w-full bg-gray-200  h-3 rounded-full">
                                    <div className="bg-yellow-400 h-3 rounded-full" style={{ width: '38%' }}></div>
                                </div>
                            </div>
                            <div className="flex justify-between mb-2">
                                <div className="w-full bg-gray-200  h-3 rounded-full">
                                    <div className="bg-yellow-400 h-3 rounded-full" style={{ width: '60%' }}></div>
                                </div>
                            </div>
                            <div className="flex justify-between mb-2">
                                <div className="w-full bg-gray-200  h-3 rounded-full">
                                    <div className="bg-yellow-400 h-3 rounded-full" style={{ width: '30%' }}></div>
                                </div>
                            </div>
                            <div className="flex justify-between mb-2">
                                <div className="w-full bg-gray-200  h-3 rounded-full">
                                    <div className="bg-yellow-400 h-3 rounded-full" style={{ width: '10%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-7/12 w-full py-3  px-2 ">
                        <h3 className="font-semibold md:text-lg text-base ">Reviews (5 of 36)</h3>
                        <div className="divide-y">
                            <div className="flex justify-start py-4  ">
                                <div className="w-1/4">
                                    <h5 className="text-xs md:text-sm">Jaspreet singh</h5>
                                    <div className="w-1/2 flex justify-start py-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="text-gray-400 sm:text-sm text-xs">Feb 21,2023</div>
                                    <div className=" text-[10px] my-2"><i>No comment</i></div>
                                </div>
                            </div>
                            <div className="flex justify-start py-4 ">
                                <div className="w-1/4">
                                    <h5 className="text-xs md:text-sm">Jaspreet singh</h5>
                                    <div className="w-1/2 flex justify-start py-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="text-gray-400 sm:text-sm text-xs">Feb 21,2023</div>
                                    <div className=" text-[10px] my-2"><i>No comment</i></div>
                                </div>
                            </div>

                            <div className="flex justify-start py-4 ">
                                <div className="w-1/4">
                                    <h5 className="text-xs md:text-sm">Jaspreet singh</h5>
                                    <div className="w-1/2 flex justify-start py-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="text-gray-400 sm:text-sm text-xs">Feb 21,2023</div>
                                    <div className=" text-[10px] my-2"><i>No comment</i></div>
                                </div>
                            </div>
                            <div className="flex justify-start py-4 ">
                                <div className="w-1/4">
                                    <h5 className="text-xs md:text-sm">Jaspreet singh</h5>
                                    <div className="w-1/2 flex justify-start py-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="text-gray-400 sm:text-sm text-xs">Feb 21,2023</div>
                                    <div className=" text-[10px] my-2"><i>No comment</i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h3 className="md:text-2xl sm:text-lg text-base font-bold text-center">Related Products</h3>

            {relatedProductsData ?
                <ProductsSlider proData={relatedProductsData} /> :
                null}

            <AddtoCartMobileview salePrice={pro_data.sale_price} filterPrice={pro_data.filter_price} />
        </div>
    )
}


export default SingleProductsContent;