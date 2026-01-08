export const trackAffiliateClick = (
    product: string,
    position: 'hero' | 'mid' | 'footer',
    destination: string,
    scrollDepth?: number
) => {
    // @ts-ignore
    if (!window.gtag) return
    // @ts-ignore
    window.gtag('event', 'affiliate_checkout_click', {
        product,
        position,
        destination_domain: destination,
        scroll_depth_at_click: scrollDepth || window.scrollY
    })
}
