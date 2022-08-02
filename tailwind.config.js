module.exports = {
  purge: ['./src/**/*.html', './src/**/*.tsx', './src/**/*.ts'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        1: '1px',
        2: '2px',
        3: '3px',
        4: '4px',
        5: '5px',
        6: '6px',
        7: '7px',
        8: '8px',
        9: '9px',
        10: '10px',
        11: '11px',
        12: '12px',
        13: '13px',
        14: '14px',
        15: '15px',
        16: '16px',
        17: '17px',
        18: '18px',
        19: '19px',
        20: '20px',
        21: '21px',
        22: '22px',
        23: '23px',
        24: '24px',
        25: '25px',
        26: '26px',
        27: '27px',
        28: '28px',
        29: '29px',
        30: '30px',
        31: '31px',
        32: '32px',
        34: '34px',
        36: '36px',
        38: '38px',
        40: '40px',
        44: '44px',
        48: '48px',
        52: '52px',
        56: '56px',
        60: '60px',
        100: '100px',
        140: '140px',
        160: '160px',
        180: '180px',
      },
    },
    fontSize: {
      xs: '12px',
      base: '14px',
      lg: '16px',
      xl: '18px',
      '2xl': '20px',
      '3xl': '22px',
      '4xl': '24px',
      '5xl': '26px',
      '6xl': '28px',
      '7xl': '30px',
    },
  },
  variants: {
    // 移除响应式版本 https://www.tailwindcss.cn/docs/optimizing-for-production#-7
    appearance: [],
    extend: {},
  },
  plugins: [],
};