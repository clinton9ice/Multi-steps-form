/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: ["./index.html","./src/**/*.{vue,ts,html,js}"],
    theme: {
        fontFamily:{
            ubuntu: ['ubuntu',"Verdana", "Geneva", "Tahoma", "sans-serif"],
            ubuntuMedium: ['ubuntu-medium',"Verdana", "Geneva", "Tahoma", "sans-serif"],
        },
        extend: {
            colors: {
                primary: {
                    'marine-blue': "hsl(213, 96%, 18%)",
                    "purplish-blue": "hsl(243, 100%, 62%)",
                    "pastel-blue": "hsl(228, 100%, 84%)",
                    "light-blue": "hsl(206, 94%, 87%)",
                    "strawberry-red": "hsl(354, 84%, 57%)"
                },
                neutral:{
                    coolGray: "hsl(231, 11%, 63%)",
                    lightGray: "hsl(229, 24%, 87%)",
                    magnolia: "hsl(217, 100%, 97%)",
                    alabaster: "hsl(231, 100%, 99%)",
                }
            }
        },
    },
    plugins: [],
}

