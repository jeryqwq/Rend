import  request, { obj2Str } from './request';
export function equipmentRent (data: any, method = 'post') {
  return request("/equipmentRent", {
    data,
    method
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
  let conditions:any[] = [{
    column: 'is_new',
    operator: 'eq',
    value: data.isNew === 1 ? 1 : 0
  }];
  [{ name: 'equipName', col: 'equip_name', op: 'like'},{ name: 'releaseCityName', col: 'release_city_name', op: 'like'}, { op: 'eq', name: 'equipBrand', col: 'equip_brand'}].forEach(i => {
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
export function equipmentAllPage (data: any) { // 二手出售
  let conditions:any[] = [];
  [{ name: 'equipName', col: 'equip_name', op: 'like'},{ name: 'releaseCityName', col: 'release_city_name', op: 'like'}, { op: 'eq', name: 'equipBrand', col: 'equip_brand'}].forEach(i => {
    if(data[i.name]) {
      conditions.push({
        column: i.col,
        operator: i.op,
        value: data[i.name]
      })
    }
  })
  data.conditions = conditions
  return request("/equipmentLease/pageAllEquipment", {
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
  [{ name: 'equipName', col: 'equip_name', op: 'like'},{ name: 'releaseCityName', col: 'release_city_name', op: 'like'}, { op: 'eq', name: 'equipBrand', col: 'equip_brand'}].forEach(i => {
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

export function getStoreCommon (organId: string, id: string, k1 = 'd.organ_id', k2 = 'd.id') {
  return  request('/equipmentLease/page', {
    method: 'post',
    data: {
      size: 4,
      current: 0,
      conditions:[{
        operator: 'eq',
        column: k1,
        value: organId
      },{
        operator: 'ne',
        column: k2,
        value: id
      }]
    }
  })
}
export function getStoreOthers (organId: string, typeid: string, k1 = 'd.organ_id', k2 = 'e.equip_type') {
  return    request('/equipmentLease/page', {
    method: 'post',
    data: {
      size: 5,
      current: 0,
      conditions:[{
        operator: 'ne',
        column: k1,
        value: organId
      },{
        operator: 'eq',
        column: k2,
        value: typeid
      }]
    }
  })
}
