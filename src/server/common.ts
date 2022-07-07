import request from "./request"
import { message } from 'antd'
export async function uploadImg (file: File, {serviceId, serviceType, sort}: { sort?: number, serviceId?: string, serviceType?: string }) {
  if(file.size >= 5 * 1000 * 1000) {
    message.info('图片过大，请重新选择')
    return
  }
  const formData = new FormData()
  formData.append('file', file)
  serviceId && formData.append('serviceId', serviceId)
  serviceType && formData.append('serviceType', serviceType)
  sort!==undefined && formData.append('sort', sort + '')
  return await fetch('/lease-center/appfile/upload', {
    method: 'post',
    body: formData
  }).then((res) => res.json())
}

export async function getDict (key: string) {
    return request(`/appdict/${key}`)
}
export async function getEquipmentType () {
  return request('/equipmentType/tree')
}

export async function getBrands () {
  return request(`/mallBrandInfo/all`, {
    method: 'post',
    data: {}
  })
}
export function commonRequest(url: string, params:any):any {
  return request(url, params)
  
}
export async function getFiles(serverId: string) {
    return request(`/appfile/${serverId}`)
}
