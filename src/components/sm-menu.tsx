import Link from "next/link"
import { useRouter } from "next/router"

const SmMenu = ({ setSmScreenSearchBox, searchButtonOnClick }: { setSmScreenSearchBox: any, searchButtonOnClick: any }) => {
    const router = useRouter()
    const redirect = (url: string) => {
        router.push(url)
    }
    return (
        <div className="fixed bottom-0 left-0 right-0 md:hidden border-t border-gray-300   backdrop-blur-sm bg-opacity-95 bg-slate-100 sm:h-14 h-12 py-1 items-center z-30">
            <div className="flex justify-between sm:px-8 px-6">
                <div>
                    <input defaultChecked={true} id="homeSmMenu" type="radio" className="hidden peer" name="smMenu" />
                    <label htmlFor="homeSmMenu" onClick={() => redirect("/")} className="peer-checked:text-blue-500 text-gray-500 ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="sm:w-10 sm:h-9 w-6 h-6 mx-auto  my-auto ">
                            <path fill-rule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clip-rule="evenodd" />
                        </svg>
                        <p className="sm:text-xs text-center text-[10px]">Home</p>
                    </label>
                </div>
                <div>
                    <input id="categorySmMenu" type="radio" className="hidden peer" name="smMenu" />
                    <label htmlFor="categorySmMenu" className="peer-checked:text-blue-500 text-gray-500 " onClick={() => redirect("/category-menu/beauty-care")} >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="sm:w-8 sm:h-8 w-6 h-6 mx-auto   my-auto ">
                            <path d="M5.127 3.502L5.25 3.5h9.5c.041 0 .082 0 .123.002A2.251 2.251 0 0012.75 2h-5.5a2.25 2.25 0 00-2.123 1.502zM1 10.25A2.25 2.25 0 013.25 8h13.5A2.25 2.25 0 0119 10.25v5.5A2.25 2.25 0 0116.75 18H3.25A2.25 2.25 0 011 15.75v-5.5zM3.25 6.5c-.04 0-.082 0-.123.002A2.25 2.25 0 015.25 5h9.5c.98 0 1.814.627 2.123 1.502a3.819 3.819 0 00-.123-.002H3.25z" />
                        </svg>
                        <p className="sm:text-xs text-[10px]">Category</p>
                    </label>
                </div>
                <div>
                    <label className="active:text-blue-500 text-gray-500 " onClick={() => {
                        setSmScreenSearchBox(true)
                        searchButtonOnClick(false)
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mx-auto sm:w-10 sm:h-9 w-6 h-6  my-auto ">
                            <path d="M6.5 9a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z" />
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 5a4 4 0 102.248 7.309l1.472 1.471a.75.75 0 101.06-1.06l-1.471-1.472A4 4 0 009 5z" clip-rule="evenodd" />
                        </svg>
                        <p className="sm:text-xs text-[10px]">Search</p>
                    </label>
                </div>
                <div>
                    <input id="accountSmMenu" type="radio" className="hidden peer" name="smMenu" />
                    <label htmlFor="accountSmMenu" className="peer-checked:text-blue-500 text-gray-500 " onClick={() => redirect("/dashboard")}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mx-auto sm:w-10 sm:h-9 w-6 h-6  my-auto ">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z" clip-rule="evenodd" />
                        </svg>
                        <p className="sm:text-xs text-[10px]">Account</p>
                    </label>
                </div>
                <div>
                    <input id="cartSmMenu" type="radio" className="hidden peer" name="smMenu" />
                    <label htmlFor="cartSmMenu" className="peer-checked:text-blue-500 text-gray-500 " onClick={() => redirect("/cart")}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mx-auto sm:w-10 sm:h-9 w-6 h-6  my-auto ">
                            <path fill-rule="evenodd" d="M6 5v1H4.667a1.75 1.75 0 00-1.743 1.598l-.826 9.5A1.75 1.75 0 003.84 19H16.16a1.75 1.75 0 001.743-1.902l-.826-9.5A1.75 1.75 0 0015.333 6H14V5a4 4 0 00-8 0zm4-2.5A2.5 2.5 0 007.5 5v1h5V5A2.5 2.5 0 0010 2.5zM7.5 10a2.5 2.5 0 005 0V8.75a.75.75 0 011.5 0V10a4 4 0 01-8 0V8.75a.75.75 0 011.5 0V10z" clip-rule="evenodd" />
                        </svg>
                        <p className="sm:text-xs text-[10px] text-center">Cart</p>
                    </label>
                </div>
            </div>
        </div>

    )
}

export default SmMenu