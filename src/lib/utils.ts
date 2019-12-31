export const $get = (obj:any, keys:any, defaultVal = undefined) =>
  keys.split(/\./).reduce((o:any, j:any) => (o || {})[j], obj) || defaultVal