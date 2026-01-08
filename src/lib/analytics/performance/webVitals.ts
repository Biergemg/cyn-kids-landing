import { onCLS, onINP, onLCP } from 'web-vitals';

declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
    }
}

export const reportWebVitals = () => {
    const sendToAnalytics = (metric: any) => {
        if (window.gtag) {
            window.gtag('event', metric.name, {
                value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
                event_category: 'Web Vitals',
                event_label: metric.id,
                non_interaction: true,
            });
        }
    };

    onCLS(sendToAnalytics);
    onINP(sendToAnalytics);
    onLCP(sendToAnalytics);
};
