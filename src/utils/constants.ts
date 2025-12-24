


export const THEMES = {
  light: {
    background: '#faf8ef',
    gridBackground: '#bbada0',
    gridEmptyCell: '#cdc1b4',
    textDark: '#776e65',
    textLight: '#f9f6f2',
    menuBackground: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
    panelBackground: 'rgba(255, 255, 255, 0.25)',
  },
  dark: {
    background: '#1a1a1a',
    gridBackground: '#333333',
    gridEmptyCell: '#404040',
    textDark: '#e0e0e0',
    textLight: '#ffffff',
    menuBackground: 'linear-gradient(-45deg, #121212, #2c3e50, #000000, #1a1a1a)',
    panelBackground: 'rgba(0, 0, 0, 0.4)',
  },
  cyber: {
    background: '#0a0a12',
    gridBackground: '#161b33',
    gridEmptyCell: '#1b2244',
    textDark: '#00f2ff',
    textLight: '#ffffff',
    menuBackground: 'linear-gradient(-45deg, #000428, #004e92, #00f2ff, #7000ff)',
    panelBackground: 'rgba(10, 10, 30, 0.6)',
  },
  nature: {
    background: '#f1f8e9',
    gridBackground: '#aed581',
    gridEmptyCell: '#c5e1a5',
    textDark: '#33691e',
    textLight: '#ffffff',
    menuBackground: 'linear-gradient(-45deg, #2e7d32, #689f38, #9ccc65, #dce775)',
    panelBackground: 'rgba(255, 255, 255, 0.3)',
  }
};

export type ThemeType = keyof typeof THEMES;

export const TILE_SKINS: Record<ThemeType, Record<number, { bg: string; color: string }>> = {
  light: {
    2: { bg: '#eee4da', color: '#776e65' },
    4: { bg: '#ede0c8', color: '#776e65' },
    8: { bg: '#f2b179', color: '#f9f6f2' },
    16: { bg: '#f59563', color: '#f9f6f2' },
    32: { bg: '#f67c5f', color: '#f9f6f2' },
    64: { bg: '#f65e3b', color: '#f9f6f2' },
    128: { bg: '#edcf72', color: '#f9f6f2' },
    256: { bg: '#edcc61', color: '#f9f6f2' },
    512: { bg: '#edc850', color: '#f9f6f2' },
    1024: { bg: '#edc53f', color: '#f9f6f2' },
    2048: { bg: 'linear-gradient(135deg, #8EC5FC 0%, #E0C3FC 100%)', color: '#f9f6f2' },
  },
  dark: {
    2: { bg: '#424242', color: '#e0e0e0' },
    4: { bg: '#616161', color: '#e0e0e0' },
    8: { bg: '#ef6c00', color: '#ffffff' },
    16: { bg: '#d84315', color: '#ffffff' },
    32: { bg: '#c62828', color: '#ffffff' },
    64: { bg: '#ad1457', color: '#ffffff' },
    128: { bg: '#6a1b9a', color: '#ffffff' },
    256: { bg: '#4527a0', color: '#ffffff' },
    512: { bg: '#283593', color: '#ffffff' },
    1024: { bg: '#1565c0', color: '#ffffff' },
    2048: { bg: 'linear-gradient(135deg, #000000 0%, #434343 100%)', color: '#ffffff' },
  },
  cyber: {
    2: { bg: '#1b2244', color: '#00f2ff' },
    4: { bg: '#2a3166', color: '#00f2ff' },
    8: { bg: '#3949ab', color: '#ffffff' },
    16: { bg: '#5e35b1', color: '#ffffff' },
    32: { bg: '#8e24aa', color: '#ffffff' },
    64: { bg: '#d81b60', color: '#ffffff' },
    128: { bg: '#e53935', color: '#ffffff' },
    256: { bg: '#fb8c00', color: '#ffffff' },
    512: { bg: '#fdd835', color: '#1a1a1a' },
    1024: { bg: '#7cb342', color: '#ffffff' },
    2048: { bg: 'linear-gradient(135deg, #00f2ff 0%, #7000ff 100%)', color: '#ffffff' },
  },
  nature: {
    2: { bg: '#e8f5e9', color: '#2e7d32' },
    4: { bg: '#c8e6c9', color: '#2e7d32' },
    8: { bg: '#a5d6a7', color: '#1b5e20' },
    16: { bg: '#81c784', color: '#ffffff' },
    32: { bg: '#66bb6a', color: '#ffffff' },
    64: { bg: '#4caf50', color: '#ffffff' },
    128: { bg: '#43a047', color: '#ffffff' },
    256: { bg: '#388e3c', color: '#ffffff' },
    512: { bg: '#2e7d32', color: '#ffffff' },
    1024: { bg: '#1b5e20', color: '#ffffff' },
    2048: { bg: 'linear-gradient(135deg, #558b2f 0%, #9e9d24 100%)', color: '#ffffff' },
  }
};

export const getTileStyle = (value: number, theme: ThemeType = 'light') => {
  const skin = TILE_SKINS[theme];
  const style = skin[value] || (value > 2048 ? skin[2048] : skin[2]);
  return style;
};
