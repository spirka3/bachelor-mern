import _ from "lodash";

export const reloadPage = () => window.location.reload(false);


export const setUser = (user) => localStorage.setItem('user', user)
export const getUser = () => localStorage.getItem('user')
export const removeUser = () => localStorage.removeItem('user')


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


// https://stackoverflow.com/a/34890276
export const groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
