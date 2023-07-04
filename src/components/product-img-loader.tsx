import React from "react"
import ContentLoader from "react-content-loader"

const ProductImgLoader = () => (
    <ContentLoader
        speed={2}
        width={230}
        height={230}
        viewBox="0 0 230 230"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"

    >
        <rect x="0" y="0" rx="9" ry="9" width="240" height="240" />
    </ContentLoader>
)

export default ProductImgLoader
