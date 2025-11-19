export default {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    ...(process.env.NODE_ENV === 'development' ? ['react-refresh/babel'] : []), // Use Fast Refresh in development
  ],
};
