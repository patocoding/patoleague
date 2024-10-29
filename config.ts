const config = {
    development: {
      apiUrl: 'https://localhost:7292'
    },
    production: {
      apiUrl: 'https://backendquatrodasorte-3458e8f38013.herokuapp.com'
    }
  };
  
  export const getConfig = () => {
    const env = process.env.NODE_ENV;
    return config[env];
  };