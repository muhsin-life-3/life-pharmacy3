import Image from "next/image";
import { useEffect } from "react";
import { useState, Fragment } from "react";
import 'react-phone-number-input/style.css';
import { useSession } from "next-auth/react";

import { isValidPhoneNumber } from "react-phone-number-input";
import { useRouter } from "next/router";


import Link from "next/link";
import TransitionComp from "./transition";

// import AccountDetails from "./accountDetails";
import LanguageChangeModal from "./language-change-modal";
import { useSelector } from 'react-redux';
import { RootState } from "../redux/store";
import { removeFromCart } from "../redux/cart.slice";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import React, { FC } from 'react'
// import Example from "./categories-accordion";
import LocationModal from "./location-modal";
import AuthModal from "./authorixzation-modal";
import InvalidOTPModal from "./invalid-otp-modal";
import AddressModal from "./address-modal";
import { SmSearchBoxModal } from "./sm-searchbox-modal";
import SmMenu from "./sm-menu";
import { useLanguage } from "@/hooks/useLanguage";
import { ChevronRightIcon, DropdownMenuIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import getProductsDataByCat from "@/lib/getProductsDataByCat";
import ContentLoader from "react-content-loader";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
interface navbarProps {
  data: any,
  brands_data: any,
  isArabic: boolean,
  langData: any,
  lang: string
}

const Navbar: FC<navbarProps> = ({ data, brands_data, isArabic, langData, lang }) => {

  const countries = [
    { country: 'United Arab Emirates', flag: 'https://www.lifepharmacy.com/images/svg/flag-ae.svg', path: "ae" },
    { country: 'Saudi Arabia', flag: 'https://www.lifepharmacy.com/images/svg/flag-sa.svg', path: "sa" },
  ]

  const languages = [
    { name: "Arabic", path: "ar" },
    { name: "English", path: "en" }
  ]

  const { data: session } = useSession()

  const cartItems = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [searchData, setData] = useState({
    results: [
      {
        hits: [
          {
            title: "",
            images: {
              featured_image: "https://www.life-me.com/wp-content/themes/LifePharmacy/assets/images/life-pharmacy-logo-white.png"
            },
            query: "",
            slug: ""
          }
        ]
      },

    ]
  })
  const { locale } = useLanguage()
  const [signInUsing, signInSet] = useState("");
  const [isPhoneNumberValid, setPhoneNumberValidState] = useState(false);
  const [state, setState] = useState('');
  const [showElement, setShowElement] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [overlayVisible, setOverlay] = useState(false);
  const [searchClosebtn, setVisibility] = useState(false);
  const [notValidOTPPageVisib, setnotValidOTPPageVisib] = useState(false);
  const [addNewAddress, setaddNewAddress] = useState(false);
  const [addNewAddressClick, setAddNewAddressClick] = useState(false);
  const [domLoaded, setDomLoaded] = useState(false);
  // const [showNavbarAcc, setShowNavbarAcc] = useState(false);
  const [addnewAddressFormVisibility, setaddnewAddressFormVisibility] = useState(false);
  const [availableAddresses, setavailableAddresses] = useState(true);
  const [languageModal, setLanguageModal] = useState(false)
  const [locationModal, setLocationModal] = useState(false)
  const [smScreenSearchBox, setSmScreenSearchBox] = useState(false)
  const [SearchLoadingState, setSearchLoadingState] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false);
  const [AddressDataIndex, setAddressDataIndex] = useState(session?.token?.addresses[0]);
  // const [chooseCountr, setChooseCountr] = useState(true)
  // const [chooseLanguage, setChooseLanguage] = useState(false)
  const [searchTimer, setSearchTimer] = useState<any>(null)
  const [hoverIndex, setHoverIndex] = useState<any>(0)
  const [subCatIndex, setSubCatIndex] = useState<any>(0)
  const [topBrandsData, setTopBrandsData] = useState<any>([])
  const [topBrandsLoadingState, setTopBrandsLoadingState] = useState<any>(false)
  const [singleCatBrandData, setSingleCatBrandData] = useState<any>(null)
  const [topBrandsTimer, setTopBrandsTimer] = useState<any>(null)


  useEffect(() => {
    setDomLoaded(true);
    fetchTopBrandsData(`categories=${"facial-skin-care"}`, 'facial-skin-care')


    if (!showDropdown) return;
    function handleClick(event: any) {
    }
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);


  function searchSuggestions(searchData: string, isMobile: boolean, type: string) {
    if (isMobile) {
      setSmScreenSearchBox(false)
    }
    else {
      searchButtonOnClick(false)
    }
    if (type === "search") {
      router.push(`/search?term=${searchData}`)
    }
    else {
      router.push(`/product/${searchData}`)
    }
  }

  function isValidCredentials(value: string) {
    if (value != null) {
      if (isValidPhoneNumber(value)) {
        setPhoneNumberValidState(true);
        setFormData({ ...formData, phone: value });
        signInSet("Phone");
      }
      else {
        setPhoneNumberValidState(false);
      }
    }
  }

  const fetchTopBrandsData = (filterPath: any, path: any) => {
    const topBrandsDataExists = topBrandsData.some((brandsData: any) => brandsData.type === path)

    if (!topBrandsDataExists) {
      setTopBrandsLoadingState(true)

      clearTimeout(topBrandsTimer)

      const fetchDataTimer = setTimeout(() => {
        getProductsDataByCat(filterPath, 0, false, locale).then(data => {
          setTopBrandsData([...topBrandsData, { brands: [...data.data.brands], type: path }])
          console.log(topBrandsData);

          setTopBrandsLoadingState(false)

          setSingleCatBrandData(data.data.brands)
        }
        )
      }, 500)

      setTopBrandsTimer(fetchDataTimer)

    }
    else {

      const singleCat = topBrandsData.filter((brandsData: any) => brandsData.type === path)

      setSingleCatBrandData(singleCat[0].brands)
    }
  }

  // function setFocus() {
  //   (document.getElementById("sm-searchbox") as HTMLInputElement).focus();
  // }

  // var i = 1;

  // function ulListTrigger(e: React.MouseEvent<HTMLLIElement, MouseEvent>, itemName: string) {
  //   var elements = document.getElementsByClassName("list-elements")
  //   for (var ele of elements) {
  //     if (!ele.classList.contains("hidden")) {
  //       ele.classList.add("hidden");
  //     }
  //   }
  //   if (i === 1 && itemName == "BeautyCareele") {
  //     (document.getElementById("BeautyCarebtn") as HTMLInputElement).classList.remove("text-blue-400", isArabic ? "border-r-4" : "border-l-4", "border-blue-500", "bg-blue-50");
  //   }
  //   if (i === 1 && itemName != "BeautyCareele") {
  //     (document.getElementById("BeautyCareele") as HTMLInputElement).classList.add("hidden");
  //     (document.getElementById("BeautyCarebtn") as HTMLInputElement).classList.remove("text-blue-400", isArabic ? "border-r-4" : "border-l-4", "border-blue-500", "bg-blue-50");
  //     (document.getElementById(itemName) as HTMLInputElement).classList.remove("hidden");
  //   }
  //   else {
  //     (document.getElementById(itemName) as HTMLInputElement).classList.remove("hidden");
  //   }
  //   i++
  // }
  const [queryData, setQueryData] = useState("")

  function searchButtonOnClick(isOpen: boolean) {
    if (window.innerWidth > 767) {
      const lgScreenSearchBox = document.getElementById("lg-screen-search") as HTMLInputElement

      if (isOpen) {
        document.getElementsByClassName("lg-screen-searchsuggestion-lg")[0].classList.remove("hidden");
        lgScreenSearchBox.classList.remove("rounded-full");
        lgScreenSearchBox.classList.add("rounded-b-none", "rounded-3xl");
      }
   
    }

    searchButtonOnMouseEnter(queryData)
  }

  function searchBoxClear() {
    (document.getElementById("sm-searchbox") as HTMLInputElement).value = ""
    setQueryData("")
    searchButtonOnMouseEnter("",)
    setVisibility(false);
  }
  function searchButtonOnMouseEnter(query: string) {
    setQueryData(query)

    clearTimeout(searchTimer)

    const newTimer = setTimeout(() => {
      getSearchData(query)
    }, 600)

    setSearchTimer(newTimer)

    if (query != "") {
      setVisibility(true);
    }
    else {
      setVisibility(false);
    }
  }

  const getSearchData = (query: string) => {

    console.log("Search Data" + query);


    var myHeaders = new Headers();
    myHeaders.append("X-Algolia-API-Key", "c54c5f0fc2e6bd0c3b97cfa5b3580705");
    myHeaders.append("X-Algolia-Application-Id", "WHCXS2GWOG");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "requests": [
        {
          "indexName": "products",
          "params": "query=" + query
        },
        {
          "indexName": "products_query_suggestions",
          "params": "query=" + query
        }
      ],
      "strategy": "none"
    });

    var requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    setSearchLoadingState(true)

    fetch("https://WHCXS2GWOG-dsn.algolia.net/1/indexes/*/queries?lang=ae-en", requestOptions)
      .then(response => response.json())
      .then(result => {
        setData(result);
        setSearchLoadingState(false);
      })
      .catch(error => console.log('error while fetching search data', error));
  }

  function saveAddresstoDb() {
    debugger
    var requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session?.token.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    };
    const res = fetch("https://prodapp.lifepharmacy.com/api/user/save-address", requestOptions)
      .then(response => {
        if (response.ok) {
          setAddressDataIndex(0);
          setaddNewAddress(false);
          setaddnewAddressFormVisibility(false)
        } else {
          throw new Error('Request failed');
        }
      })
      .then(result => console.log(result))
      .catch(error => console.log('error while fetching search data', error));


  }

  function slugify(text: string) {
    return text.toLowerCase().replace(/[\s&/]+/g, '-')
  }
  function generatePath(grand_p: string, parent: string, child: string) {
    return `/category/${slugify(grand_p)}/${parent}/${slugify(child)}`
  }

  var addressId = session ? (session.token.addresses.length != 0 ? (session.token.addresses[session.token.addresses.length - 1]?.id) + 1 : 12345 + 1) : ""
  const [formData, setFormData] = useState({
    id: addressId,
    entity_id: 1462724,
    name: "",
    phone: "",
    longitude: "55.272887000000000",
    latitude: "25.219370000000000",
    type: "Home",
    country: "United Arab Emirates",
    state: "",
    city: "",
    area: "Satwa",
    street_address: "",
    building: "",
    flat_number: "",
    suitable_timing: "0",
    created_at: "2023-03-16T08:09:22.000000Z",
    updated_at: "2023-03-16T08:09:22.000000Z",
    google_address: "Al Satwa - Dubai - United Arab Emirates",
    additional_info: "",
    belongs_to: "user",
    deleted_at: null,
    is_validated: 1
  });

  const router = useRouter();

  const refreshData = async () => {
    router.replace(router.asPath);
  }

  const formDatahandleChange = (e: any): void => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addressFormOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    saveAddresstoDb()
    console.log(formData);
  };


  function displayedAddress(displayAddressData: any) {
    if (displayAddressData) {
      if ((displayAddressData?.google_address).length > 30) {
        return displayAddressData?.google_address.substring(0, 30) + '...'
      }
      else {
        return displayAddressData?.google_address
      }
    }
    else {
      return ""
    }

  }

  const [highestRatedP, sethighestRatedP] = useState(true)

  function locationOnClickHandle() {
    debugger
    if (session != null) {
      setaddNewAddress(true)

      if (session.token.addresses.length > 0) {
        setavailableAddresses(true)
      }
      else if (session.token.addresses.length === 0) {
        setAddNewAddressClick(true)
      }
    }
    else {
      setIsOpen(true);
    }

  }
  const setModalState = (modalState: any) => {
    setLanguageModal(modalState)
  }

  const removedFromCart = () => {
    toast.info(`Cart Suceesfully Updated`);
  }

  const calculateTotalCartPrice = (): string => {
    let totalPrice: number = 0;
    cartItems.forEach((pro_data: any) => {
      totalPrice += pro_data.prices[0].price.regular_price * pro_data.quantity;
    });
    return parseFloat(totalPrice.toString()).toFixed(2);
  };

  const parts = locale ? locale?.split("-") : ["ae", "en"]

  const getFlagByLocale = () => {
    if (parts) {
      if (parts[0] === "sa") {
        return countries[1].flag
      }
      else {
        return countries[0].flag
      }
    }
    else {
      return countries[0].flag
    }
  }


  const getLanguageByLocale = () => {
    if (parts) {
      if (parts[1] === "ar") {
        return languages[1].name
      }
      else {
        return languages[0].name
      }
    }
    else {
      return languages[1].name
    }
  }

  const { width } = useWindowDimensions()
  return (

    <>
      {highestRatedP ?
        <TransitionComp
          setTransition={highestRatedP} >
          <div className="grid grid-flow-col  bg-life-2 text-white  text-xs px-2 py-1 md:hidden ">
            <div className="flex justify-start">
              <svg onClick={() => { sethighestRatedP(false) }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" className=" sm:w-5 sm:h-7 w-3 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <div className="my-auto sm:text-sm  text-[8px] mx-2">{langData.navbar.highest_rated_phar}</div>
            </div>
            <div className="text-end sm:text-sm  text-[8px]  my-auto font-bold">{langData.navbar.download_now}</div>
          </div>
        </TransitionComp>
        : null}

      <div className="sticky top-0 z-50 bg-white mx-auto ">

        <div className="md:bg-[#002579] bg-white  backdrop-blur backdrop-filter ">
          <div className="mx-auto flex max-w-[1450px] sm:px-[10px] px-[5px] gap-5  sm:py-3 py-1 ">
            <Link href={"/"} className="my-auto">
              <Image src="https://www.lifepharmacy.com/images/logo-white.svg" alt=""
                className=" bg-[#002579] filter md:flex hidden" width={380} height={250} />
              <Image className="mr-auto w-7 lg:hidden md:hidden" src="https://www.lifepharmacy.com/images/life.svg" alt="" width={100} height={100} />
            </Link>

            <div className="flex items-center w-full " >
              <label htmlFor="simple-search-lg" className="sr-only">Search</label>
              <div className="relative w-full">

                <div className="relative group-search bg-white rounded-full" id="lg-screen-search" onChange={(e) => { searchButtonOnMouseEnter((e.target as HTMLInputElement).value) }} onKeyDown={(e) => e.key === "Enter" ? searchButtonOnClick(false) : null} onMouseDown={(e) => { searchButtonOnClick(true) }}   >
                  <div className={`absolute inset-y-0  flex items-center pointer-events-none ${isArabic ? 'right-0 pr-3 ' : 'left-0 pl-3'}`}>
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 " fill="currentColor"
                      viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"></path>
                    </svg>
                  </div>
                  {SearchLoadingState ?
                    <svg fill="none" className={`animate-spin w-5 h-5 absolute inline ${isArabic ? "left-8" : "right-8"}  inset-y-0 m-auto w-4 h-4 mx-2`} stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" shape-rendering="geometricPrecision" viewBox="0 0 24 24" height="24" width="24" ><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg> : ""}

                  < input type="search" defaultValue={queryData} id="lg-searchbox"
                    className={`focus:ring-0 focus:ring-offset-0 hidden md:block bg-white  p-[0.7rem]  text-gray-900 text-sm rounded-full  w-full ${isArabic ? 'pr-10 ' : 'pl-10 '} p-3`}
                    placeholder={langData.navbar.searchbox_text} />

                  <div className="shadow-xl px-3 lg-screen-searchsuggestion-lg scale-100 hidden absolute top-13  right-0 left-0  bg-white border-gray-200   rounded-t-0 rounded-b-md z-50 border-t-[3px] border-muted">
                    {searchData.results[1] ?
                      <>
                        <div className="mb-5 group-search sticky top-0 bg-white pt-4">
                          {searchData?.results[1]?.hits[0] ?
                            <>
                              <h5 className="text-sky-500 text-xs ">SUGGESTIONS</h5>
                              <div className="flex my-2 flex-wrap text-[13px] text-gray-700 group-search">
                                {searchData.results[1].hits.slice(0, 10).map(sug_data => (
                                  <div onClick={() => {
                                    searchSuggestions(sug_data.query, false, "search")

                                  }} className="rounded-xl bg-gray-200 hover:bg-gray-300  py-1 px-3 mb-2 mr-2 cursor-pointer">{sug_data.query}</div>
                                ))}
                              </div></>
                            : ""}
                        </div>
                        <div className="text-gray-600 text-xs group-search overflow-y-auto search-suggestion-height">
                          <h5 className="text-sky-500 text-xs ">PRODUCTS</h5>
                          {searchData.results[0].hits[0] ? searchData.results[0].hits.map(pro_data => (
                            <div onClick={() => {
                              searchSuggestions(pro_data.slug, false, "products")
                            }} className="p-2 rounded-lg flex  group-search hover:bg-gray-100 w-full h-16 cursor-pointer">
                              <Image src={pro_data.images ? pro_data.images.featured_image : "/images/default-product-image.png"} height={40} width={40} alt={pro_data.title} className="border-[3px] rounded border-muted"></Image>
                              <p className="mx-2  my-auto">{pro_data.title} </p>
                            </div>
                          )) : <div>No Products Found</div>}
                        </div>
                      </> : <div role="status" className="max-w-full animate-pulse">
                        <div className="group-search mb-5 pt-4">
                          <h5 className="text-xs text-sky-500">SUGGESTIONS</h5>
                          <div className="group-search my-2 flex flex-wrap text-[13px] text-gray-700">
                            <span className="sr-only">Loading...</span>
                            <div className="loading-style"></div>
                            <div className="loading-style"></div>
                            <div className="loading-style"></div>
                            <div className="loading-style"></div>
                            <div className="loading-style"></div>
                          </div>
                          <div className="group-search text-xs text-gray-600">
                            <h5 className="mb-3 text-xs text-sky-500">PRODUCTS</h5>
                            <div role="status" className="mb-3 flex">
                              <div className="loading-img "></div>
                              <div className="h-10 w-full mx-4">
                                <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                                <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                              </div>
                              <span className="sr-only">Loading...</span>
                            </div>
                            <div role="status" className="mb-3 flex">
                              <div className="loading-img"></div>
                              <div className="h-10 w-full mx-4">
                                <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                                <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                              </div>
                              <span className="sr-only">Loading...</span>
                            </div>
                            <div role="status" className="mb-3 flex">
                              <div className="loading-img"></div>
                              <div className="h-10 w-full mx-4">
                                <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                                <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                              </div>
                              <span className="sr-only">Loading...</span>
                            </div>
                            <div role="status" className="mb-3 flex">
                              <div className="loading-img"></div>
                              <div className="h-10 w-full mx-4">
                                <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                                <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                              </div>
                              <span className="sr-only">Loading...</span>
                            </div>
                            <div role="status" className="mb-3 flex">
                              <div className="loading-img"></div>
                              <div className="h-10 w-full mx-4">
                                <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                                <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                              </div>
                              <span className="sr-only">Loading...</span>
                            </div>
                            <div role="status" className="mb-3 flex">
                              <div className="loading-img"></div>
                              <div className="h-10 w-full mx-4">
                                <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                                <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                              </div>
                              <span className="sr-only">Loading...</span>
                            </div>
                            <div role="status" className="mb-3 flex">
                              <div className="loading-img"></div>
                              <div className="h-10 w-full mx-4">
                                <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                                <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                              </div>
                              <span className="sr-only">Loading...</span>
                            </div>
                            <div role="status" className="mb-3 flex">
                              <div className="loading-img"></div>
                              <div className="h-10 w-full mx-4">
                                <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                                <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                              </div>
                              <span className="sr-only">Loading...</span>
                            </div>
                            <div role="status" className="mb-3 flex">
                              <div className="loading-img"></div>
                              <div className="h-10 w-full mx-4">
                                <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                                <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                              </div>
                              <span className="sr-only">Loading...</span>
                            </div>
                            <div role="status" className="mb-3 flex">
                              <div className="loading-img"></div>
                              <div className="h-10 w-full mx-4">
                                <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                                <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                              </div>
                              <span className="sr-only">Loading...</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  </div>

                  < input type="button" onClick={() => {
                    setSmScreenSearchBox(true)
                  }}
                    className={`cursor-pointer md:hidden block bg-gray-50 border border-slate-300 text-[#9ba0b1] text-sm rounded-lg focus:ring-0 w-full ${isArabic ? "text-right pr-12" : "pl-10 text-left"}  p-3  rounded-full`}
                    value={langData.navbar.searchbox_text} />

                </div>
              </div>
            </div>

            <div className="grid grid-flow-col w-100  md:flex lg:flex my-auto h-12">

              <button className="mx-auto h-full flex items-center flex-col justify-between " onClick={() => { setLanguageModal(true) }}>
                <Image src={getFlagByLocale()} alt=""
                  className=" h-7 w-10 rounded-md object-cover border border-black" width={100} height={100} />
                <div className="text-[11px] text-center md:text-white ">{getLanguageByLocale()}</div>
              </button>

              {session ?
                <Link className="  text-left  justify-between  flex-col pl-5  md:hidden lg:flex hidden" href="/dashboard">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-7 h-7 mx-auto fill-white" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                  </svg>
                  <div className="text-[11px] text-center text-white">Account</div>
                </Link>
                : <a href="#" className=" flex-col md:hidden lg:flex hidden pl-5" onClick={() => { setLocationModal(true) }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                    stroke="currentColor" className=" my-auto text-white w-7 h-7 mx-auto">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>

                  <div className="text-[11px] text-center text-white">{langData.navbar.account}</div>
                </a>}

              <a href="#" className=" justify-between  flex-col md:hidden lg:flex hidden   pl-5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                  stroke="currentColor" className=" text-white w-7 h-7 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                <div className="text-[11px] text-center text-white whitespace-nowrap">{langData.navbar.wishlist}</div>

              </a>
              <a href={`/cart`} className="justify-between flex-col md:hidden lg:flex hidden relative cart group/cart pl-5">
                {domLoaded ?
                  cartItems && cartItems.length != 0 ?
                    <div className="absolute inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-red-500  rounded-full -top-2 -right-2 "> {cartItems.length}</div>
                    : null : null}

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-7 h-7 fill-white" viewBox="0 0 16 16">
                  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                </svg>
                <div className="text-[11px] text-center text-white" >{langData.navbar.cart}</div>

                {domLoaded && cartItems && cartItems.length > 0 ?
                  <div className="group-hover/cart:scale-100  scale-0 absolute w-[25rem] top-[3rem] right-0 bg-white rounded-lg px-3 py-2  h-fit  shadow-lg z-30">
                    <div className="overflow-y-auto h-fit max-h-[20rem] px-2">
                      {cartItems.map((item: any) => (
                        <>
                          <div className="flex py-2">
                            <a href={`/product/${item.slug}`} className="w-3/4 text-sm  my-auto">{item.title}</a>
                            <div className="w-1/4 flex">
                              <a href={`/product/${item.slug}`} className="w-3/4">
                                <Image src={item.images.featured_image} height={100} width={100} className="w-full m-1" alt={item.title} />
                              </a>
                              <button onClick={() => {
                                dispatch(removeFromCart(item.id))
                                removedFromCart()
                              }
                              } className="w-1/4 ml-2 my-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 fill-red-500">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>

                          </div>
                          <div className="bg-gray-300 h-[1px] w-11/12 mx-auto mt-2"></div>
                        </>
                      ))}
                    </div>

                    <div className="py-3">
                      <div className="flex justify-between ">
                        <div>TOTAL <span className="text-xs">(WITHOUT SHIPPING)</span> </div>
                        <div className="">AED {calculateTotalCartPrice()}</div>
                      </div>
                    </div>
                    <div className="py-3 flex justify-between text-white space-x-3">
                      <a href={`/cart`} className="bg-[#39f] px-3 py-1 w-full text-center" >CART</a>
                      <button className="bg-[#39f] px-3 py-1 w-full">CHECK OUT</button>
                    </div>
                  </div>
                  : null}
              </a>
            </div>
          </div>
          <div className="bg-[#a92579] items-center">
            <div className="  justify-between py-1 max-w-[1450px] mx-auto  sm:px-[10px] px-[5px] text-white lg:flex md:flex hidden " >
              <Link href={"/super-summer-savers"} className={"flex justify-start space-x-3 "}>
                <div className={` my-auto`}>
                  <small className="text-xs whitespace-nowrap">{langData.navbar.highest_rated_phar} <span className=" ml-2">|</span> </small>
                </div>
                <Image src={"https://www.lifepharmacy.com/images/app-rating.svg"} className="lg:w-20 w-10 h-5 my-auto" height={30} width={30} alt={"app-rating"} />
                <div className="flex items-center">
                  <span className="font-semibold mr-1">|</span>
                  <small className="text-xs whitespace-nowrap">Download Now</small>
                </div>
              </Link>
              <div className="text-end flex justify-between items-center ">
                <small className="mx-4 text-xs whitespace-nowrap">{langData.navbar.deliver_to}  {session?.token?.addresses && session?.token?.addresses.length != 0 ? (displayedAddress(AddressDataIndex)) : "Dubai, United Arab Emirates"}</small>
                <button
                  className="bg-white text-life-2 text-xs rounded px-2   font-bold py-1 flex items-center text-life" onClick={() => { locationOnClickHandle() }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-4 h-3 mr-1" viewBox="0 0 16 16">
                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                  <span>CHANGE</span>  </button>
              </div>
            </div>
          </div>
          <div className="w-full bg-white shadow-md">
            <div className="hidden md:grid grid-cols-12 bg-white max-w-[1440px] mx-auto relative ">

              <div onMouseOver={() => {
                setOverlay(true)
              }} onMouseLeave={() => { setOverlay(false) }} className="group inline-block shop-by-cat lg:col-span-2 col-span-3 min-w-fit">
                <button
                  className="group-hover:bg-blue-500 py-[5px]  group-hover:text-white hover:text-white dropdown BeautyCareele flex justify-between px-2 border-r border-slate-300  items-center w-full bg-blue-50"
                  id="dropdownDefaultButton" data-dropdown-toggle="dropdown">

                  <div
                    className=" flex w-6 h-6 my-2 float-left cursor-pointer items-center justify-center   p-0.5 ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-6 h-6 group-hover:hidden block" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-6 h-6 group-hover:block hidden " viewBox="0 0 16 16">
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                    </svg>
                  </div>
                  <div className="text-start text-sm group-1 align-middle flex justify-between whitespace-nowrap">
                    {langData.navbar.shop_by_cat}
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                    stroke="currentColor" className="h-6 float-right  w-4 mr-2 group-hover:-rotate-180 transition-transform duration-200">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                <div className="z-30 absolute border-t border group-hover:opacity-100 opacity-0 group-hover:scale-100 scale-0  transition-opacity duration-300 left-0 right-0 bg-white ">
                  <div className="grid grid-cols-12">
                    <div className=" lg:col-span-2 col-span-3">
                      {data.data.map((item: any, i: number) => (
                        <button onMouseOver={() => {
                          setSubCatIndex(0)
                          setHoverIndex(i)
                          data.data.slice(hoverIndex, hoverIndex + 1).map((item: any, i: number) => (item.children.slice(subCatIndex, subCatIndex + 1).map((itm: any) => (
                            fetchTopBrandsData(`categories=${itm.slug}`, itm.slug)
                          ))))
                        }} className={`py-1 border-white border-b  w-full flex justify-between px-2 text-sm items-center bg-slate-200/80  hover:bg-slate-100 duration-200 transition-colors  ${hoverIndex === i ? '!bg-slate-100 font-semibold' : ""}`}>
                          <div className="space-x-2 flex items-center">
                            <div className="h-[60px] w-[60px] border-4 border-slate-300/50 rounded-full">
                              <Image src={`/images/${slugify(item.name)}.webp`} width={60} height={60} className="rounded-full w-full" alt={item.name} />
                            </div>
                            <div className={` text-[13px] whitespace-nowrap `} >{item.name}</div>
                          </div>
                          <ChevronRightIcon className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                    <div className="col-span-4 lg:col-span-3 h-fit  bg-white overflow-y-auto overflow-x-hidden max-h-[485px]">
                      {data.data.slice(hoverIndex, hoverIndex + 1).map((item: any, i: number) => (
                        item.children.map((itm: any, i: number) => (
                          <button onMouseOver={() => {
                            setSubCatIndex(i)
                            fetchTopBrandsData(`categories=${itm.slug}`, itm.slug)
                          }} className={`py-1 border-white border-b flex px-4 whitespace-nowrap justify-between w-full bg-slate-100 hover:bg-white duration-100 transition-colors text-sm items-center ${subCatIndex === i ? 'bg-white font-semibold' : ""}`}>
                            <div className="space-x-2 flex items-center" >
                              <div className="h-[60px] w-[60px] border-4 border-slate-200 rounded-full">
                                <Image src={itm.sections[0] && itm.sections[0].images.logo ? itm.sections[0].images.logo : "/images/default-product-image.png"} height={60} width={60} alt={itm.name} className="w-full rounded-full" />
                              </div>
                              <h5 className="text-[13px]">{itm.name}</h5>
                            </div>
                            <ChevronRightIcon className="w-3 h-3" />
                          </button>
                        ))
                      ))}
                    </div>
                    <div className="space-y-5 lg:col-span-7 col-span-5  px-4 bg-white max-h-[485px] overflow-y-auto overflow-x-hidden">
                      {/* <h3 className="font-semibold text-center ">CATEGORIES</h3> */}
                      <div className="grid xl:grid-cols-4 grid-cols-2 gap-4 py-2 relative">
                        {data.data.slice(hoverIndex, hoverIndex + 1).map((item: any, i: number) => (
                          item.children.slice(subCatIndex, subCatIndex + 1).map((itm: any) => (
                            itm.sections.map((sec: any) => (
                              sec.images.logo ?
                                <Link className=" group/catImage lg:flex block  items-center hover:bg-slate-100 p-3 rounded-xl hover:font-bold " href={generatePath(item.name, itm.slug, sec.name)}>
                                  <Image src={sec.images.logo} alt={sec.name} width={60} height={60} className="group-hover/catImage:scale-110 duration-200 transition-transform lg:mx-0 mx-auto border-muted border-4 rounded-full max-h-[60px] max-w-[60px]" />
                                  <p className=" text-xs lg:ml-3 ml-0 lg:text-left text-center lg:mt-0 mt-3 text-black" style={{ wordBreak: "break-all" }} >{sec.name}</p>
                                </Link>
                                : null
                            ))
                          ))))}
                      </div>
                      <div className="sticky bottom-0 bg-white py-2">
                        <h3 className="text-lg font-bold text-center mt-2">TOP BRANDS</h3>
                        <div className="grid xl:grid-cols-6 lg:grid-cols-5 gap-3 grid-cols-4 ">
                          {singleCatBrandData && !topBrandsLoadingState ?
                            singleCatBrandData.slice(0, width > 1280 ? 6 : width > 991 ? 5 : 4).map((brandData: any) => (
                              <Link className="group/brand relative" href={`/brand/${brandData.slug}`}>
                                <Image src={brandData.images.logo ? brandData.images.logo : "/images/default-product-image.png"} height={80} width={80} className="mx-auto group-hover/brand:shadow-xl group-hover/brand:shadow-blue-200 duration-100 transition-shadow shadow rounded-lg" alt="brand-img" />
                                <div className="absolute  left-0 right-0 bottom-0 bg-emerald-200  w-fit mx-auto rounded-tl-lg rounded-tr-lg px-1">
                                  <h5 className="text-center text-black text-[11px] whitespace-nowrap">{brandData.name}</h5>
                                </div>
                              </Link>
                            ))
                            :
                            <div className="col-span-full mx-auto">
                              <ContentLoader
                                width={500}
                                height={100}
                                viewBox="0 0 500 100"
                                backgroundColor="#f3f3f3"
                                foregroundColor="#ecebeb"
                              >
                                <circle cx="46" cy="38" r="38" />
                                <rect x="34" y="83" rx="5" ry="5" width="25" height="10" />
                                <rect x="547" y="222" rx="5" ry="5" width="220" height="10" />
                                <rect x="82" y="150" rx="5" ry="5" width="220" height="10" />
                                <circle cx="137" cy="38" r="38" />
                                <rect x="124" y="83" rx="5" ry="5" width="25" height="10" />
                                <circle cx="228" cy="38" r="38" />
                                <rect x="215" y="83" rx="5" ry="5" width="25" height="10" />
                                <circle cx="320" cy="38" r="38" />
                                <rect x="307" y="83" rx="5" ry="5" width="25" height="10" />
                                <circle cx="410" cy="38" r="38" />
                                <rect x="398" y="83" rx="5" ry="5" width="25" height="10" />
                              </ContentLoader>
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-6 ">
                <div className="group inline-block mr-2">
                  <button className="hover:text-blue-500 underline-tra ml-7 py-1 flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                      stroke="currentColor" className="w-6 h-6 my-2 float-left mr-3">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                    </svg>
                    <Link href={"/brands"} className=" text-start mt-2 capitalize whitespace-nowrap">{langData.navbar.brands}</Link>
                  </button>
                  <ul
                    className="bg-white shadow-lg transform scale-0 group-hover:scale-100 absolute 
                z-10 transition duration-150 ease-in-out origin-top hidden group-hover:flex flex-col  px-5  text-black left-0 right-0 border-t border-muted">
                    <li key={"brands-section"} >
                      <div className="grid grid-cols-5 gap-3  mx-auto" id="brands-section">
                        {brands_data.data.brands.map((bd: any) => (
                          <div className="grid-flow-row mb-5"> <div className={`flex flex-col mr-5`}>
                            <Link href={`/brand/${bd.slug}`}>
                              <Image className="mx-auto rounded-full border border-white bg-white shadow-md" width={120} height={120} src={bd.images.logo} alt="" />
                              <h5 className="text-center mt-3">{bd.name}</h5>
                            </Link>
                          </div></div>
                        ))}
                      </div>
                      <div className="w-full text-center my-5">
                        <Link href="/brands" className="text-white px-8 py-2 text-sm mx-auto rounded-full bg-primary">VIEW ALL</Link>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className=" inline-block mr-2">
                  <button className="hover:text-blue-500 underline-tra py-1 flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                      stroke="currentColor" className="w-6 h-6 my-2 mr-3">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                    </svg>
                    <Link href={"/offers"} className=" text-start mt-2  ">{langData.navbar.offers}</Link>
                  </button>
                </div>
                <button className="  hover:text-blue-500 underline-tra flex items-center" >
                  <Link href={"/health_checkup"} className=" text-start h-fit whitespace-nowrap ">{langData.navbar.health_packages}</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div >

      <div className="sm:visible md:hidden ">
        <div className="flex  bg-life text-white text-xs px-[10px] py-1 justify-between items-center">
          <div>{langData.navbar.deliver_to}:   <span className="mx-2">Business Bay, Dubai</span>  </div>
          <button className="bg-white rounded text-pink-700 w-20 py-1" onClick={() => { locationOnClickHandle() }}>CHANGE</button>
        </div>
      </div>

      {
        showElement ? (
          <div className="rounded-xl sm:py-5 py-3   fixed bottom-28 inset-x-0 md:px-5 px-2 mx-2 border border-gray-300 flex justify-between md:text-xs bg-white sm:visible lg:w-6/12 lg:ml-auto bg-white z-20 text-[10px]">
            <div className="text-indigo-900 font-bold sm:text-[12px] text-[8px] my-auto">Add your location to get an accurate delivery time</div>
            <div className="flex justify-evenly">
              <button onClick={() => setIsOpen(true)} className="text-pink-900 font-semibold sm:text-xs text-[9px] my-auto">Select your area</button>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" className="sm:w-4 sm:h-4 w-3 h-3  ml-2 mr-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
              <button onClick={() => setShowElement(!showElement)} aria-label="Close Show Element">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke-width="1.5" stroke="currentColor" className="sm:w-6 sm:h-6  w-3 h-3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ) : ""
      }

      <LocationModal showModal={isOpen} setCloseModal={setIsOpen} setLocationModal={setLocationModal} />

      <AuthModal showModal={locationModal} setCloseModal={setLocationModal} setaddNewAddress={setaddNewAddress} setaddnewAddressFormVisibility={setaddnewAddressFormVisibility} setLocationModal={setLocationModal} setnotValidOTPPageVisib={setnotValidOTPPageVisib} />

      <InvalidOTPModal showModal={notValidOTPPageVisib} setCloseModal={setnotValidOTPPageVisib} />

      <AddressModal setaddNewAddress={setaddNewAddress} session={session} formData={formData} isValidCredentials={isValidCredentials}
        isPhoneNumberValid={isPhoneNumberValid} availableAddresses={availableAddresses}
        setavailableAddresses={setavailableAddresses} showModal={session && addNewAddress ? true : false}
        AddressDataIndex={AddressDataIndex} formDatahandleChange={formDatahandleChange} setAddressDataIndex={setAddressDataIndex} />

      <LanguageChangeModal setModalState={setModalState} modalState={languageModal} currentLanguage={parts[1] === "ar" ? languages[0] : languages[1]} currentCountry={parts[0] === "sa" ? countries[1] : countries[0]} countries={countries} languages={languages} lang={parts} />

      <SmSearchBoxModal showModal={smScreenSearchBox} setCloseModal={setSmScreenSearchBox} isArabic={isArabic} queryData={queryData} setQueryData={setQueryData} searchButtonOnMouseEnter={searchButtonOnMouseEnter} SearchLoadingState={SearchLoadingState} searchData={searchData} searchBoxClear={searchBoxClear} searchSuggestions={searchSuggestions} searchClosebtn={searchClosebtn} />

      <SmMenu searchButtonOnClick={searchButtonOnClick} setSmScreenSearchBox={setSmScreenSearchBox} />

      {
        overlayVisible ? <div className="fixed inset-0 bg-black bg-opacity-25 z-10" />
          : null
      }

      <label className="hidden grid-cols-[repeat(1,auto)] grid-cols-[repeat(2,auto)] grid-cols-[repeat(3,auto)] grid-cols-[repeat(4,auto)] grid-cols-[repeat(5,auto)] grid-cols-[repeat(6,auto)] grid-cols-[repeat(7,auto)]
grid-cols-[repeat(8,auto)] grid-cols-[repeat(9,auto)] grid-cols-[repeat(10,auto)] grid-cols-[repeat(11,auto)] grid-cols-[repeat(12,auto)]"></label>
      <p className='hidden bg-[#fb7979] bg-[#9b274f] bg-[#f50a0a] bg-[#f245a1] bg-[#ef0b0b] bg-[#f90101] bg-[#d81851]'></p>

    </>
  );
};

export default Navbar; 