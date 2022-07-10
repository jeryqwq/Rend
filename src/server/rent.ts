import  request, { obj2Str } from './request';
export function equipmentRent (data: any) {
  return request("/equipmentRent", {
    data,
    method: 'post'
  })
}

export function equipmentSale (data: any, method = 'post') {
  return request("/equipmentSale", {
    data,
    method
  })
}
export function equipmentLease (data: any, method = 'post') {
  return request("/equipmentLease", {
    data,
    method
  })
}

export function equipmentPurchase (data: any, method = 'post') {
  return request("/equipmentPurchase", {
    data,
    method
  })
}
export function equipmentPartPage (data: any) { // 二手出售
  let conditions:any[] = [];
  [{ name: 'partsName', col: 'parts_name', op: 'like'},{ name: 'releaseCityName', col: 'release_city_name', op: 'like'}, { op: 'eq',name: 'partsType', col: 'parts_type' }, { op: 'eq', name: 'partsBrand', col: 'parts_brand'}].forEach(i => {
    if(data[i.name]) {
      conditions.push({
        column: i.col,
        operator: i.op,
        value: data[i.name]
      })
    }
  })
  data.conditions = conditions
  return request("/equipmentParts/page", {
    data,
    method: 'post'
  })
}
export function equipmentSalePage (data: any) { // 二手出售
  let conditions:any[] = [];
  [{ name: 'equipName', col: 'equip_name', op: 'like'},{ name: 'releaseCityName', col: 'release_city_name', op: 'like'}, { op: 'eq',name: 'equipType', col: 'equip_type' }, { op: 'eq', name: 'equipBrand', col: 'equip_brand'}].forEach(i => {
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


export function equipmentSaleDetail(id: string, type = 'equipmentSale') {
  return request(`/${type}/${id}`)
}

export function equipmentLeasePage(data:any){
  let conditions:any[] = [];
  [{ name: 'equipName', col: 'equip_name', op: 'like'},{ name: 'releaseCityName', col: 'release_city_name', op: 'like'}, { op: 'eq',name: 'equipType', col: 'equip_type' }, { op: 'eq', name: 'equipBrand', col: 'equip_brand'}].forEach(i => {
    if(data[i.name]) {
      conditions.push({
        column: i.col,
        operator: i.op,
        value: data[i.name]
      })
    }
  })
  data.conditions = conditions
  return request("/equipmentLease/page", {
    data,
    method: 'post'
  })
}
export function mallBrandInfo  (data: any){
  return request('/mallBrandInfo/page', {
    method: 'post',
    data
  })
}

