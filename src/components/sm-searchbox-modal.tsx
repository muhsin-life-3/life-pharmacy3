import ModalContainer from "./modal-container"
import { Dialog } from "@headlessui/react"
import { FC } from "react"
import { useLanguage } from "@/hooks/useLanguage"
import Image from "next/image"
interface SmSearchBoxModalProps {
    showModal: any,
    setCloseModal: any,
    isArabic: boolean,
    queryData: string,
    setQueryData: any,
    searchButtonOnMouseEnter: any,
    SearchLoadingState: boolean,
    searchClosebtn: boolean,
    searchData: any,
    searchBoxClear: any,
    searchSuggestions:any,
}

export const SmSearchBoxModal: FC<SmSearchBoxModalProps> = ({ searchClosebtn, showModal, setCloseModal, isArabic, queryData, setQueryData, searchButtonOnMouseEnter, SearchLoadingState, searchData, searchBoxClear, searchSuggestions }) => {
    const { t } = useLanguage();

    return (
        <ModalContainer showModal={showModal} setCloseModal={setCloseModal}>
            <Dialog.Panel className="w-full fixed inset-0 transform overflow-hidden bg-white text-left align-middle shadow-xl transition-all">
                <div className="relative  w-full scale-100 transform opacity-100 transition-all ">
                    <div className="relative bg-white w-full  p-2 px-3">
                        <div className="flex w-full py-2 ">
                            <button type="button"
                                className="mr-3 text-gray-800 bg-transparent rounded-lg text-sm" onClick={() => { setCloseModal(false) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="flex-1 overflow-hidden rounded-sm  px-1"
                            >
                                <div className="relative">

                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={` fill-slate-400 pointer-events-none absolute ${isArabic ? 'right-4 ' : 'left-4'} top-1 w-4 h-6`}>
                                        <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clip-rule="evenodd" />
                                    </svg>

                                    <input type="text" id="sm-searchbox" value={queryData} onChange={(e) => { setQueryData(e.target.value) }} ref={input => input && input.focus()}
                                        className={`placeholder:text-sm border-none bg-gray-100 rounded-full  block w-full  focus:ring-0  py-[5px]    text-slate-900 placeholder:text-slate-500 sm:text-sm sm:leading-6   ${isArabic ? 'pr-12 text-right pl-16' : 'pl-10 text-left pr-16'}`}
                                        placeholder={t.navbar.searchbox_text} onKeyDown={(e) => { searchButtonOnMouseEnter((e.target as HTMLInputElement).value, e.key, true) }} />

                                    {SearchLoadingState ?
                                        <svg fill="none" className={`animate-spin absolute inline ${isArabic ? "left-8" : "right-8"}  inset-y-0 m-auto w-4 h-4 mx-2`} stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" shape-rendering="geometricPrecision" viewBox="0 0 24 24" height="24" width="24" ><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg> : ""}

                                    {searchClosebtn ? <button onClick={() => { searchBoxClear() }} type="button"
                                        className={`text-gray-800    text-center   rounded-lg text-sm   absolute top-[5px] ${isArabic ? 'left-2' : "right-2"} `}
                                    >

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" className="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button> : ""}
                                </div>
                            </div>
                        </div>


                        <div className="pt-6 px-4 lg-screen-searchsuggestion-sm scale-100 absolute top-15 right-0 left-0 bg-white overflow-auto rounded-t-0 rounded-b-md">
                            {searchData.results[1] ?
                                <>
                                    <div className="mb-5 group-search">
                                        {searchData.results[1]?.hits[0] ?
                                            <>
                                                <h5 className="text-sky-500 text-xs ">SUGGESTIONS</h5>
                                                <div className="flex my-2 flex-wrap text-[13px] text-gray-700 group-search">
                                                    {searchData.results[1].hits.slice(0, 10).map((sug_data:any) => (
                                                        <div onClick={() => {
                                                            searchSuggestions(sug_data.query, true, "search")

                                                        }} className=" rounded-xl bg-gray-200 hover:bg-gray-300  py-1 px-3 mb-2 mr-2">{sug_data.query}</div>
                                                    ))}
                                                </div></>

                                            : ""}
                                    </div>
                                    <div className="text-gray-600 text-xs group-search">
                                        <h5 className="text-sky-500 text-xs">PRODUCTS</h5>
                                        {searchData.results[0].hits[0] ? searchData.results[0].hits.map((pro_data:any) => (
                                            <div onClick={() => {
                                                searchSuggestions(pro_data.slug, true, "products")

                                            }} className="sugg-pro group-search">
                                                <Image src={pro_data.images.featured_image} height={40} width={40} alt={pro_data.title}></Image>
                                                <p className="mx-3 my-auto">{pro_data.title} </p>
                                            </div>
                                        )) : <div className="py-12 text-center"><i>No Products Found</i></div>}
                                    </div>
                                </> : <div role="status" className="max-w-full animate-pulse">
                                    <div className="group-search mb-5">
                                        <h5 className="text-xs text-sky-500">SUGGESTIONS</h5>
                                        <div className="group-search my-2 flex flex-wrap text-[13px] text-gray-700">
                                            <span className="sr-only">Loading...</span>
                                            <div className="loading-style"></div>
                                            <div className="loading-style"></div>
                                            <div className="loading-style"></div>
                                            <div className="loading-style"></div>
                                            <div className="loading-style"></div>
                                            <div className="loading-style"></div>
                                        </div>
                                        <div className="group-search text-xs text-gray-600">
                                            <h5 className="mb-3 text-xs text-sky-500">PRODUCTS</h5>

                                            <div role="status" className="mb-3 flex">
                                                <div className="loading-img"></div>
                                                <div className="h-10 w-full mx-4">
                                                    <div className="mb-2 h-3 w-full bg-gray-200 "></div>
                                                    <div className="mb-4 h-5 w-3/4 bg-gray-200 "></div>
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
                                                    <div className="mb-2 h-3 w-full bg-gray-200 "></div>
                                                    <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                                                </div>
                                                <span className="sr-only">Loading...</span>
                                            </div>
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
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </Dialog.Panel>

        </ModalContainer>
    )
}

