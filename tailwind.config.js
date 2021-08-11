module.exports = {
  // Uncomment the line below to enable the experimental Just-in-Time ("JIT") mode.
  // https://tailwindcss.com/docs/just-in-time-mode
  // mode: "jit",
  darkMode: 'media',
  theme: {
    extend: {
      transitionTimingFunction: {
        'bounce-out': 'cubic-bezier(.75,1.18,.66,1.14)',
      },
      keyframes: {
        'slide-down': {
          '0%': { transform: 'translateY(-0.5rem)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-down':
          'slide-down 150ms cubic-bezier(.75,1.18,.66,1.14) forwards',
      },
    },
    fontFamily: {
      sans: ['Ubuntu', 'Sans-serif'],
    },
  },

  variants: {},
  plugins: [],
  purge: {
    // Filenames to scan for classes
    content: [
      './src/**/*.html',
      './src/**/*.js',
      './src/**/*.jsx',
      './src/**/*.ts',
      './src/**/*.tsx',
      './public/index.html',
    ],
    // Options passed to PurgeCSS
    options: {
      // Whitelist specific selectors by name
      // safelist: [],
    },
  },
};
