import { buildLegacyTheme } from 'sanity';

const props = {
  '-white': '#fff',
  '-black': '#1a1a1a',
  '-lightBlue': '#237cdb',
  '-primary-dark': '#FF8C43',
  '-primary': '#00BFFF',
  '-red': 'red',
  '-yellow': '#f4b400',
  '-green': '#0f9d58',
};

// eslint-disable-next-line import/prefer-default-export
export const studioThemeDev = buildLegacyTheme({
  /* Base theme colors */
  '--black': props['-black'],
  '--white': props['-white'],

  '--gray': '#666',
  '--gray-base': '#666',

  '--component-bg': props['-white'],
  '--component-text-color': props['-black'],

  /* Brand */
  '--brand-primary': props['-primary'],

  // Default button
  '--default-button-color': '#666',
  '--default-button-primary-color': props['-primary-dark'],
  '--default-button-success-color': props['-green'],
  '--default-button-warning-color': props['-yellow'],
  '--default-button-danger-color': props['-red'],

  /* State */
  '--state-info-color': props['-lightBlue'],
  '--state-success-color': props['-green'],
  '--state-warning-color': props['-yellow'],
  '--state-danger-color': props['-red'],

  /* Navbar */
  '--main-navigation-color': props['-primary'],
  '--main-navigation-color--inverted': props['-black'],

  '--focus-color': props['-primary'],
});
