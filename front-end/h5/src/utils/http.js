import axios from 'axios'
import { message, notification } from 'ant-design-vue'

message.config({
  maxCount: 3
})

export class AxiosWrapper {
  // eslint-disable-next-line camelcase
  constructor ({ name, loading_name, responseType = 'json', headers, dispatch, commit, router, successMsg, failMsg, successCallback, failCallback, customRequest, actionPayloadExtra = {} }) {
    this.name = name
    // eslint-disable-next-line camelcase
    this.loading_name = loading_name
    // eslint-disable-next-line camelcase
    this.responseType = responseType
    this.dispatch = dispatch
    this.commit = commit
    this.router = router
    this.successMsg = successMsg
    this.failMsg = failMsg
    this.customRequest = customRequest
    this.successCallback = successCallback
    this.failCallback = failCallback
    this.actionPayloadExtra = actionPayloadExtra
    this.source = axios.CancelToken.source()
    this.instance = axios.create({
      // baseURL: '/v1',
      responseType,
      headers,
      cancelToken: this.source.token
    })
    this.instance.interceptors.response.use(response => {
      // Do something with response data
      return Promise.resolve(response)
    }, error => {
      // Do something with response error
      return Promise.reject(error)
    })
  }

  /**
   *
   * @param {String} method get/post/delete/put
   * @param  {...any} args
   */
  request (method, ...args) {
    this.setDefaultLoadingName(...args)
    this.setLoadingValue(true)
    const request = this.customRequest || this.instance[method]
    return request(...args)
    .then(response => {
      const handler = this.getCommonResponseHandler({ failMsg: 'Query Failed.' })
      return handler.call(this, this.customRequest ? { status: 200, data: response } : response)
    })
    .catch(handleError)
    .finally(() => this.setLoadingValue(false))
  }

  get (...args) {
    return this.request('get', ...args)
  }

  post (...args) {
    return this.request('post', ...args)
  }

  put (...args) {
    return this.request('put', ...args)
  }

  delete (...args) {
    return this.request('delete', ...args)
  }

  cancel (reason) {
    this.source.cancel(reason)
  }

  setLoadingValue (payload) {
    this.commit('loading/update', { type: this.loading_name, payload }, { root: true })
  }

  setDefaultLoadingName (...args) {
    debugger
    if (!this.loading_name) {
      let url = args[0]
      if (url.indexOf('/') !== -1) {
        let us = url.split('/')
        url = us[us.length - 1]
      }
      if (url.indexOf('?') !== -1) {
        let us = url.split('?')
        url = us[0]
      }
      this.loading_name = `${url}_loading`
    }
  }

  getCommonResponseHandler ({ failMsg } = {}) {
    return (response) => {
      const { status, data } = response
      if (status === 200) {
        this.successMsg && message.success(this.successMsg)
        if (this.successCallback) {
          return this.successCallback(response)
        } else {
          if (!this.name) return data
          this.commit({ type: this.name, value: data, ...this.actionPayloadExtra }, { root: true })
        }
      } else if (this.responseType === 'json') {
        message.error(data.msg)
        if (status === 401) {
          message.error('401 Session Expired')
          if (this.router) {
            this.router.push('/login')
          }
        } else {
          alert(data.msg)
          if (this.failCallback) {
            this.failCallback(response)
          }
        }
      } else {
        if (this.successCallback) {
          this.successCallback(response)
        }
      }
    }
  }
}

export function handleError (error) {
  // strapi-api-sdk 错误状态下，未将 status-code 抛出
  if (error.message === 'Forbidden') {
    console.log(`
        ==========================================================================================

            #!zh: 接口 403，解决方案：https://github.com/ly525/luban-h5/discussions/110
            #!en: API 403 Forbidden, Solution: https://github.com/ly525/luban-h5/discussions/110

        ==========================================================================================
    `)
    notification.error(
      {
        message: 'API 403 Forbidden',
        description: (h) => (
          <div style="text-align: left;">
            <div>- #!zh: 接口 403</div>
            <div>- #!en: API 403 Forbidden</div>
            <div>- <a href="https://github.com/ly525/luban-h5/discussions/110" target="_blank">#!en: solution(#!zh: 解决方案)</a></div>
          </div>
        )
      })
  }
}
