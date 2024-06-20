import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'transparency',
        color: '#f8f9fb',
      },
      a: {
        color: '#a4g5',
        _hover: {
        },
      },
      h1: {
        color: '#f8f9fb',
      },
      h2: {
        color: '#f8f9fb',
      },
      p: {
        color: '#f8f9fb',
      },
    },
  },
});

export default theme;
