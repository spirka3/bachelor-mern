import _ from "lodash";

export const setUser = (token) => localStorage.setItem('token', token)
export const getUser = () => localStorage.getItem('token')
export const removeUser = () => localStorage.removeItem('token')

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
    };
  });
}