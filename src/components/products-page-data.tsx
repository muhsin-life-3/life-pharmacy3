import { SingleProductData } from "./single-product-data"
import React, { useState, useEffect } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { AccordionTrigger, AccordionContent, AccordionItem } from "./accordion-radix";
import { BrandsButton } from "./Button";

import { useRouter } from "next/router";
import getProductsDataByCat from '@/lib/getProductsDataByCat';
import getCategoryData from "@/lib/getCategoryData";
import { useLanguage } from "@/hooks/useLanguage";
import { ProductsSkeleton } from "./productsSkeleton";

import * as Slider from '@radix-ui/react-slider';
const ProductsPageData = ({ filterPath, categoryData, brandsData, isSearchPage, selectedBrands, menuData }: { isSearchPage: boolean, selectedBrands: any, categoryData: any, brandsData: any, filterPath: any, menuData: any }) => {


    const [noOfProducts, setNoOfProducts] = useState(40)
    const [animateSpin, setAnimateSpin] = useState(false)
    const [showMoreProductsbtn, setShowMoreProductsbtn] = useState(true)
    const [preSelectedBrands, setSelectedBrands] = useState<string[]>([])
    const [catData, setCatData] = useState({
        data: [{

        }]
    })
    const [isRowView, setIsRowView] = useState(false)
    const [rangeSliderValue, setRangeSliderValue] = useState([50])
    const router = useRouter()

    var brandsSelected: string[] = []

    const [productFilterApplied, setProductsFilterApplied] = useState(false)

    const skeletonArray = Array(12).fill(<ProductsSkeleton />)

    const filters = [
        { name: "popularity", text: "Most Popular" },
        { name: "most-rated", text: "Most Rated" },
        { name: "price-asc", text: "Price: Low to High" },
        { name: "price-desc", text: "Price: High to Low" },
    ]

    const [selectedFilter, setFilter] = useState(filters[0])
    const { locale } = useLanguage();
    var productsData = categoryData.products
    const [data, setData] = useState(productsData)

    function slugify(text: string) {
        return text.toLowerCase().replace(/[\/\s&]+/g, '-');
    }

    function generatePath(grand_p: string, parent: string, child: string) {
        return `/category/${slugify(grand_p)}/${parent}/${slugify(child)}`
    }


    const routerPathReplace = (url: string, newUrl: string) => {
        router.push(router.asPath.replace(url, newUrl))
    }

    const addBrand = (value: string) => {
        brandsSelected = [...brandsSelected, ...preSelectedBrands]
        brandsSelected?.push(value)

        if (brandsSelected.length > 1) {
            // routerPathReplace(currentBrandsRoute, `&brands=${brandsSelected.toString()}`)
        }
        else {
            // router.push(router.asPath + `&brands=${brandsSelected}`)
        }
    };


    const removeBrand = (value: string) => {
        brandsSelected = [...brandsSelected, ...preSelectedBrands]
        brandsSelected = brandsSelected.filter(brand => brand !== value)
        setSelectedBrands(brandsSelected)
    };

    function typeGenerate(type: string) {
        switch (type) {
            case "Category":
                return "categories"
            case "Collection":
                return "collections"
        }
        return ""
    }

    const rangeSliderValueChange = (newValue: number[]) => {
        setRangeSliderValue(newValue)
    }
    const filterSet = (indx: number, type: string, value: any, isRemoveele: boolean) => {
        if (type === "brands") {
            if (isRemoveele) {
                removeBrand(value)
            }
            else {
                setSelectedBrands(brands => [...brands, value])
                addBrand(value)
            }
            value = brandsSelected.toString()
        }
        else {
            setFilter(filters[indx])
        }

        setProductsFilterApplied(true);
        debugger
        fetchData(typeGenerate(menuData[0]), 0, false, (type === "order_by" ? `&${type}=${value}` : "") + (type === "brands" && brandsSelected.length > 0 ? `&${type}=${value}` : ""))
    }

    function fetchData(query: any, noOfProducts: number, loadMoreData: boolean, filterPaths: string) {
        if (query === null) {
            getProductsDataByCat(filterPath + filterPaths, noOfProducts, true, locale).then(
                (proData: any) => {
                    if (loadMoreData) {
                        debugger
                        productsData = [...productsData, proData.data.products]
                        setAnimateSpin(false)
                        setShowMoreProductsbtn(false)
                    }
                    else {
                        setData(proData.data.products)
                        setProductsFilterApplied(false);
                    }
                }
            )
        }
        else {
            getProductsDataByCat(filterPath + filterPaths, noOfProducts, false, locale).then(
                (proData: any) => {
                    if (loadMoreData) {
                        debugger

                        productsData = [productsData, proData.data.products]
                        setAnimateSpin(false)
                        setShowMoreProductsbtn(false)
                    }
                    else {
                        setData(proData.data.products)
                        setProductsFilterApplied(false);
                    }
                }
            )
        }
    }

    useEffect(() => {
        getCategoryData().then(cat_data => {
            setCatData(cat_data)
        })
    }, [])

    function loadMoreProducts() {
        setAnimateSpin(true)
        fetchData(typeGenerate(menuData[0]), noOfProducts, true, "")
        setNoOfProducts(c => c + 40)
    }
    return (
        <div className=' max-w-[1450px] mx-auto  sm:px-[10px] px-[5px]'>
            {!isSearchPage ?
                <div className="flex justify-between py-3">
                    <div className="h-fit my-auto">
                        <p className="sm:text-sm text-xs">Showing <span className="text-black">{noOfProducts}</span> of <span className="text-black ">{categoryData.total_count}</span> Products</p>
                    </div>
                    <div className=" items-center md:flex hidden">
                        <div className="relative inline-block text-left group/sort-menu">
                            <div>
                                <button type="button" className="group space-x-3 items-center inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900" id="menu-button"  >
                                    <div className="px-2 py-1 border border-slate-300 rounded-md flex text-base sm:text-sm text-[10px] items-center justify-between">
                                        {selectedFilter.text}
                                        <svg className="-mr-1 ml-1 h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor" >
                                            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                </button>
                            </div>
                            <div className="group-hover/sort-menu:scale-100 scale-0 top-6 right-0 absolute  z-10 mt-2 w-40 origin-top-right rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none bg-slate-100 opacity-95 backdrop-blur-lg" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                                <div className="py-1">
                                    {filters.map((filter: any, indx: number) => (
                                        <div onClick={() => filterSet(indx, "order_by", filters[indx].name, false)} className={`${selectedFilter.text === filter.text ? "bg-slate-500 text-white" : "hover:bg-slate-200"} block px-4 py-1 text-sm cursor-pointer`}>{filter.text}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="ml-5">
                            <input type="radio" defaultChecked={true} id="grid-view" name="col-type" className="hidden peer" value="chatWithUs" />
                            <label htmlFor="grid-view" onClick={() => setIsRowView(false)} className="cursor-pointer -m-2  p-2 mr-2 text-gray-400 hover:text-gray-500 sm:ml-7 peer-checked:text-blue-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-5 h-5" viewBox="0 0 16 16">
                                    <path d="M1 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V4zM1 9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V9zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V9z" />
                                </svg>
                            </label>
                        </div>

                        <input type="radio" id="list-view" name="col-type" className="hidden peer" value="chaWithUs" />
                        <label htmlFor="list-view" className="-m-2 cursor-pointer p-2 text-gray-400 hover:text-gray-500 peer-checked:text-blue-500" onClick={() => setIsRowView(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-5 h-5" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z" />
                                <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z" />
                                <path fill-rule="evenodd" d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z" />
                            </svg>
                        </label>
                    </div>
                </div> : null}

            <div aria-labelledby="products-heading" className="pb-24">
                <h2 id="products-heading" className="sr-only">Products</h2>

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                    {!isSearchPage ?
                        <form className="hidden lg:block divide-y top-40">
                            {catData.data[1] ?
                                <>
                                    <div ></div>
                                    <Accordion.Root
                                        className=""
                                        type="single"
                                        defaultValue="item-1"
                                        collapsible>
                                        <AccordionItem className="py-2" value="item-1">
                                            <AccordionTrigger className="font-bold">Category</AccordionTrigger>
                                            {catData.data.map((item: any) => (
                                                <AccordionContent className="" >
                                                    <Accordion.Root
                                                        className="ml-2"
                                                        type="single"
                                                        collapsible>
                                                        <AccordionItem className="" value="item-1">
                                                            <AccordionTrigger className=" text-gray-600" >{item.name}</AccordionTrigger>
                                                            {item.children.map((child: any) => (
                                                                <AccordionContent className="" >
                                                                    <Accordion.Root
                                                                        className="ml-2"
                                                                        type="single"
                                                                        collapsible>
                                                                        <AccordionItem className="" value="item-1">
                                                                            <AccordionTrigger className="" >{child.name}</AccordionTrigger>
                                                                            {child.sections.map((sec_data: any) => (
                                                                                <AccordionContent className="ml-2" >
                                                                                    <a className="text-blue-500 block my-1" href={generatePath(item.name, child.slug, sec_data.name)}>
                                                                                        {sec_data.name}
                                                                                    </a>
                                                                                </AccordionContent>
                                                                            ))}
                                                                        </AccordionItem>
                                                                    </Accordion.Root>
                                                                </AccordionContent>
                                                            ))}
                                                        </AccordionItem>
                                                    </Accordion.Root>
                                                </AccordionContent>
                                            ))}
                                        </AccordionItem>
                                    </Accordion.Root>

                                    <Accordion.Root
                                        className=""
                                        type="single"
                                        defaultValue="item-1"
                                        collapsible>
                                        <AccordionItem className="py-2" value="item-1">
                                            <AccordionTrigger className="font-bold">Brands</AccordionTrigger>
                                            <AccordionContent className="" >
                                                {brandsData ?
                                                    brandsData.map((brand: any) => (
                                                        brand.featured === true ?
                                                            <BrandsButton selectedBrands={selectedBrands} brandName={brand.name} filterSet={filterSet} />
                                                            : null
                                                    ))
                                                    : null}
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion.Root>
                                </>
                                : null}

                            <Accordion.Root
                                className=""
                                type="single"
                                defaultValue="item-1"
                                collapsible
                            >
                                <AccordionItem className="py-2" value="item-1">
                                    <AccordionTrigger className="font-bold">Price</AccordionTrigger>

                                    <AccordionContent className="" >
                                        <div className="justify-between flex">
                                            <div>Range: AED 0 — AED {rangeSliderValue}</div>
                                            <button className=" bg-slate-200 hover:bg-slate-300 text-sm w-fit px-2 p-1 rounded-full">Filter</button>
                                        </div>

                                        <Slider.Root
                                            className="relative flex items-center select-none touch-none w-full h-5 mt-5"
                                            defaultValue={[0]}
                                            onValueChange={rangeSliderValueChange}
                                            value={rangeSliderValue}
                                            max={10000}
                                            step={100}
                                        >
                                            <Slider.Track className="bg-blackA10 relative grow rounded-full h-[3px]">
                                                <Slider.Range className="absolute bg-gray-400 rounded-full h-full" />
                                            </Slider.Track>
                                            <Slider.Thumb
                                                className="block w-5 h-5 bg-gray-700   rounded-[10px]  focus:outline-none  "
                                                aria-label="Volume"
                                            />
                                        </Slider.Root>

                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion.Root>
                        </form>
                        : null}
                    <div className={`${isSearchPage ? ' col-span-full' : "col-span-3"}`}>
                        <div className={`grid ${isRowView ? "!grid-cols-1 !gap-0" : ""} ${isSearchPage ? "xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 " : "  md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1"}  xs:grid-cols-2 grid-cols-1 sm:gap-3 gap-1`}>
                            {productsData.length > 0 ? productsData.map((pro_data: any) => (
                                productFilterApplied ?
                                    skeletonArray.map(sk =>
                                        sk
                                    ) :
                                    <SingleProductData pro_data={pro_data} isRowView={isRowView} />
                            ))
                                : <div className="w-full col-span-3">
                                    <h1 className="text-blue-500 text-center py-2">No Products Found</h1>
                                </div>
                            }
                        </div>
                        {showMoreProductsbtn && productsData.length > 0 ?
                            <div className='w-full flex justify-center mt-10'>
                                <button onClick={() => { loadMoreProducts() }} className='border-slate-300 flex items-center border  px-3 py-2  rounded-full hover:bg-[#39f] hover:text-white transition-all duration-300'>
                                    <div className='mx-3 text-sm  items-center'>More Products</div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={`w-4 h-4 ${animateSpin ? 'animate-spin' : ''}`}>
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                    </svg>
                                </button>
                            </div>
                            : null}
                    </div>

                </div>
            </div>
        </div >


    )
}

export default ProductsPageData