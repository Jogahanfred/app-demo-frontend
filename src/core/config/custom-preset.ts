// mypreset.ts
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const customPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#e6f0f4',
      100: '#c0dae3',
      200: '#99c4d2',
      300: '#73aebf',
      400: '#4d98ad',
      500: '#003553', // color central
      600: '#002d48',
      700: '#00253b',
      800: '#001c2e',
      900: '#001421',
      950: '#000b14',
    },
    
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '{zinc.50}',
          100: '{zinc.100}',
          200: '{zinc.200}',
          300: '{zinc.300}',
          400: '{zinc.400}',
          500: '{zinc.500}',
          600: '{zinc.600}',
          700: '{zinc.700}',
          800: '{zinc.800}',
          900: '{zinc.900}',
          950: '{zinc.950}',
        },
        semantic: {
          highlight: {
            background: '{primary.50}',
            color: '{primary.700}',
          },
          formField: {
            hoverBorderColor: '{primary.300}',
          },
        },
        focusRing: {
          width: '2px',
          style: 'dashed',
          color: '{primary.300}',
          offset: '1px',
        },
      },
      dark: {
        surface: {
          0: '#000000',
          50: '{slate.50}',
          100: '{slate.100}',
          200: '{slate.200}',
          300: '{slate.300}',
          400: '{slate.400}',
          500: '{slate.500}',
          600: '{slate.600}',
          700: '{slate.700}',
          800: '{slate.800}',
          900: '{slate.900}',
          950: '{slate.950}',
        },
        semantic: {
          highlight: {
            background: '{primary.50}',  
            color: '{primary.700}',  
          },
          formField: {
            hoverBorderColor: '{primary.color}',
          },
        },
        focusRing: {
          width: '2px',
          style: 'dashed',
          color: '{primary.color}',
          offset: '1px',
        },
      },
    },
  },
 
  components: {
    card: {
      colorScheme: {
        light: {
          root: {
            background: '{surface.0}',
            color: '{surface.700}',
          },
          subtitle: {
            color: '{surface.500}',
          },
        },
        dark: {
          root: {
            background: '{surface.900}',
            color: '{surface.0}',
          },
          subtitle: {
            color: '{surface.400}',
          },
        },
      },
    },
  },
 
  extend: {
    my: {
      transition: {
        slow: '0.75s',
        normal: '0.5s',
        fast: '0.25s',
      },
      image: {
        display: 'block',
      },
    },
  },

  css: ({ dt }) => `
        /* CSS global para imagenes */
        img {
            display: ${dt('my.image.display')};
        }
        /* Ejemplo botón personalizado */
        .p-button-accent {
            background: ${dt('primary.600')};
            color: white;
            transition-duration: ${dt('my.transition.fast')};
        }
        .p-button-accent:hover {
            background: ${dt('primary.700')};
        }
    `,
});

export default customPreset;
