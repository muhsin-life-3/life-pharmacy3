import Link from "next/link";

const BreadCrumb = ({ menuData }: { menuData: any }) => {

    function generatedUrl(indx: number) {
        let generatedUrl = "/"
        menuData.slice(0, indx + 1).map((itemName: string) => {
            generatedUrl += slugify(itemName) + "/"
        }
        )
        return generatedUrl
    }

    function slugify(text: string) {
        return text.toLowerCase().replace(/[\/\s&]+/g, '-');
    }

    return (
        <nav className="flex px-5 sm:py-3 py-1 mb-5 text-gray-700   border-muted border-b" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 ">
                <li className="inline-flex items-center">
                    <a href={`/`} className="inline-flex items-center sm:text-sm text-[10px] font-medium text-gray-700 hover:text-blue-600 ">
                        Home
                    </a>
                </li>
                {menuData.map((item: any, indx: number) => (
                    indx !== 0 ?
                        <li>
                            <div className="flex items-center">
                                <svg aria-hidden="true" className="w-5 h-5 text-slate-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                <Link href={generatedUrl(indx)} className={`ml-1 font-medium sm:text-sm text-[10px] text-gray-700 hover:text-blue-600 md:ml-2 capitalize`}  >{item}</Link>
                            </div>
                        </li>
                        : null
                ))}

            </ol>
        </nav>
    )
}

export default BreadCrumb