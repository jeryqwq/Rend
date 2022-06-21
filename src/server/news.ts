import  request, { obj2Str } from './request';
export function appNewsPage (data: any) {
  return request("/appnews/page", {
    data,
    method: 'post'
  })
}

export function appNewItem (id: string) {
  return request(`/appnews/${id}`)
}

export function getNextOrprev(op: 's' | 'x', id: string) {
  return request(`/appnews/getNext`, {
    params: {
      id,
      opera: op
    }
  })
}
