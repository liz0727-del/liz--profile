/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                paper: '#F2F2F2',
                ink: '#1C1C1C',
                grid: 'rgba(0, 0, 0, 0.1)',
            },
            fontFamily: {
                mono: ['"Geist Mono"', '"Roboto Mono"', 'monospace'],
                dot: ['"DotGothic16"', 'monospace'],
                ndot: ['"Ndot"', '"Noto Sans SC"', '"DotGothic16"', 'monospace'],
            },
        },
    },
    plugins: [],
}
