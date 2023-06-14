import getProductsData from "@/lib/getProductsData";
import ProductsSlider from "./products-slider";
import useSWR from 'swr';
import { fetcher } from "@/lib/getProductsDataSWR";
import { ProductsSkeleton } from "./productsSkeleton";

const productSk = Array(6).fill(<ProductsSkeleton />)

const Products = ({ lang, slug, type_key }: {
    lang: string;
    slug: string;
    type_key: string;
}) => {

    switch (type_key) {
        case "collection":
            type_key = "collections"
            break

        case "category":
            type_key = "categories"
            break

        case "brand":
            type_key = "brands"
            break
    }

    const url = `https://prodapp.lifepharmacy.com/api/web/products?${type_key}=${slug}&order_by=popularity&type=cols&skip=0&take=7&new_method=true&lang=${lang}`
    const { data, error, isLoading } = useSWR(url, fetcher)

    return (
        data ?
            <ProductsSlider proData={data.data.products} /> :
            <div className="flex overflow-x-auto no-scrollbar">
                {productSk}
            </div>
    )
}

export default Products