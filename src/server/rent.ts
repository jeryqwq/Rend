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
  let conditions = [];
  [{ name: 'releaseCityName', col: 'release_city_name', op: 'like'}, { op: 'eq',name: 'equipType', col: 'equip_type' }, { op: 'eq', name: 'equipBrand', col: 'equip_brand'}].forEach(i => {
    if(data[i.name]) {
      conditions.push({
        column: i.col,
        operator: i.op,
        value: data[i.name]
      })
    }
  })
  data.conditions = conditions
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


export function equipmentSaleDetail(id: string) {
  return request(`/equipmentSale/${id}`)
}
