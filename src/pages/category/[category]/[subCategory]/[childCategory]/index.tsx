import { ProductsPage } from "@/components/products-page"
import getCategoryData from "@/lib/getCategoryData"
import getProductsDataByCat from "@/lib/getProductsDataByCat"

const ChildCategory = ({ params, categoryData, filterPath, selectedBrands }: { params: any, categoryData: any, filterPath: any, selectedBrands: string }) => {
    return <ProductsPage filterPath={filterPath} isSearchPage={false} categoryData={categoryData} menuData={["Category", String(params.childCategory).replace(/-/g, ' ')]} selectedBrands={selectedBrands} />
}

export default ChildCategory

export async function getStaticProps({ locale, params }: { locale: any, params: any }) {
    const childCategory = params.childCategory
    let filterPath = `categories=${childCategory}`

    const categoryData = await getProductsDataByCat(filterPath, 0, false, locale);

    return {
        props: {
            categoryData: categoryData.data,
            filterPath,
            params,
            selectedBrands: ""
        },
    };
}

export async function getStaticPaths() {

    return {
        paths: [],
        fallback: "blocking"
    };
}