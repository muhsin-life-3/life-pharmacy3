import { ShopNowButton } from "@/components/Button"
import { FaArrowRight, FaCalendarCheck, FaComment, FaEdit, FaFileMedical, FaHeart, FaLocationArrow, FaMapMarked, FaMapMarkedAlt, FaMapMarker, FaMapMarkerAlt, FaMapPin, FaPlus, FaPowerOff, FaUser, FaWallet } from "react-icons/fa"
import { useState } from "react"
import TransitionComp from "@/components/transition"
import { signOut, useSession } from "next-auth/react"
import { Cross1Icon } from "@radix-ui/react-icons"
import { Tooltip } from "@material-tailwind/react"


export default function DashboardPage({ }) {

    const [dashBoardVisibility, setDashBoardVisibility] = useState(true)
    const [ordersVisibility, setOrdersVisibility] = useState(false)
    const [returnOrdersVisibility, setreturnOrdersVisibility] = useState(false)
    const [addressesVisibility, setAddressesVisibility] = useState(false)
    const [accountDetails, setaccountDetailsVisibility] = useState(false)
    const [walletDetails, setWalletVisibility] = useState(false)
    const [appointments, setappointments] = useState(false)
    const [wishlist, setWishlist] = useState(false)
    const [chatWithUs, setChatWithUs] = useState(false)
    const [Logout, setLogOut] = useState(false)
    const [Prescription, setPrescription] = useState(false)
    const [selectedMenu, setSelectedMenu] = useState("dashboard")
    const session = useSession()

    const setMenuItemVisiblity = (menuName: string, setVisibility: boolean) => {
        if (setVisibility) {
            setMenuItemVisiblity(selectedMenu, false)
            setSelectedMenu(menuName)
        }

        switch (menuName) {
            case "dashboard":
                setDashBoardVisibility(setVisibility)
                break

            case "orders":
                setOrdersVisibility(setVisibility)
                break

            case "returnOrders":
                setreturnOrdersVisibility(setVisibility)
                break

            case "prescrpition":
                setPrescription(setVisibility)
                break

            case "addresses":
                setAddressesVisibility(setVisibility)
                break

            case "accountDetails":
                setaccountDetailsVisibility(setVisibility)
                break

            case "wallet":
                setWalletVisibility(setVisibility)
                break

            case "appointments":
                setappointments(setVisibility)
                break

            case "wishlist":
                setWishlist(setVisibility)
                break

            case "chatWithUs":
                setChatWithUs(setVisibility)
                break

            case "Logout":
                setLogOut(setVisibility)
                break
        }

    }

    return (
        session.data && session.data.token ?

            <div className="max-w-[1450px] mx-auto  sm:px-[10px] px-[5px] min-h-fit flex sm:space-x-10 space-x-0 pt-5">


                {/* <button data-drawer-target="separator-sidebar" data-drawer-toggle="separator-sidebar" aria-controls="separator-sidebar" type="button" className="ml-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400  dark:focus:ring-gray-600 sm:hidden">
                <span className="sr-only">Open sidebar</span>
                <svg className="h-6 w-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button> */}
                {/* -translate-x-1/4 transition-transform sm:translate-x-0 */}
                <aside id="separator-sidebar" className="sm:w-80 w-fit mr-4" aria-label="Sidebar">
                    <div className=" overflow-y-auto px-1 rounded-md  py-1   ">
                        <ul className="space-y-2 font-medium ">
                            <li>
                                <input type="radio" className="hidden peer" id="dashboard" name="dashboard-menu" value="dashboard" defaultChecked={true} />
                                <Tooltip content="Dashboard" placement="right" className="text-xs bg-primary opacity-90 backdrop-blur-md sm:hidden block">
                                    <label id="clickable" htmlFor="dashboard" onClick={() => setMenuItemVisiblity("dashboard", true)} className=" flex cursor-pointer items-center rounded-lg p-2 text-gray-600 hover:bg-blue-50 group/dashbtn peer-checked:text-blue-500 hover:text-blue-500 peer-checked:bg-blue-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="h-6 w-6  transition duration-75 group-hover:text-gray-900  " viewBox="0 0 16 16">
                                            <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z" />
                                        </svg>
                                        <div id="tooltip-right" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                            Tooltip on right
                                            <div className="tooltip-arrow"></div>
                                        </div>
                                        <span className="ml-3 text-sm group-hover/dashbtn:text-blue-400 sm:block hidden">Dashboard</span>

                                    </label>
                                </Tooltip>
                            </li>
                            <li>
                                <input type="radio" className="hidden peer" id="orders" name="dashboard-menu" value="orders" />
                                <Tooltip content="Orders" placement="right" className="text-xs bg-primary opacity-90 backdrop-blur-md sm:hidden block">
                                    <label htmlFor="orders" onClick={() => setMenuItemVisiblity("orders", true)} className="flex cursor-pointer items-center rounded-lg p-2 text-gray-600  hover:bg-blue-50 group/dashbtn peer-checked:text-blue-500 hover:text-blue-500 peer-checked:bg-blue-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="h-6 w-6  transition duration-75 group-hover:text-gray-900 group-hover/dashbtn:fill-blue-500" viewBox="0 0 16 16">
                                            <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h3Z" />
                                            <path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-12Z" />
                                            <path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3Z" />
                                        </svg>
                                        <span className="ml-3 flex-1 whitespace-nowrap text-sm sm:block hidden">Orders</span>
                                        {/* <span className="ml-3 inline-flex h-3 w-3 items-center justify-center rounded-full bg-blue-100 p-3 text-sm font-medium text-blue-800 ">3</span> */}
                                    </label>
                                </Tooltip>
                            </li>
                            <li>
                                <input type="radio" className="hidden peer" id="returnOrders" name="dashboard-menu" value="returnOrders" />
                                <Tooltip content="Return Orders" placement="right" className="text-xs bg-primary opacity-90 backdrop-blur-md sm:hidden block">
                                    <label htmlFor="returnOrders" onClick={() => setMenuItemVisiblity("returnOrders", true)} className="flex cursor-pointer items-center rounded-lg p-2 text-gray-600 hover:bg-blue-50 group/dashbtn peer-checked:text-blue-500 hover:text-blue-500 peer-checked:bg-blue-100 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 flex-shrink-0 transition duration-75 group-hover:text-gray-900 ">
                                            <path fillRule="evenodd" d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z" clipRule="evenodd" />
                                        </svg>
                                        <span className="ml-3 flex-1 whitespace-nowrap text-sm sm:block hidden">Return Orders</span>
                                    </label>
                                </Tooltip>
                            </li>
                            <li>
                                <input type="radio" className="hidden peer" id="prescription" name="dashboard-menu" value="prescription" />
                                <Tooltip content="Prescrpition" placement="right" className="text-xs bg-primary opacity-90 backdrop-blur-md sm:hidden block">
                                    <label htmlFor="prescription" onClick={() => setMenuItemVisiblity("prescrpition", true)} className=" flex cursor-pointer items-center rounded-lg p-2 text-gray-600 hover:bg-blue-50 group/dashbtn peer-checked:text-blue-500 hover:text-blue-500 peer-checked:bg-blue-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="h-6 w-6 flex-shrink-0 transition duration-75 group-hover:text-gray-900 " viewBox="0 0 16 16">
                                            <path d="M8 5a.5.5 0 0 1 .5.5V7H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V8H6a.5.5 0 0 1 0-1h1.5V5.5A.5.5 0 0 1 8 5zm-2.5 6.5A.5.5 0 0 1 6 11h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z" />
                                            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                                        </svg>
                                        <span className="ml-3 flex-1 whitespace-nowrap text-sm sm:block hidden">Prescrpition</span>
                                    </label>
                                </Tooltip>
                            </li>
                            <li>
                                <input type="radio" className="hidden peer" id="addresses" name="dashboard-menu" value="addresses" />
                                <Tooltip content="Addresses" placement="right" className="text-xs bg-primary opacity-90 backdrop-blur-md sm:hidden block">
                                    <label htmlFor="addresses" onClick={() => setMenuItemVisiblity("addresses", true)} className=" flex cursor-pointer items-center rounded-lg p-2 text-gray-600 hover:bg-blue-50 group/dashbtn peer-checked:text-blue-500 hover:text-blue-500 peer-checked:bg-blue-100   ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="h-6 w-6 flex-shrink-0 transition duration-75 group-hover:text-gray-900 " viewBox="0 0 16 16">
                                            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                                            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                        </svg>                                    <span className="ml-3 flex-1 whitespace-nowrap text-sm sm:block hidden">Addresses</span>
                                    </label>
                                </Tooltip>
                            </li>
                            <li>
                                <input type="radio" className="hidden peer" id="accountDetails" name="dashboard-menu" value="accountDetails" />
                                <Tooltip content="Account Details" placement="right" className="text-xs bg-primary opacity-90 backdrop-blur-md sm:hidden block">
                                    <label htmlFor="accountDetails" onClick={() => setMenuItemVisiblity("accountDetails", true)} className=" flex cursor-pointer items-center rounded-lg p-2 text-gray-600 hover:bg-blue-50 group/dashbtn peer-checked:text-blue-500 hover:text-blue-500 peer-checked:bg-blue-100 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="h-6 w-6 flex-shrink-0 transition duration-75 group-hover:text-gray-900 " viewBox="0 0 16 16">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                        </svg>                                    <span className="ml-3 flex-1 whitespace-nowrap text-sm sm:block hidden">Account Details</span>
                                    </label>
                                </Tooltip>
                            </li>
                            <li>
                                <input type="radio" className="hidden peer" id="wallet" name="dashboard-menu" value="wallet" />
                                <Tooltip content="Wallet" placement="right" className="text-xs bg-primary opacity-90 backdrop-blur-md sm:hidden block">
                                    <label htmlFor="wallet" onClick={() => setMenuItemVisiblity("wallet", true)} className=" flex cursor-pointer items-center rounded-lg p-2 text-gray-600 hover:bg-blue-50 group/dashbtn peer-checked:text-blue-500 hover:text-blue-500 peer-checked:bg-blue-100  ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="h-6 w-6 flex-shrink-0 transition duration-75 group-hover:text-gray-900 " viewBox="0 0 16 16">
                                            <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
                                        </svg>                                    <span className="ml-3 flex-1 whitespace-nowrap text-sm sm:block hidden">Wallet</span>
                                    </label>
                                </Tooltip>
                            </li>
                            <li>
                                <input type="radio" className="hidden peer" id="appointments" name="dashboard-menu" value="appointments" />
                                <Tooltip content="Appointments" placement="right" className="text-xs bg-primary opacity-70 backdrop-blur-md sm:hidden block">
                                    <label htmlFor="appointments" onClick={() => setMenuItemVisiblity("appointments", true)} className=" flex cursor-pointer items-center rounded-lg p-2 text-gray-600 hover:bg-blue-50 group/dashbtn peer-checked:text-blue-500 hover:text-blue-500 peer-checked:bg-blue-100   ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="h-6 w-6 flex-shrink-0 transition duration-75 group-hover:text-gray-900 " viewBox="0 0 16 16">
                                            <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                        </svg>                                    <span className="ml-4 text-sm sm:block hidden">Appointments</span>
                                    </label>
                                </Tooltip>
                            </li>
                        </ul>
                        <ul className="mt-4 space-y-2 border-t border-gray-200 pt-4 font-medium ">
                            <li>
                                <input type="radio" className="hidden peer" id="wishlist" name="dashboard-menu" value="wishlist" />
                                <Tooltip content="Wishlist" placement="right" className="text-xs bg-primary opacity-90 backdrop-blur-md sm:hidden block">
                                    <label htmlFor="wishlist" onClick={() => setMenuItemVisiblity("wishlist", true)} className=" flex cursor-pointer items-center rounded-lg p-2 text-gray-600 hover:bg-blue-50 group/dashbtn peer-checked:text-blue-500 hover:text-blue-500 peer-checked:bg-blue-100   ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="h-6 w-6 flex-shrink-0 transition duration-75 group-hover:text-gray-900 " viewBox="0 0 16 16">
                                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                        </svg>      <span className="ml-3 text-sm  sm:block hidden">Wishlist</span>
                                    </label>
                                </Tooltip>
                            </li>
                            <li>
                                <input type="radio" className="hidden peer" id="chatWithUs" name="dashboard-menu" value="chatWithUs" />
                                <Tooltip content="Chat with us" placement="right" className="text-xs bg-primary opacity-90 backdrop-blur-md sm:hidden block">
                                    <label htmlFor="chatWithUs" onClick={() => setMenuItemVisiblity("chatWithUs", true)} className=" flex cursor-pointer items-center rounded-lg p-2 text-gray-600 hover:bg-blue-50 group/dashbtn peer-checked:text-blue-500 hover:text-blue-500 peer-checked:bg-blue-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="h-6 w-6 flex-shrink-0 transition duration-75 group-hover:text-gray-900 " viewBox="0 0 16 16">
                                            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                            <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />
                                        </svg>                                    <span className="ml-3 text-sm sm:block hidden">Chat with us</span>
                                    </label>
                                </Tooltip>
                            </li>
                            <li>
                                <input type="radio" className="hidden peer" id="Logout" name="dashboard-menu" value="Logout" />
                                <Tooltip content="Chat with us" placement="right" className="text-xs bg-primary opacity-90 backdrop-blur-md sm:hidden block">
                                    <label htmlFor="Logout" onClick={() => {
                                        setMenuItemVisiblity("Logout", true)
                                        signOut()
                                    }

                                    } className="flex cursor-pointer items-center rounded-lg p-2 text-gray-600  hover:bg-blue-50 group/dashbtn peer-checked:text-blue-500 hover:text-blue-500 peer-checked:bg-blue-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="h-6 w-6 flex-shrink-0 transition duration-75 group-hover:text-gray-900 " viewBox="0 0 16 16">
                                            <path d="M7.5 1v7h1V1h-1z" />
                                            <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
                                        </svg>                                    <span className="ml-3 text-sm sm:block hidden">Logout</span>
                                    </label>
                                </Tooltip>
                            </li>
                        </ul>
                    </div>
                </aside >
                <div className="w-full">
                    {dashBoardVisibility ?
                        <TransitionComp setTransition={dashBoardVisibility}>
                            <div className="py-4 w-full space-y-4 ">
                                <div className="w-full py-5 px-3 rounded-lg border-muted border text-sm space-y-4">
                                    <div className="sm:text-base text-xs">
                                        <span>Hello </span><span className="font-semibold">{session.data && session.data.user ? session.data?.user.name : "Helo"} !</span>
                                    </div>
                                    <div className="sm:text-base text-xs">
                                        From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your account details.
                                    </div>
                                </div>
                                <h1 className="font-semibold sm:text-base text-sm">Recent Purchases</h1>
                                <div className="w-full py-5 px-3 rounded-lg border-muted border  space-y-4 sm:text-sm text-xs">
                                    <i>
                                        You don't have any product yet!
                                    </i>
                                </div>
                            </div>
                        </TransitionComp>
                        : null
                    }

                    {ordersVisibility ?
                        <TransitionComp setTransition={ordersVisibility}>
                            <div className="py-4 w-full space-y-4 sm:text-sm text-xs">
                                <div>
                                    No order has been made yet.
                                </div>
                                <ShopNowButton classNames="">
                                    <div className="flex space-x-2  items-center">
                                        <div className=''>GO SHOP</div>
                                        <FaArrowRight className="w-5 h-3" />
                                    </div>
                                </ShopNowButton>
                            </div>
                        </TransitionComp> : null}

                    {returnOrdersVisibility ?
                        <TransitionComp setTransition={returnOrdersVisibility}>
                            <div className="py-4 w-full space-y-4 sm:text-sm text-xs">
                                <div className="">
                                    No return order has been made yet.
                                </div>
                                <ShopNowButton classNames="">
                                    <div className="flex space-x-2  items-center">
                                        <span >GO SHOP</span>
                                        <FaArrowRight className="w-5 h-3" />
                                    </div>
                                </ShopNowButton>
                            </div>
                        </TransitionComp> : null}


                    {Prescription ?
                        <TransitionComp setTransition={Prescription}>
                            <div className="py-4 w-full space-y-5 ">
                                <div className="space-y-3">
                                    <h5 className="font-semibold sm:text-2xl text-base">Prescriptions</h5>
                                    <p className="text-sm">No prescription has been made yet.</p>
                                </div>
                                <ShopNowButton classNames="" >
                                    <div className="flex space-x-2 text-sm items-center">
                                        <span >ADD PRESCRIPTION</span>
                                        <FaArrowRight className="w-5 h-3" />
                                    </div>
                                </ShopNowButton>
                            </div>
                        </TransitionComp>
                        : null}

                    {addressesVisibility ?
                        <TransitionComp setTransition={addressesVisibility}>
                            <div className="py-4 w-full space-y-5">
                                <div className="space-y-3">
                                    <div className="text-sm">
                                        The following addresses will be used on the checkout page by default.
                                    </div>
                                    <div className="flex space-x-2 ">
                                        <FaMapMarkerAlt className="" />
                                        <h5 className="text-life font-bold">Addresses</h5>
                                    </div>
                                </div>
                                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 my-3">
                                    {session.data.token.addresses.length > 0 ?
                                        session.data.token.addresses.map((addr: any) => (
                                            <div className="border-muted border shadow-md rounded-lg px-4 py-3 space-y-4 h-full flex flex-col justify-between ">
                                                <div className="space-y-2">
                                                    <div className="text-life text-sm font-bold ">{addr.type}</div>
                                                    <div className="w-full bg-[#dee2e6] mx-auto h-[1px]"></div>
                                                    <div>
                                                        <div className="text-xs font-semibold mb-2 text-dark">{addr.name}</div>
                                                        <p className=" text-xs">{addr.google_address}</p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between">
                                                    <button className="text-primary flex  space-x-2">
                                                        <div className="text-xs">Edit</div>
                                                        <FaEdit className="w-3 h-3" />
                                                    </button>
                                                    <button className="text-red-500 flex  space-x-2">
                                                        <Cross1Icon className="w-3 h-3" />
                                                        <div className="text-xs">Delete</div>

                                                    </button>
                                                </div>
                                            </div>
                                        ))

                                        : null}
                                    <ShopNowButton classNames="shadow-md py-5 px-10  !border-muted text-center">
                                        <div className="flex space-x-2 text-sm py-3 items-center w-fit mx-auto">
                                            <FaEdit className="w-3 " />
                                            <span className=''>New Address</span>
                                        </div>
                                    </ShopNowButton>
                                </div>
                            </div>
                        </TransitionComp> : null}

                    {accountDetails ?
                        <TransitionComp setTransition={accountDetails}>
                            <div className=" w-full px-4 py-5 border border-muted rounded-lg h-fit">
                                <form className="space-y-6 mb-4" >
                                    <div className="w-full space-y-2">
                                        <label className=" text-sm block mb-2 font-medium text-gray-90 file: ">Full Name <span className="text-red-500 ml-1">*</span></label>
                                        <input type="text" name="state" defaultValue={session.data.token.name ? session.data.token.name : ""} onBlur={(e) => { e.target.value === "" ? e.target.classList.add("border-red-500") : e.target.classList.remove("border-red-500") }} className={"  focus:outline-none block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 formTextBox"} placeholder="Full Name *" required />
                                        <p className="text-xs">Here is shown your first and last name.</p>
                                    </div>

                                    <div className="w-full space-y-2">
                                        <label className=" text-sm block mb-2 font-medium text-gray-90 file: ">{session.data.token.email ? 'Email Address' : 'Phone Number'}<span className="text-red-500 ml-1">*</span></label>
                                        <input type="text" name="state" defaultValue={session.data.token.email ? session.data.token.email : session.data.token.phone} onBlur={(e) => { e.target.value === "" ? e.target.classList.add("border-red-500") : e.target.classList.remove("border-red-500") }} className={"  focus:outline-none block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 formTextBox"} placeholder={session.data.token.email ? "Email Address *" : "Phone Number *"} required />
                                    </div>

                                    <div className="w-full space-y-2">
                                        <label className=" text-sm block mb-2 font-medium text-gray-90 file: ">Gender (optional)<span className="text-red-500">*</span></label>
                                        <ul className="flex space-x-3">
                                            <li>
                                                <input type="radio" className="hidden peer" id="gender-selection-male" name="gender" value="male" />
                                                <label htmlFor="gender-selection-male" className="sm:px-10 px-5 sm:text-sm  text-xs inline-flex items-center justify-between  py-2  bg-white border border-gray-200 rounded-lg cursor-pointer   hover:text-gray-600 hover:bg-gray-100   peer-checked:border-blue-600 peer-checked:text-blue-600">
                                                    <div className="block">
                                                        <div className="w-full">Male</div>
                                                    </div>
                                                </label>
                                            </li>
                                            <li>
                                                <input type="radio" className="hidden peer" id="gender-selection-female" name="gender" value="female" />
                                                <label htmlFor="gender-selection-female" className="sm:px-10 px-5 sm:text-sm  text-xs inline-flex items-center justify-between  py-2  bg-white border border-gray-200 rounded-lg cursor-pointer   hover:text-gray-600 hover:bg-gray-100  peer-checked:border-blue-600 peer-checked:text-blue-600 ">
                                                    <div className="block">
                                                        <div className="w-full">Female</div>
                                                    </div>
                                                </label>
                                            </li>
                                            <li>
                                                <input type="radio" className="hidden peer" id="gender-selection-other" name="gender" value="other" />
                                                <label htmlFor="gender-selection-other" className="sm:px-10  px-5  sm:text-sm  text-xs inline-flex items-center justify-between  py-2  bg-white border border-gray-200 rounded-lg cursor-pointer   hover:text-gray-600 hover:bg-gray-100   peer-checked:border-blue-600 peer-checked:text-blue-600">
                                                    <div className="block">
                                                        <div className="w-full">Other</div>
                                                    </div>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </form>
                                <ShopNowButton classNames="">
                                    <div className="flex space-x-2  items-center  mx-auto ">
                                        <span className=''>SAVE CHANGES</span>
                                        <FaArrowRight className="w-3 h-3" />
                                    </div>
                                </ShopNowButton>
                            </div>
                        </TransitionComp> : null}

                    {walletDetails ?
                        <TransitionComp setTransition={walletDetails}>
                            <div className="space-y-3 w-full ">
                                <div className="bg-[#f4f7ff] p-3 rounded-lg w-full space-x-1 sm:text-sm text-xs">
                                    <span className="font-bold">Wallet Balance: </span>
                                    <span className="text-life font-semibold "> {session.data?.token.wallet_balance}.00</span>
                                    <span className="font-semibold text-xs"> AED</span>
                                </div>
                                <div className="border border-muted rounded-lg p-5 space-y-3">
                                    <div>
                                        <i className="sm:text-sm text-xs textslate-300">No transactions has been made yet.</i>
                                    </div>
                                    <ShopNowButton classNames="mt-5 ">
                                        <div className="flex space-x-2 text-sm  items-center ">
                                            <span className=''>GO SHOP</span>
                                            <FaArrowRight className="w-3 h-3" />
                                        </div>
                                    </ShopNowButton>
                                </div>
                            </div>
                        </TransitionComp> : null}

                    {appointments ?
                        <TransitionComp setTransition={appointments}>
                            <div className="py-4 w-full  flex sm:flex-row flex-col justify-between ">
                                <div className="space-y-5">
                                    <div className="space-y-5">
                                        <h5 className="font-semibold sm:text-xl text-base">Appointments</h5>
                                        <p className="sm:text-sm text-xs">No appointment has been made yet.</p>
                                    </div>
                                    <ShopNowButton classNames="" >
                                        <div className="flex space-x-2 text-sm items-center">
                                            <span className='text-xs whitespace-nowrap'>BOOK HOME PCR TEST</span>
                                            <FaArrowRight className="w-5 h-3" />
                                        </div>
                                    </ShopNowButton>
                                </div>
                                <ShopNowButton classNames="h-fit flex items-center py-2 px-3 space-x-3 mt-5 w-fit" >
                                    <FaPlus className="w-2 h-3" />
                                    <span >Appointment</span>
                                </ShopNowButton>
                            </div>
                        </TransitionComp> : null}
                </div>
            </div >
            : null

    )

}

export async function getStaticProps({ }) {
    return {
        props: {

        }
    }


}