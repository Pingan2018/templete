export const $get = (obj, keys, defaultVal = undefined) =>
  keys.split(/\./).reduce((o, j) => (o || {})[j], obj) || defaultVal