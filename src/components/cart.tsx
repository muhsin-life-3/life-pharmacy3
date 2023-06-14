import React, { FC } from 'react'
import Image from 'next/image'
import { addToCart, decrementQuantity } from '../redux/cart.slice'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { incrementQuantity } from '../redux/cart.slice';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Cart = ({ children }: { children: any }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart);

    const getProductQuantity = (productId: string) => {
        const productItem = cartItems.find((item: any) => item.id === productId);
        return productItem ? productItem.quantity : 0;
    };

    const calculateTotalCartPrice = () => {
        var TotalPrice = 0;
        cartItems.map((pro_data: any) =>
            TotalPrice += pro_data.prices[0].price.regular_price * pro_data.quantity
        )
        return parseFloat(TotalPrice.toString()).toFixed(2)
    }

    const calculateVATAmount = () => {
        return (Number(calculateTotalCartPrice()) * 0.05).toFixed(2);
    }
    // const calculateShippingCharge = () => {
    //     if (Number(calculateTotalCartPrice()) > 29) {
    //         return "FREE"
    //     }
    //     return "AED 29";
    // }
    return (
        <div className="">
            <div className="max-w-[1450px] px-[10px] mx-auto my-5 md:flex block ">
                {cartItems.length > 0 ?
                    <>
                        <div className='bg-[#f4f7ff] pt-0 md:w-8/12 w-full py-1 rounded-xl mr-3 h-fit'>
                            <div className="w-full flex bg-white justify-between items-center rounded-xl py-1 px-3 border-2 border-muted ">
                                <p className='text-life  font-semibold text-sm'> BUY1GET1</p>
                                <div className='p-1'>
                                    <Image src={"https://www.lifepharmacy.com/images/standard-nr.svg"} height={30} width={30} alt={"delivery"} />
                                </div>
                            </div>
                            <div className='m-3'>
                                {
                                    cartItems.map((item: any) => (
                                        <div className="rounded-lg border border-muted my-3 relative bg-white">
                                            <div className="flex p-3 space-x-4">
                                                <div className="max-h-[10rem]">
                                                    <Image src={item.images.featured_image} height={150} width={150} className=" border border-muted rounded-lg " alt="pro_Image" />
                                                </div>
                                                <div className="rounded-lg flex-col flex-grow justify-between flex ">
                                                    <p className=" xl:text-lg lg:text-base sm:text-sm text-xs">{item.title}</p>
                                                    {item.offers ?
                                                        <div className="bg-amber-200 w-fit text-xs px-1 border-orange-400 border ">{item.offers.value ? <>{parseFloat(item.offers.value).toFixed(0)}% OFF</> : <>{item.offers.is_special}</>}</div> : null}
                                                    <div className="text-blue-500"><span className="text-xs">AED</span> {item.prices[0].price.regular_price}</div>
                                                </div>
                                            </div>
                                            <div className="absolute bottom-2 right-2 flex h-7 ">
                                                <button
                                                    onClick={() => {
                                                        dispatch(decrementQuantity(item.id))
                                                        toast.info(`Cart successfully updated`);
                                                    }} className="border border-muted bg-white px-1 w-[2rem]">
                                                    <Image src="https://www.lifepharmacy.com/images/trash.svg" height="15" width="15" alt="trash" className="h-5 mx-auto  w-4" />
                                                </button>
                                                <div className="px-2 text-center my-auto"><span>{getProductQuantity(item.id)}</span></div>
                                                <button
                                                    onClick={() => {
                                                        dispatch(incrementQuantity(item.id))
                                                        toast.info(`Cart successfully updated`);
                                                    }} className="bg-[#39f] m-[0.5px] w-[2rem] ">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="{1.5}" stroke="white" className="h-4 w-5 mx-auto">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                    </svg>
                                                </button>
                                            </div>

                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="  bg-white rounded-lg py-1 px-2  md:w-4/12 w-full">
                            <div className='border-2 border-muted h-fit flex p-2 rounded-lg shadow-sm mb-3'>
                                <div className='mr-2'>
                                    <Image src={"https://www.lifepharmacy.com/images/return.svg"} height={35} width={35} alt={"delivery"} />
                                </div>
                                <div className='p-1'>
                                    <p className='text-life  text-xs font-semibold'> RETURN POLICY</p>
                                    <p className='text-[10px]'>Orders once placed can't be returned or exchanged <span><a className='text-blue-500'>Learn More</a></span> </p>
                                </div>
                            </div>
                            <div className='border-2 border-muted h-fit  p-5 rounded-lg shadow-md text-life  text-xs'>
                                <h1 className='mb-2 font-semibold'>ORDER SUMMARY</h1>
                                <div className='space-y-3'>
                                    <div className='flex justify-between'>
                                        <p>Order Total</p>
                                        <p>AED {calculateTotalCartPrice()}</p>
                                    </div>
                                    <div className='flex justify-between'>
                                        <p>Items Discount</p>
                                        <p>-AED 276.00</p>
                                    </div>
                                    <div className='flex justify-between'>
                                        <p>Estimated VAT %</p>
                                        <p>AED {calculateVATAmount()}</p>
                                    </div>
                                    <div className='flex justify-between'>
                                        <p>Shipping <span><a className='text-blue-500'>Know More</a></span></p>
                                        <p> FREE ABOVE 29</p>
                                    </div>
                                </div>
                                <div className='bg-slate-100 w-10/12 mx-auto h-[1px] my-2 '></div>
                                <div className='space-y-3'>
                                    <div className='flex justify-between py-2 '>
                                        <p>Total Amount (Inclusive of VAT)</p>
                                        <p className='text-blue-500 font-semibold'>-AED 276.00</p>
                                    </div>
                                    <div className='flex '>
                                        <img src="https://www.lifepharmacy.com/images/payment-method.svg" alt="" className='mx-auto' />
                                    </div>
                                </div>
                            </div>
                            <button className='bg-white border-2 border-gray-800 rounded-md w-full text-gray-800 text-xs py-2 my-2 hover:bg-gray-800 hover:text-white'>CONTINUE SHOPPING</button>
                            <button className='bg-[#39f] w-full rounded-md text-white text-xs py-2 hover:bg-blue-600'>PROCEED TO CHECKOUT</button>
                        </div>
                    </>
                    :
                    <div className='mx-auto space-y-4 py-5'>
                        <svg className='h-36 w-36 fill-gray-600 mx-auto' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z" />
                        </svg>
                        <p className='text-gray-400 text-center'>No products added to the cart</p>
                        <button className='bg-[#39f] w-full rounded-md text-white text-xs py-2 hover:bg-blue-600'>RETURN TO SHOP</button>

                    </div>
                }
            </div>
            <div className='max-w-[1450px] px-[10px] mx-auto'>
                {children}
            </div>


        </div>

    )
}

export default Cart;
