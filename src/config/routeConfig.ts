import React from "react";
const routeConfig = [
  {
    name:'home',
    path:'/home',
    component:React.lazy(() => import(/* webpackChunkName: "home" */ '../components/Home'))
  },
  {
    name:'detail',
    path:'/detail',
    component:React.lazy(() => import(/* webpackChunkName: "detail" */ '../components/Detail'))
  }
]
export default routeConfig