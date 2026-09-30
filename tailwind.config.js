/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "'SF Pro Display'",
          "'SF Pro Text'",
          "'Helvetica Neue'",
          "system-ui",
          "sans-serif"
        ],
      },
      colors: {
        ios: {
          blue: "#007AFF",
          cyan: "#32ADE6",
          indigo: "#5856D6",
          purple: "#AF52DE",
          pink: "#FF2D55",
          red: "#FF3B30",
          orange: "#FF9500",
          yellow: "#FFCC00",
          green: "#34C759",
          mint: "#00C7BE",
          teal: "#30B0C7",
        }
      },
      animation: {
        'liquid-pulse': 'liquidPulse 6s ease-in-out infinite alternate',
        'orb-float-1': 'floatOrb1 18s ease-in-out infinite alternate',
        'orb-float-2': 'floatOrb2 22s ease-in-out infinite alternate',
        'orb-float-3': 'floatOrb3 20s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        liquidPulse: {
          '0%': { transform: 'scale(1) rotate(0deg)', opacity: '0.75' },
          '50%': { transform: 'scale(1.08) rotate(3deg)', opacity: '0.9' },
          '100%': { transform: 'scale(0.95) rotate(-3deg)', opacity: '0.75' },
        },
        floatOrb1: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(60px, -40px) scale(1.15)' },
          '100%': { transform: 'translate(-40px, 50px) scale(0.95)' },
        },
        floatOrb2: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(-70px, 40px) scale(1.1)' },
          '100%': { transform: 'translate(50px, -60px) scale(0.9)' },
        },
        floatOrb3: {
          '0%': { transform: 'translate(0px, 0px) scale(1.05)' },
          '50%': { transform: 'translate(40px, 60px) scale(0.9)' },
          '100%': { transform: 'translate(-50px, -40px) scale(1.12)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
