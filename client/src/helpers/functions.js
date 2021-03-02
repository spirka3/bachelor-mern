import _ from "lodash";

/** Setup config/headers and token */
export const tokenConfig = () => {

  const token = getAuth().token;

  // Headers
  const config = {
    headers: { 'Content-type': 'application/json' }
  };
  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
};

export const setAuth = auth => localStorage.setItem('auth', JSON.stringify(auth))
export const getAuth = () => JSON.parse(localStorage.getItem('auth'))
export const delAuth = () => localStorage.removeItem('auth')


export const generateLayout = () => {
  return _.map(_.range(0, 3), (item, i) => {
    const x = Math.ceil(Math.random() * 4) + 1;
    const y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: (_.random(0, 5) * x) % 12,
      y: Math.floor(i / 6) * y,
      w: x,
      h: y,
      i: i.toString(),
      static: Math.random() < 0.05
    }
  })
}


export const reloadPage = () => window.location.reload(false);
