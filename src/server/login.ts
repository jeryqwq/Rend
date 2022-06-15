
import  request, { obj2Str } from './request';
export function regist ({ data }: { data: any }) {
  return request("/login/register", {
    data,
    method: 'post'
  })
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

export function pcLogin(data: any) {
  return request("/login/pclogin", {
    params: data,
  })
}

export function getUserInfo () {
  return request('/sysuser/getUserInfo', {
    method: 'get'
  })
}
