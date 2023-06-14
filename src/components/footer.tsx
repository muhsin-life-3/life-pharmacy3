import Image from "next/image"
export default function Footer({ langData }: { langData: any }) {
    return (
        <>
            <div className="z-10  mx-auto ">
                <div className="     border border-muted lg:py-5 py-3">
                    <div className="max-w-[1450px] mx-auto px-[10px] flex justify-around lg:text-2xl md:text-2xl text-xl ">
                    <div >
                        <div className="text-center  font-bold  ">{langData.footer.top_part.n26}</div>
                        <div className=" text-center  text-gray-600  md:text-sm text-[10px]">{langData.footer.top_part.years_of_trust}</div>
                    </div>
                    <div >
                        <div className="text-center font-bold ">{langData.footer.top_part.n25M}</div>
                        <div className=" text-center  text-gray-600 md:text-sm text-[10px]">{langData.footer.top_part.orders_delivered}</div>
                    </div>
                    <div >
                        <div className="text-center  font-bold ">{langData.footer.top_part.n375}</div>
                        <div className="text-center  text-gray-600 md:text-sm mr-3 text-[10px]">{langData.footer.top_part.stores}</div>
                    </div>
                    </div>
             
                </div>
                <div className="bg-sub-img">
                    <div className="-z-10  max-w-[1450px] mx-auto px-[10px]">
                        <div className=" flex flex-col py-5">
                            <div className="lg:flex justify-around sm:grid-flow-row ">
                                <div className="lg:hidden mb-5">
                                    <div className="text-white  md:text-2xl text-lg text-center mb-2">{langData.footer.top_part.download_app}</div>
                                    <div className="flex justify-center ">
                                        <Image src="https://www.lifepharmacy.com/images/appstore.svg" className="mx-3 w-1/4 sm:w-1/4 md:w-1/6 lg:w-1/6 " alt="Download" width={700} height={700} />
                                        <Image src="https://www.lifepharmacy.com/images/playstore.svg" className="w-1/4 sm:w-1/4 md:w-1/6 lg:w-1/6 " alt="AppStore" width={300} height={300} />
                                    </div>
                                </div>
                                <div className="lg:w-4/6 mx-4">
                                    <div className="text-white text-center mb-3 text-xs lg:text-base sm:text-sm">{langData.footer.top_part.subscribe_desc}</div>
                                    <div className="relative max-w-[70rem] mx-auto ">
                                        <input type="text" className="w-full   rounded-full py-1 sm:py-2 md:py-3"></input>
                                        <button type="submit" className="absolute top-[1px] right-0 h-8 sm:h-10 md:h-12 md:w-44 w-32 p-1 text-xs tracking-widest font-medium text-white bg-blue-700 rounded-r-full border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            {langData.footer.top_part.subscribe}
                                        </button>
                                    </div>
                                </div>
                                <div className="sm:hidden md:hidden lg:block hidden">
                                    <div className="text-white  text-2xl text-center mb-2 " >{langData.footer.top_part.download_app}</div>
                                    <div className="flex justify-around">
                                        <Image src="https://www.lifepharmacy.com/images/appstore.svg" className="mx-3 w-1/2" alt="AppStore" width={300} height={300} />
                                        <Image src="https://www.lifepharmacy.com/images/playstore.svg" className="w-1/2" alt="AppStore" width={300} height={300} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <footer className="py-4 bg-white sm:py-6  max-w-[1450px] mx-auto px-[10px]">
                    <div className="md:flex md:justify-between ">
                        <div className="mb-6 md:mb-0">
                            <a href="https://flowbite.com/" className="flex items-center mb-4">
                                <Image src="https://www.lifepharmacy.com/images/logo.svg" className="h-10 mr-3" alt="FlowBite Logo" width={300} height={300} />
                            </a>
                            <div dangerouslySetInnerHTML={{ __html: langData.footer.bottom_part.life_address }} className="text-gray-600" />
                        </div>
                        <div className="grid grid-cols-2 gap-8 sm:gap-6 lg:grid-cols-5 text-sm md:text-xs md:grid-cols-3 ">
                            <div>
                                <h1 className="mb-3 text-gray-900  font-bold">{langData.footer.bottom_part.know_us.title}</h1>
                                <ul className="text-gray-600 dark:text-gray-400">
                                    <li className="mb-2">
                                        <a href="https://flowbite.com/" className="hover:text-blue-500 text-gray-500 underline-tra">{langData.footer.bottom_part.know_us.about_life_store}</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="https://tailwindcss.com/" className="hover:text-blue-500 text-gray-500 underline-tra">{langData.footer.bottom_part.know_us.contact_us}</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="https://tailwindcss.com/" className="hover:text-blue-500 text-gray-500 underline-tra">{langData.footer.bottom_part.our_blog}</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="https://tailwindcss.com/" className="hover:text-blue-500 text-gray-500 underline-tra">{langData.footer.bottom_part.store_locator}</a>
                                    </li>

                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-3 text-gray-900   font-bold">{langData.footer.bottom_part.our_policies.title}</h2>
                                <ul className="text-gray-600 dark:text-gray-400">
                                    <li className="mb-2">
                                        <a href="https://github.com/themesberg/flowbite" className="hover:text-blue-500 text-gray-500 underline-tra ">{langData.footer.bottom_part.our_policies.refund_policy}</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="https://discord.gg/4eeurUVvTy" className="hover:text-blue-500 text-gray-500 hover:text-blue-500 underline-tra">{langData.footer.bottom_part.our_policies.ship_terms}</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="https://discord.gg/4eeurUVvTy" className="hover:text-blue-500 text-gray-500 underline-tra">{langData.footer.bottom_part.our_policies.pandp}</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="https://discord.gg/4eeurUVvTy" className="hover:text-blue-500 text-gray-500 underline-tra">{langData.footer.bottom_part.our_policies.tandc}</a>
                                    </li>

                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-3 text-gray-900  font-bold">{langData.footer.bottom_part.shop_by_cat.title}</h2>
                                <ul className="text-gray-600 dark:text-gray-400">
                                    <li className="mb-2">
                                        <a href="#" className="hover:text-blue-500 text-gray-500 underline-tra">Beauty Care</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="#" className="hover:text-blue-500 text-gray-500 underline-tra">Terms &amp; Conditions</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-3 text-gray-900  font-bold">{langData.footer.bottom_part.useful_links.title}</h2>
                                <ul className="text-gray-600 dark:text-gray-400">
                                    <li className="mb-2">
                                        <a href="#" className="hover:text-blue-500 text-gray-500 underline-tra">{langData.footer.bottom_part.useful_links.browse_by_brands}</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="#" className="hover:text-blue-500 text-gray-500 underline-tra">{langData.footer.bottom_part.useful_links.site_map}</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="#" className="hover:text-blue-500 text-gray-500 underline-tra">{langData.footer.bottom_part.useful_links.offers_coupons}</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-2 text-gray-900  font-bold">{langData.footer.bottom_part.my_account.title}</h2>
                                <ul className="text-gray-600 dark:text-gray-400">
                                    <li className="mb-3">
                                        <a href="#" className="hover:text-blue-500 text-gray-500 underline-tra">{langData.footer.bottom_part.my_account.loginorsignup}</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="#" className="hover:text-blue-500 text-gray-500 underline-tra">{langData.footer.bottom_part.my_account.view_cart}</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="#" className="hover:text-blue-500 text-gray-500 underline-tra">{langData.footer.bottom_part.my_account.my_wish_list}</a>
                                    </li>
                                    <li className="mb-2">
                                        {/* <a href="#" className="hover:text-blue-500 text-gray-500 underline-tra">Appointments</a> */}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Life Pharmacy</a>. All Rights Reserved.
                        </span>
                    </div>
                </footer>
            </div>
        </>
    )
}