import { onCLS, onINP, onLCP } from 'web-vitals';

export const reportWebVitals = () => {
    onCLS(console.log);
    onINP(console.log);
    onLCP(console.log);
};
