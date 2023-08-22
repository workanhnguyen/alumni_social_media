/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#1b73e8',
        primaryHover: '#0fb3fa',
        secondary: '#F0F0F0',
        blackOverlay: 'rgba(0, 0 ,0 ,0.7)',
        blackOverlay2: 'rgba(0, 0 ,0 ,0.3)',
        halfTransparent: 'rgba(0, 0, 0, 0.5)',
      },
      backgroundImage: {
        'cover-bg': "url('./assets/cover-bg.png')"
      },
      blur: {
        xs: '2px'
      },
      colors: {
        'half-transparent': 'rgb((0, 0, 0) / 0.5)',
        'primary': '#1b73e8',
        'gray': '#EFF2F5',
        'gray-2': '#dee1e3',
        'gray-3': '#f7f8fa',
        'gray-4': '#e3e6eb',
        'dark-gray': '#65676b',
        'red': '#d3302f'
      },
      width: {
        '128': '32rem',
        '150': '37.5rem',
        '235': '58.75rem',
        '33/100': '33%'
      },
      height: {
        '128': '32rem',
        '150': '37.5rem',
      }
    },
  },
  plugins: [],
}