// axios 公共配置
// 基地址
axios.defaults.baseURL = 'https://geek.itheima.net'

//axios 请求拦截器
axios.interceptors.request.use(function (config) {
  //发送请求前做什么
  // 统一携带token 令牌字符串，在请求头中
  const token = localStorage.getItem('token')
    token && (config.headers.Authorization = `Bearer ${token}`);
  return config;
}, function (error) {
  //对请求错误做些什么
  return Promise.reject(error);
});


//axios 响应拦截器
axios.interceptors.response.use(function(response){
  // 状态码范围内都会触发该函数
  // 对响应数据做点什么
  const result = response.data
  return result;
},function (error){
  // 超出2xx范围的状态码都会触发该函数
  // 对响应错误做点什么
  // console.dir(error)
  if(error?.response?.status === 401){
    alert('身份认证失败，请重新登录')
    localStorage.clear()
    location.href = '../login/index.html'
  }
  return Promise.reject(error);
})