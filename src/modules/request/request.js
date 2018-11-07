// 本文件用来处理请求
import axios from "axios";
function fetch(config) {
  return new Promise((resolve, reject) => {
    axios({
      baseURL: 'http://172.16.6.58:8081/',
      // baseURL: 'http://172.16.5.112:80/dubhe/',
      // baseURL:'/dubhe/dubhe/',
      method: config.method,
      url: config.url,
      data: config.method === 'post' || config.method === 'put' ? config.params : null,
      params: config.method === 'get' || config.method === 'delete' ? config.params : null,
    }).then(function (res) {
      resolve(res);
    }).catch(function (err) {
      reject(err);
    })
  })
}

export default fetch
