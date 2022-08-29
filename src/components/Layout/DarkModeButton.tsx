import React from 'react';
import useDarkMode from 'use-dark-mode';
import Sun from '@mui/icons-material/WbSunnyRounded';
import Moon from '@mui/icons-material/ModeNightRounded';
import IconButton from '@mui/material/IconButton';

export default function DarkModeButton() {
  const darkMode = useDarkMode(false);

  return (
    <IconButton type="button" onClick={darkMode.toggle}>
      {darkMode.value ? (
        <Sun style={{ color: '#ff9800' }} />
      ) : (
        <Moon style={{ color: '#ffb74d' }} />
      )}
    </IconButton>
  );
}
