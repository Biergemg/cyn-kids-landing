const AFFILIATE_PRODUCT_VALUE_MXN = 600.0;
const AFFILIATE_PRODUCT_CURRENCY = 'MXN';

declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
        fbq?: (...args: any[]) => void;
    }
}

export const trackAffiliateClick = (
    product: string,
    position: 'hero' | 'mid' | 'footer' | 'sticky_mobile',
    destination: string,
    scrollDepth?: number
) => {
    const value = AFFILIATE_PRODUCT_VALUE_MXN;
    const currency = AFFILIATE_PRODUCT_CURRENCY;

    if (window.gtag) {
        window.gtag('event', 'affiliate_checkout_click', {
            product,
            position,
            destination_domain: destination,
            scroll_depth_at_click: scrollDepth ?? window.scrollY
        });
    }

    if (window.fbq) {
        window.fbq('track', 'InitiateCheckout', {
            content_name: product,
            content_category: 'Affiliate',
            content_ids: ['smartbiotics-kids'],
            value,
            currency,
            status: position
        });
    }
};
