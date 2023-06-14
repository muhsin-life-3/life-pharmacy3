export default async function getBrandProductData(brandName: string, catSlug:string) {

    const url = `https://prodapp.lifepharmacy.com/api/web/brands/details/${brandName}?${catSlug!=""?`category_slug=${catSlug}&`:""}new_method=true&lang=ae-en&take=40`
    console.log(url);
    
    const res = await fetch(url)

    if (!res.ok) throw new Error('failed to fetch data')

    return res.json()
}