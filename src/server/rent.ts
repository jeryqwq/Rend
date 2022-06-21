import  request, { obj2Str } from './request';
export function equipmentRent (data: any) {
  return request("/equipmentRent", {
    data,
    method: 'post'
  })
}

export function equipmentSale (data: any) {
  return request("/equipmentSale", {
    data,
    method: 'post'
  })
}
export function equipmentLease (data: any) {
  return request("/equipmentLease", {
    data,
    method: 'post'
  })
}

export function equipmentPurchase (data: any) {
  return request("/equipmentPurchase", {
    data,
    method: 'post'
  })
}
export function equipmentSalePage (data: any) { // 二手出售
  return request("/equipmentSale/page", {
    data,
    method: 'post'
  })
}

export function equipmentRepairInfo(data: any) {
  return request('/equipmentRepairInfo', {
    data,
    method: 'post'
  })
}

