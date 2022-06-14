
import  request, { obj2Str } from './request';
export function regist ({ data }: { data: any }) {
  const str = obj2Str(data)
  return fetch("/login/register", {
  "headers": {
    "content-type": "application/x-www-form-urlencoded",
    },
    body: str,
    method: "POST",
  }).then(res => res.json());
}

export function kapcha({ data }: { data: { code: string } }) {
  return request('/login/kaptcha', {
    params: data
  })
}

export function getCode(params: { phone: string, service: 'register' | 'forget' }) {
  return request('/login/getCode', {
    params
  })
}

export function getLoginFwxy() {
  return request('/appdict/param/loginFwxy')
}
