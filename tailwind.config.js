/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'blue-primary': '#005EAE',
                'blue-secondary': '#0024A9',
                'blue-background': '#000C37',
                'white-primary': '#F7F7F7',
            },
        },
    },
    plugins: [],
};
