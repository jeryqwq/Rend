import request from "./request"


export const mallCart = function (data: any) {
  return request('/mallCart', {
    method: 'post',
    data
  })
}
