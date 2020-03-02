import {request} from './request'
import api from './api'

export function getDetail(iid){
  return api.get_news('/detail/'+iid)
}
export function getRecommend(){
  return api.get_news('/recommend')
}
export class Goods{
  constructor(itemInfo,columns,services){
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.realPrice = itemInfo.lowPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
  }
}
export class Shop{
  constructor(shopInfo){
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.goodsCount = shopInfo.cGoods;
    this.score = shopInfo.score;
  }
}
export class GoodParam{
  constructor(info,rule){
    // 注：images可能没有值
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}