import React, { useState } from 'react'
import Link from 'next/dist/client/link'
import Image from 'next/dist/client/image'
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { addToCart, decrementQuantity } from '../redux/cart.slice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { incrementQuantity } from '../redux/cart.slice';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import ProductImgLoader from './product-img-loader';
import { useLanguage } from '@/hooks/useLanguage';
export const SingleProductData = ({ pro_data, isRowView }: { pro_data: any, isRowView: boolean }) => {
    const { pathname } = useRouter()
    const cartItems = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();
    const { locale, currency } = useLanguage();
    const parts = locale?.split("-")
    const [addedToCartClicked, addedToCartState] = useState(false)
    const [isValidImage, setIsValidImage] = useState(true);

    const getProductQuantity = (productId: any) => {
        const productItem = cartItems.find((item: any) => item.id === productId);
        return productItem ? productItem.quantity : 0;
    };

    function reviewColor(rating: number) {
        if (rating == 0) {
            return "gray"
        }
        else {
            return "orange"
        }
    }
    function generateIcon(type: string) {
        return <Image src={`https://www.lifepharmacy.com/images/label/${type}.svg`} height={30} width={30} alt="icon" className='sm:w-4 sm:h-4 h-2 w-2  flex item-center' />
    }
    const addedToCart = (pro_data: any) => {
        dispatch(addToCart(pro_data))
        addedToCartState(true);
        toast.success(`Item Added to the cart`);
    }

    const handleImageError = () => {
        setIsValidImage(false);
    };



    return (
        <>

            {pro_data && !isRowView ?
                <div className="relative border border-muted rounded-lg bg-white" >
                    <figure className='border border-muted m-2 rounded-lg relative'>
                        <Link href={`/product/${pro_data.slug}`} className="   block bg-white  mx-auto rounded-lg rounded-b-none">

                            {isValidImage ?
                            <div className='h-[200px] max-w-[200px]'>
                                <Image onError={handleImageError} className={`rounded-lg mx-auto object-cover h-full w-full`}  src={pro_data.images?.featured_image} width={200} height={200} alt="product_img" />
                            </div>
                                :
                                <div className=' w-full h-full'>
                                    <ProductImgLoader />
                                </div>
                            }
                            <span className="flex absolute bg-amber-400 opacity-90 rounded-bl-lg px-[7px] py-[1px] bottom-0 left-0 rounded-tr-xl shadow-xl ">
                                <div className="my-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill={reviewColor(pro_data.rating)} viewBox="0 0 24 24" stroke-width="1.5" stroke={reviewColor(pro_data.rating)} className="lg:w-4 stroke-white lg:h-3 w-3 h-3 mr-1 fill-white">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                    </svg>

                                </div>
                                <div className=" lg:text-sm !text-[12px] text-white ml-1">{pro_data.rating}</div>
                            </span>
                            {pro_data.offers ?
                                <div className="absolute right-2 top-2 bg-red-500 rounded-full text-white text-sm p-[5px] shadow-lg text-center overflow-hidden leading-3 label-circle w-[3rem] h-[3rem]" >
                                    {pro_data.offers.value ?
                                        <>{parseFloat(pro_data.offers.value).toFixed(0)} % OFF</>
                                        : <>BUY1 GET1</>}</div> : null}
                            {pro_data.label ? <div style={{ background: pro_data.label.color_code }} className={`  skeleton-box flex absolute left-0 top-0 w-fit text-white px-3 items-center rounded-tl-lg rounded-br-2xl text-[9px] sm:py-1 py-[2px] sm:text-xs h-fit`}><span className='items-center'>{pro_data.label.label_text}</span>
                                <div className={`${pathname?.substring(4, 6) === 'en' ? "ml-2" : "ml-2"}`}>{generateIcon(pro_data.label.icon_type)}</div></div> : null}
                        </Link>
                    </figure>

                    <div className="bg-white px-2 py-1 rounded-lg rounded-t-none">
                        <div className='flex justify-between'>
                            {pro_data.prices ? pro_data.prices[0].price.offer_price != pro_data.prices[0].price.regular_price ?
                                <span className='whitespace-nowrap'>
                                    <b className='text-red-500 '>
                                        <span className="md:text-xs text-[10px]">{currency}</span> <span className="lg:text-lg sm:text-base text-base font-semibold">{pro_data.prices[0].price.offer_price}</span>
                                    </b>
                                    <b className='sm:mx-3 ml-1 text-blue-400'>
                                        <span className="sm:text-xs text-[10px] line-through sm:inline-block hidden">{currency}</span> <span className="sm:text-xs  line-through text-[10px]">{pro_data.prices[0].price.regular_price}</span>
                                    </b>
                                </span>
                                : <div className='text-blue-400' >
                                    <span className="md:text-xs text-[10px] ">{currency}</span> <span className="lg:text-lg sm:text-base text-sm font-semibold">{pro_data.prices ? parseFloat(pro_data.prices[0].price.regular_price).toFixed(2) : null}</span>
                                </div> : null}
                        </div>
                        <Link href={`product/${pro_data.slug}`} className="h-5 block">
                            <div className="lg:text-sm text-xs text-life overflow-hidden whitespace-normal" style={{ WebkitLineClamp: "2", WebkitBoxOrient: "vertical", display: "-webkit-box" }}>{pro_data.title}</div>
                        </Link>
                        <div className="mt-5">
                            <div className=" overflow-hidden no-scrollbar whitespace-nowrap text-ellipsis" >
                                {pro_data.categories ?
                                    pro_data.categories.map((cat: any) => (
                                        <a href={`/products?categories=${cat.slug}`} className="inline-flex lg:text-[10px] text-[9px] border border-slate-200 hover:bg-gray-300 hover-border-white mr-2 rounded-md px-2 bg-[#f4f7ff] py-[2px] text-life">{cat.name}</a>
                                    ))
                                    : null}
                            </div>
                            <div className="flex justify-between mt-3 items-center">
                                <div className="flex">
                                    <Image className="my-auto" data-v-11f2193b="" src="https://www.lifepharmacy.com/images/standard-nr.svg" alt="delivery-img" width={20} height={20} />
                                    <span className="lg:text-xs my-auto lg:ml-3 ml-1 text-[10px]">12 - 24 HRS</span>
                                </div>
                                {addedToCartClicked && getProductQuantity(pro_data.id) > 0 ?
                                    <div className="flex ">
                                        <button onClick={() => {
                                            dispatch(decrementQuantity(pro_data.id))
                                            toast.info(`Cart successfully updated`);
                                        }} className='bg-white border-gray-200 border px-1'>
                                            <Image src={"https://www.lifepharmacy.com/images/trash.svg"} height={15} width={15} alt="trash" />
                                        </button>
                                        <div className='bg-slate-50 text-sm px-2 text-center '><span className='align-middle'>{getProductQuantity(pro_data.id)}</span></div>
                                        <button onClick={() => {
                                            dispatch(incrementQuantity(pro_data.id))
                                            toast.info(`Cart successfully updated`);
                                        }} className='bg-[#39f] px-1 '>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        </button>
                                    </div>
                                    : <button onClick={() => {
                                        addedToCart(pro_data)
                                    }} className="bg-[#39f] text-white px-2 flex  justify-center  lg:py-1 py-1 rounded">
                                        <svg className="w-5 h-5 my-auto fill-white mr-2" fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M 4 7 C 3.449219 7 3 7.449219 3 8 C 3 8.550781 3.449219 9 4 9 L 6.21875 9 L 8.84375 19.5 C 9.066406 20.390625 9.863281 21 10.78125 21 L 23.25 21 C 24.152344 21 24.917969 20.402344 25.15625 19.53125 L 27.75 10 L 25.65625 10 L 23.25 19 L 10.78125 19 L 8.15625 8.5 C 7.933594 7.609375 7.136719 7 6.21875 7 Z M 22 21 C 20.355469 21 19 22.355469 19 24 C 19 25.644531 20.355469 27 22 27 C 23.644531 27 25 25.644531 25 24 C 25 22.355469 23.644531 21 22 21 Z M 13 21 C 11.355469 21 10 22.355469 10 24 C 10 25.644531 11.355469 27 13 27 C 14.644531 27 16 25.644531 16 24 C 16 22.355469 14.644531 21 13 21 Z M 16 7 L 16 10 L 13 10 L 13 12 L 16 12 L 16 15 L 18 15 L 18 12 L 21 12 L 21 10 L 18 10 L 18 7 Z M 13 23 C 13.5625 23 14 23.4375 14 24 C 14 24.5625 13.5625 25 13 25 C 12.4375 25 12 24.5625 12 24 C 12 23.4375 12.4375 23 13 23 Z M 22 23 C 22.5625 23 23 23.4375 23 24 C 23 24.5625 22.5625 25 22 25 C 21.4375 25 21 24.5625 21 24 C 21 23.4375 21.4375 23 22 23 Z"></path></g></svg>
                                        <span className="my-auto text-xs ">ADD</span>
                                    </button>}
                            </div>
                        </div>
                    </div>
                </div>
                : null}
            {pro_data && isRowView ?
                <div className="rounded-lg border border-slate-200 my-1 relative bg-white shadow-sm">
                    <div className="grid grid-cols-12 p-3 gap-x-3">
                        <div className=" relative md:col-span-2 col-span-4 h-fit my-auto">
                            <Image src={pro_data.images.featured_image} height={150} width={150} className=" border border-slate-200 rounded-lg w-full my-auto" alt="pro_Image" />
                            <span className="flex absolute bg-amber-400 opacity-90 rounded-bl-lg px-[4px] py-[2px] bottom-0 left-0 rounded-tr-xl shadow-xl items-center ">
                                <div className="">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill={reviewColor(pro_data.rating)} viewBox="0 0 24 24" stroke-width="1.5" stroke={reviewColor(pro_data.rating)} className="lg:w-4 stroke-white lg:h-3 w-3 h-3 mr-1 fill-white">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                    </svg>
                                </div>
                                <div className="  !text-[10px] text-white ml-1 leading-[0px]">{pro_data.rating}</div>
                            </span>
                        </div>
                        <div className="rounded-lg flex-col flex-grow justify-between flex md:col-span-9 col-span-8  space-y-2">
                            <p className=" xl:text-base text-life font-semibold sm:text-sm text-[10px] leading-3 overflow-hidden" style={{ WebkitLineClamp: "2", WebkitBoxOrient: "vertical", display: "-webkit-box" }}>{pro_data.title}</p>
                            <div className='whitespace-nowrap overflow-hidden text-ellipsis w-full'>
                                {pro_data.categories ?
                                    pro_data.categories.map((cat: any) => (
                                        <a href={`products?categories=${cat.slug}`} className="whitespace-normal inline-flex lg:text-[10px] text-[9px] border border-gray-300 hover:bg-gray-300 hover-border-white mr-2 rounded-md px-2 bg-[#f4f7ff] py-[2px] text-life">{cat.name}</a>
                                    ))
                                    : null}
                            </div>
                            {pro_data.offers ?
                                <div className="offers-btn ">{pro_data.offers.value ? <>FLAT {parseFloat(pro_data.offers.value).toFixed(0)}% OFF</> : <>{pro_data.offers.is_special}</>}</div> : null}
                            {pro_data.prices ? pro_data.prices[0].price.offer_price != pro_data.prices[0].price.regular_price ?
                                <span className='whitespace-nowrap'>
                                    <b className='text-red-500 '>
                                        <span className="md:text-xs text-[10px]">{currency}</span> <span className="lg:text-lg sm:text-base text-base font-semibold">{pro_data.prices[0].price.offer_price}</span>
                                    </b>
                                    <b className='sm:mx-3 ml-1 text-blue-400 sm:inline-block hidden'>
                                        <span className="sm:text-xs text-[10px] line-through sm:inline-block hidden">{currency}</span> <span className="sm:text-xs  line-through text-[10px]">{pro_data.prices[0].price.regular_price}</span>
                                    </b>
                                </span>
                                : <div className='text-blue-400' >
                                    <span className="md:text-xs text-[10px] ">{currency}</span> <span className="lg:text-lg sm:text-base text-sm font-semibold">{pro_data.prices ? parseFloat(pro_data.prices[0].price.regular_price).toFixed(2) : null}</span>
                                </div> : null}
                        </div>
                    </div>

                    {pro_data.label ? <div style={{ background: pro_data.label.color_code }} className={`  skeleton-box flex absolute left-2 top-2 w-fit text-white px-3 items-center rounded-tl-lg rounded-br-2xl text-[9px]  py-[2px]  h-fit`}><span className='items-center'>{pro_data.label.label_text}</span>
                        <div className={`${parts && parts[1] === 'en' ? "ml-2" : "mr-2"}`}>{generateIcon(pro_data.label.icon_type)}</div></div> : null}
                    <div className="absolute bottom-2 right-2 flex h-7 ">
                        {addedToCartClicked && getProductQuantity(pro_data.id) > 0 ?
                            <>
                                <button
                                    onClick={() => {
                                        dispatch(decrementQuantity(pro_data.id))
                                        toast.info(`Cart successfully updated`);
                                    }} className="border border-slate-100 bg-white px-1 w-[2rem]">
                                    <Image src="https://www.lifepharmacy.com/images/trash.svg" height="15" width="15" alt="trash" className="h-5 mx-auto  w-4" />
                                </button>
                                <div className="px-2 text-center my-auto"><span>{getProductQuantity(pro_data.id)}</span></div>
                                <button
                                    onClick={() => {
                                        dispatch(incrementQuantity(pro_data.id))
                                        toast.info(`Cart successfully updated`);
                                    }} className="bg-[#39f] m-[0.5px] w-[2rem] ">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="{1.5}" stroke="white" className="h-4 w-5 mx-auto">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>
                            </>
                            :
                            <button onClick={() => {
                                addedToCart(pro_data)
                            }} className="bg-[#1d84ea] text-white px-2 flex  justify-center flex-1  sm:flex-none lg:py-1 py-1 rounded-sm">
                                <svg className="w-5 h-5 my-auto fill-white mr-2" fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M 4 7 C 3.449219 7 3 7.449219 3 8 C 3 8.550781 3.449219 9 4 9 L 6.21875 9 L 8.84375 19.5 C 9.066406 20.390625 9.863281 21 10.78125 21 L 23.25 21 C 24.152344 21 24.917969 20.402344 25.15625 19.53125 L 27.75 10 L 25.65625 10 L 23.25 19 L 10.78125 19 L 8.15625 8.5 C 7.933594 7.609375 7.136719 7 6.21875 7 Z M 22 21 C 20.355469 21 19 22.355469 19 24 C 19 25.644531 20.355469 27 22 27 C 23.644531 27 25 25.644531 25 24 C 25 22.355469 23.644531 21 22 21 Z M 13 21 C 11.355469 21 10 22.355469 10 24 C 10 25.644531 11.355469 27 13 27 C 14.644531 27 16 25.644531 16 24 C 16 22.355469 14.644531 21 13 21 Z M 16 7 L 16 10 L 13 10 L 13 12 L 16 12 L 16 15 L 18 15 L 18 12 L 21 12 L 21 10 L 18 10 L 18 7 Z M 13 23 C 13.5625 23 14 23.4375 14 24 C 14 24.5625 13.5625 25 13 25 C 12.4375 25 12 24.5625 12 24 C 12 23.4375 12.4375 23 13 23 Z M 22 23 C 22.5625 23 23 23.4375 23 24 C 23 24.5625 22.5625 25 22 25 C 21.4375 25 21 24.5625 21 24 C 21 23.4375 21.4375 23 22 23 Z"></path></g></svg>
                                <span className="my-auto text-xs ">ADD</span>
                            </button>
                        }
                    </div>
                </div>
                : null}
        </>
    )
}