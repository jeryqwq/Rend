import request from "./request"

export async function uploadImg (file: File, {serviceId, serviceType, sort}: { sort?: number, serviceId?: string, serviceType?: string }) {
  
  const formData = new FormData()
  formData.append('file', file)
  serviceId && formData.append('serviceId', serviceId)
  serviceType && formData.append('serviceType', serviceType)
  sort!==undefined && formData.append('sort', sort + '')
  return  await fetch('/lease-center/appfile/upload', {
    method: 'post',
    body: formData
  }).then((res) => res.json())
}

export async function getDict (key: string) {
    return request(`/appdict/${key}`)
}

export async function getBrands () {
  return request(`/mallBrandInfo/all`, {
    method: 'post',
    data: {}
  })
}
export async function getFiles(serverId: string) {
    return request(`/appfile/${serverId}`)
}
