/** @type {import('tailwindcss').Config} */
const { iconsPlugin, getIconCollections } = require('@egoist/tailwindcss-icons')
module.exports = {
  content: [
    "./www/**/*{.vue,.md,.js}",
    "./www/.vitepress/**/*{.vue,.md,.js}",
    'node_modules/vitepress-openapi/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      height: {
        
        25: '100px',
        185: '740px',
        200: '800px',
      },
      width: {
        25: '100px',
        185: '740px',
        200: '800px',
      },
      flex: {
        'freeze-auto': '0 0 auto',
        100: '1 1 100%',
        auto: '1 1 auto',
        '1/3': '1 1 33.33%',
        '2/3': '1 1 66.66%',
        '1/2': '1 1 50%',
        '2/5': '1 1 40%',
        '3/5': '1 1 60%',
        10: '1 1 10%',
        12: '1 1 12%',
        25: '1 1 25%',
        40: '1 1 40%',
      },
      padding: {
        4: '16px',
        5: '20px',
        7.5: '30px',
        10: '40px',
        15: '60px',
        18: '4.5rem',
        20: '5rem',
        30: '7.5rem',
        31: '7.75rem',
      },
      margin: {
        1: '4px',
        2: '8px',
        3: '12px',
        5: '20px',
        10: '40px',
        17.5: '70px',
        25: '100px',
        30: '120px'
      },
      spacing: {
        'full-vw': '100vw',
        'full-vh': '100vh',
        0.5: '2px',
        1.25: '5px',
        1.5: '6px',
        2: '8px',
        2.5: '0.625rem',
        3: '12px',
        3.5: '0.875rem',
        3.75: '0.9375rem',
        4: '16px',
        4.25: '1.0625rem',
        4.5: '1.125rem',
        5: '20px',
        5.5: '1.375rem',
        6: '1.5rem',
        6.5: '1.625rem',
        7: '1.75rem',
        7.5: '1.875rem',
        8: '2rem',
        8.5: '2.125rem',
        9: '2.25rem',
        9.5: '2.375rem',
        10: '2.5rem',
        11: '2.75rem',
        12.5: '3.125rem',
        13: '3.25rem',
        13.5: '3.375rem',
        14: '3.5rem',
        14.25: '3.5625rem',
        15: '60px',
        17: '68px',
        17.5: '4.375rem',
        18: '4.5rem',
        21.5: '5.375rem',
        22.5: '5.625rem',
        25: '6.25rem',
        26: '6.5rem',
        26.25: '6.5625rem',
        28: '7rem',
        29.5: '7.375rem',
        30: '7.5rem',
        30.5: '7.625rem',
        33.25: '8.3125rem',
        34: '8.5rem',
        35: '8.75rem',
        36.5: '9.125rem',
        37: '9.25rem',
        40: '160px',
        42.5: '170px',
        45: '11.25rem',
        45.75: '11.4375rem',
        47: '11.75rem',
        49.25: '12.3125rem',
        50: '200px',
        51: '204px',
        51.5: '12.875rem',
        51.75: '12.9375rem',
        54.25: '13.5625rem',
        55: '220px',
        59: '14.75rem',
        60: '240px',
        61.25: '15.3125rem',
        62.5: '15.625rem',
        65: '16.25rem',
        68: '17rem',
        70: '17.5rem',
        72.5: '18.125rem',
        73.5: '18.375rem',
        75: '18.75rem',
        78.25: '19.5625rem',
        80: '20rem',
        85: '21.25rem',
        87.5: '21.875rem',
        88: '22rem',
        90: '22.5rem',
        93.5: '23.375rem',
        95: '23.75rem',
        100: '25rem',
        110: '27.5rem',
        115: '28.75rem',
        119.25: '29.8125rem',
        125: '31.25rem',
        130: '32.5rem',
        132.5: '33.125rem',
        135: '33.75rem',
        140: '35rem',
        145: '36.25rem',
        147.5: '36.875rem',
        150: '37.5rem',
        155: '38.75rem',
        165: '41.25rem',
        175: '43.75rem',
        185: '46.25rem',
        202.5: '50.625rem',
        205: '51.25rem',
        212: '53rem',
        215: '53.75rem',
        218.5: '54.625rem',
        225: '56.25rem',
        250: '62.5rem',
        260: '65rem',
        300: '75rem',
        480: '120rem'
      },
      inset: {
        0: 0,
        0.15: '15%',
        0.28: '28%',
        0.36: '36%',
        0.46: '46%',
        0.86: '86%',
        0.9: '90%',
        1: '0.25rem',
        1.5: '0.375rem',
        1.75: '0.4375rem',
        auto: 'auto',
        '1/2': '50%',
        4: '1rem',
        20: '5rem',
        34: '8.5rem',
        47.5: '11.875rem',
        51.75: '12.9375rem',
        59: '14.75rem',
        73.75: '18.4375rem',
      },
      fontSize: {
        3: '12px',
        3.5: '14px',
        4: '16px',
        5: '20px',
        6: '24px',
        6.5: '26px',
        7: '28px',
        7.5: '30px',
        8: '32px',
        10: '40px',
        11: '44px',
        12: '48px',
        15: '60px',
        17.5: '70px',
        20: '80px',
        30: '120px',
        40: '160px',
      },
      maxWidth: {
        9.5: '2.375rem',
        40: '10rem',
        75: '18.75rem',
        120: '30rem'
      },
      minWidth: {
        65: '16.25rem',
        75: '18.75rem',
        320: '80rem',
      },
      minHeight: {
        'full-vh': '100vh',
        10: '2.5rem',
        17.5: '70px',
      },
      colors: {
        text: {
          1: 'var(--vp-c-text-1)', 
          2: 'var(--vp-c-text-2)',
          3: 'var(--vp-c-text-3)',
        },
        bg: {
          bg: 'var(--vp-c-bg-bg)', // #ffffff; 
          alt: 'var(--vp-c-bg-alt)', // #f6f6f7;
          elv: 'var(--vp-c-bg-elv)',  // #ffffff;
          soft: 'var(--vp-c-bg-soft)', // #f6f6f7;
        },
        vp: {
          white: 'var(--vp-c-white)', // #ffffff;
          black: 'var(--vp-c-black)', // #000000;
          gray1: 'var(--vp-c-gray-1)', // #dddde3;
          gray2: 'var(--vp-c-gray-2)', // #e4e4e9;
          gray3: 'var(--vp-c-gray-3)', // #ebebef;
          gray_soft: 'var(--vp-c-gray-soft)', // rgba(142, 150, 170, 0.14);
          indigo1: 'var(--vp-c-indigo-1)', // #3451b2;
          indigo2: 'var(--vp-c-indigo-2)', // #3a5ccc;
          indigo3: 'var(--vp-c-indigo-3)', // #5672cd;
          indigo_soft: 'var(--vp-c-indigo-soft)', // rgba(100, 108, 255, 0.14);
          purple1: 'var(--vp-c-purple-1)', // #6f42c1;
          purple2: 'var(--vp-c-purple-2)', //  #7e4cc9;
          purple3: 'var(--vp-c-purple-3)', // #8e5cd9;
          purple_soft: 'var(--vp-c-purple-soft)', // rgba(159, 122, 234, 0.14);
          green1: 'var(--vp-c-green-1)', // #18794e;
          green2: 'var(--vp-c-green-2)', // #299764;
          green3: 'var(--vp-c-green-3)', // #30a46c;
          gree_soft: 'var(--vp-c-green-soft)', // rgba(16, 185, 129, 0.14);
          yellow1: 'var(--vp-c-yellow-3)', // #915930;
          yellow2: 'var(--vp-c-yellow-2)', // #946300;
          yellow3: 'var(--vp-c-yellow-3)', // #9f6a00;
          yellow_soft: 'var(--vp-c-yellow-soft)', // rgba(234, 179, 8, 0.14);
          red1: 'var(--vp-c-red-1)', // #b8272c;
          red2: 'var(--vp-c-red-2)', // #d5393e;
          red3: 'var(--vp-c-red-3)', // #e0575b;
          red_soft: 'var(--vp-c-red-soft)', // rgba(244, 63, 94, 0.14);
          sponsor: 'var(--vp-c-sponsor)', // #db2777
        }
      },
      borderRadius: {
        1: '4px',
        1.5: '6px',
        2: '8px',
        2.5: '10px',
        3.75: '15px',
        5: '20px',
        6.25: '25px',
        7.5: '30px',
      },
      opacity: {
        10: '0.1',
        30: '0.3',
        60: '0.6',
        80: '0.8',
      },
      lineHeight: {
        pagination: '2.4',
        3.5: '0.875rem',
        4.5: '1.125rem',
        6.5: '1.625rem',
        7.5: '1.875rem',
        9: '2.25rem',
        12.5: '3.125rem',
        11.25: '2.8125rem',
        42.5: '10.625rem',
      },
      boxShadow: {
        input: '0px 0px 30px 0px rgba(36, 115, 255, 0.08)',
        'blue-top': '0px 4px 40px 0px rgba(43, 89, 255, 0.08)',
        'video-box': '0px 2px 4px 0px rgba(0, 0, 0, 0.1)',
        'green-sh': '0px 15px 40px 0px rgba(29, 42, 100, 0.05), 0px 5px 10px 0px rgba(37, 202, 160, 0.2)',
        'blue-sh': '0px 5px 10px 0px rgba(32, 152, 255, 0.2)',
        'orange-sh': '0px 5px 10px 0px rgba(255, 152, 40, 0.2);',
        'price-sh': '0px 15px 40px 0px rgba(29, 42, 100, 0.05);',
      },
      letterSpacing: {
        0.25: '0.0625rem',
        1.625: '0.40625rem',
      },
      zIndex: {
        9: '9'
      }
    },
  },
  plugins: [
    iconsPlugin({
      // Select the icon collections you want to use
      // You can also ignore this option to automatically discover all icon collections you have installed
      collections: getIconCollections(['mdi']),
    }),
  ],
};
