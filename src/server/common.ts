import request from "./request";
export function uploadImg (formData: FormData) {
  return request('/appfile/upload',{
    method: 'post',
    headers: {  }
  })
}
