import request, { extend } from 'umi-request';
import { message } from 'antd'
request.interceptors.request.use((url, options) => {
  options.headers['Authorization'] = 'bearer ' + localStorage.getItem('TK');
  options.headers['Content-Type'] = 'application/jsonTK';
  return {
    url: `/lease-center${url}`,
    options: options,
  };
})
request.use(async (ctx, next) => {
  console.log('before');
  await next();
  const { res } = ctx
  if(res.code === '300') {
    message.info(res.msg)
  }else if (res.code === '500') {
    message.error(res.msg)
  }else if(res.code === '401') {
    message.info(res.msg)
  }
});
export default request

export const obj2Str = function(data: Record<string, any>) {
  let str = ''
  for ( const key in data ) {
    if(data[key] !== undefined) {
      str += key
      str += '='
      str += data[key] + "&"
    }
} 
  return str.slice(0, str.length - 1)
}
