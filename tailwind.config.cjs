/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                primary: '#2F3E46',   // Azul grisáceo (Rigor/Funcional)
                secondary: '#52796F', // Verde salvia (Humanidad/Equilibrio)
                background: '#FAFAF9',// Blanco cálido
                'text-primary': '#1F2933',
                'text-secondary': '#6B7280',
                divider: '#52796F',   // Verde salvia suave
                'cta-hover': '#1F2A30'
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-out forwards',
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        },
    },
    plugins: [],
}
