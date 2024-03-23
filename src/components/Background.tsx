import { Box } from '@suid/material';
import color from 'color';
import { ParentComponent } from 'solid-js';

const primary = color('#ff00ff').darken(0.5).desaturate(0.3);
const dark = color('#8a2be2').darken(0.7).desaturate(0.3);
const fd = (fibNumber: number) => fibNumber / 34;
const fp = (fibNumber: number) => fd(fibNumber * 100).toString() + '%';
const offset = 1.4;

export const Background: ParentComponent = (props) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundImage: `radial-gradient(
    circle at top left, 
    ${primary} ${fp(0)},
    ${primary.mix(dark, fd(1) * offset)} ${fp(1)},
    ${primary.mix(dark, fd(2) * offset)} ${fp(2)},
    ${primary.mix(dark, fd(3) * offset)} ${fp(3)},
    ${primary.mix(dark, fd(5) * offset)} ${fp(5)},
    ${primary.mix(dark, fd(8) * offset)} ${fp(8)},
    ${primary.mix(dark, fd(13) * offset)} ${fp(13)},
    ${primary.mix(dark, fd(21) * offset)} ${fp(21)},
    ${dark} ${fp(34)})`,
    }}
  >
    {props.children}
  </Box>
);
