import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
import { isEmpty } from '@/utils/mUtils'
import store from '@/store/index'
// 创建axios实例
let baseUrl = ''
switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = '127.0.0.1:8090' // 这里是本地的请求
    break
  case 'test':
    baseUrl = '' // 测试环境
    break
  case 'production':
    baseUrl = 'https://ent.scfunion.com' // 生产环境
    break
}
const service = axios.create({
  baseURL: baseUrl,
  timeout: 8000
})
// request拦截器
service.interceptors.request.use(
  config => {
    if (!isEmpty(getToken('Token'))) {
      config.headers.common['Authorization'] = 'Bearer ' + getToken('Token')
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      if (response.data.code === 1200 || response.data.code === 1402) {
        return response
      } else if (
        response.data.code === 1400 ||
        response.data.code === 1401 ||
        response.data.code === 1403 ||
        response.data.code === 1408 ||
        response.data.code === 1500
      ) {
        if (!isEmpty(response.data.message)) {
          Message({
            message: response.data.message,
            type: 'error',
            duration: 3 * 1000
          })
        }
        return Promise.reject('error')
      }
    } else {
      Message({
        message: '请求失败',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    }
  },
  error => {
    if (error.response.status === 401) {
      store.dispatch('user/resetToken').then(() => {
        MessageBox.alert(error.response.data.message, {
          confirmButtonText: '跳转到登录页面',
          callback: () => {
            window.location.href = '/'
          }
        })
      })
    }
    return Promise.reject(error)
  }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params: params
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装delete方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function deleteData(url, params = {}) {
  return new Promise((resolve, reject) => {
    service
      .delete(url, {
        params: params
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    service.post(url, data).then(
      response => {
        resolve(response.data)
      },
      err => {
        reject(err)
      }
    )
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    service.put(url, data).then(
      response => {
        resolve(response.data)
      },
      err => {
        reject(err)
      }
    )
  })
}
