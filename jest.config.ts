import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },

  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/setup.jest.js'],
  transformIgnorePatterns: ['/node_modules/(?!(@knight-lab)/)'],
};

export default config;
