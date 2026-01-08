export const initAnalytics = () => {
    // Web Vitals
    import('./performance/webVitals').then(({ reportWebVitals }) => {
        reportWebVitals();
    });
};
