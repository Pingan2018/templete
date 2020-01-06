import React from "react";
const routeConfig = [
  {
    name:'home',
    path:'/home',
    component:React.lazy(() => import(/* webpackChunkName: "home" */ '../components/home'))
  },
  {
    name:'detail',
    path:'/detail',
    component:React.lazy(() => import(/* webpackChunkName: "detail" */ '../components/detail'))
  }
]
export default routeConfig