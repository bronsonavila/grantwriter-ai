const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/assets/stylesheets/**/*.css',
    './app/javascript/**/*.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      },
      animation: {
        'fade-in-right': 'fade-in-right 0.5s ease-out',
        'fade-out-right': 'fade-out-right 0.5s ease-in',
        'fade-in-up': 'fade-in-up 0.3s ease-out',
        'fade-out-down': 'fade-out-down 0.3s ease-in',
        shake: 'shake 0.5s ease-in-out'
      },
      keyframes: {
        'fade-in-right': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        'fade-out-right': {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(20px)' }
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-out-down': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(10px)' }
        },
        shake: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%, 75%': { transform: 'rotate(-8deg)' },
          '50%': { transform: 'rotate(8deg)' }
        }
      }
    }
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.animation-forwards': {
          'animation-fill-mode': 'forwards'
        }
      })
    },
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries')
  ]
}
