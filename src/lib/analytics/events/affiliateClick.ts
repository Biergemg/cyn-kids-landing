export const trackAffiliateClick = (
    product: string,
    position: 'hero' | 'mid' | 'footer',
    destination: string,
    scrollDepth?: number
) => {
    // 1. Google Analytics Tracking
    // @ts-ignore
    if (window.gtag) {
        // @ts-ignore
        window.gtag('event', 'affiliate_checkout_click', {
            product,
            position,
            destination_domain: destination,
            scroll_depth_at_click: scrollDepth || window.scrollY
        })
    }

    // 2. Facebook Pixel Tracking (Conversion)
    // @ts-ignore
    if (window.fbq) {
        // @ts-ignore
        window.fbq('track', 'InitiateCheckout', {
            content_name: product,        // 'microbiota-mix'
            content_category: 'Affiliate',
            content_ids: ['smartbiotics-kids'],
            value: 600.00,                // Valor estimado del producto en MXN
            currency: 'MXN',              // Moneda
            status: position              // 'hero', 'mid', 'footer'
        });
    }
}
