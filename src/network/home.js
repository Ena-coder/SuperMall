import {request} from './request'
import {fetch} from './api';//引入

export function getHomeMultidata(){
  return request({
    url:'/home/multidata'
  })
}
export function getHomeGoods(type,page){
  return fetch({
    url:'/home/data'+'?type='+type+'&page='+page
  })
}














// import api from './api';//引入


// export function getHomeGoods(type,page){
//   return api.get_news('/home/data'+'?type='+type+'&page='+page)
// }