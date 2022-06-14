import request, { extend } from 'umi-request';
import { message } from 'antd'
request.interceptors.request.use((url, options) => {
  return {
    url,
    options: { ...options, headers: { 
      'Content-Type': `application/x-www-form-urlencoded`,
     } },
  };
})
request.use(async (ctx, next) => {
  console.log('before');
  await next();
  const { res } = ctx
  if(res.code === '300') {
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
