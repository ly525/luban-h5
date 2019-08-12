import axios from 'axios'
import { message } from 'ant-design-vue'

message.config({
  maxCount: 3
})

export const myMessage = message

export const client = axios.create({
  baseURL: '/v1',
  responseType: 'json'
})
export const baseClient = axios.create({
  responseType: 'json'
})

export class AxiosWrapper {
  // eslint-disable-next-line camelcase
  constructor ({ name = 'default', loading_name, responseType = 'json', headers, dispatch, commit, router, successMsg, failMsg, successCallback, failCallback, customRequest }) {
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

  get (...args) {
    this.setDefaultLoadingName(args)

    this.setLoadingValue(true)
    return this.instance.get(...args).then(response => {
      const handler = this.getCommonResponseHandler({ failMsg: 'Query Failed.' })
      handler.call(this, response)
    }).catch(error => {
      // handle error
      myMessage.error(error.message)
    }).finally(() => this.setLoadingValue(false))
  }

  post (...args) {
    this.setDefaultLoadingName(args)

    this.setLoadingValue(true)
    return this.instance.post(...args).then(response => {
      const handler = this.getCommonResponseHandler({ failMsg: 'Save Failed.' })
      handler.call(this, response)
    }).catch(error => {
      // handle error
      myMessage.error(error.message)
    }).finally(() => this.setLoadingValue(false))
  }

  put (...args) {
    this.setDefaultLoadingName(args)

    this.setLoadingValue(true)
    if (this.customRequest) {
      return this.customRequest(...args)
        .then(data => {
          const handler = this.getCommonResponseHandler({ failMsg: 'Save Failed.' })
          handler.call(this, { status: 200, data: { data } })
        })
        .finally(() => this.setLoadingValue(false))
    }
    return this.instance.put(...args).then(response => {
      const handler = this.getCommonResponseHandler({ failMsg: 'Save Failed.' })
      // handler.call(this, response)
      handler()
    }).catch(error => {
      // handle error
      myMessage.error(error.message)
    }).finally(() => this.setLoadingValue(false))
  }

  delete (...args) {
    this.setDefaultLoadingName(args)

    this.setLoadingValue(true)
    return this.instance.delete(...args).then(response => {
      const handler = this.getCommonResponseHandler({ failMsg: 'Save Failed.' })
      handler.call(this, response)
    }).catch(error => {
      // handle error
      myMessage.error(error.message)
    }).finally(() => this.setLoadingValue(false))
  }

  cancel (reason) {
    this.source.cancel(reason)
  }

  setLoadingValue (payload) {
    // this.dispatch('loading/update', { type: this.loading_name, payload }, { root: true })
    this.commit('loading/update', { type: this.loading_name, payload }, { root: true })
  }

  setDefaultLoadingName (...args) {
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
      if (!response.data) {
        myMessage.warn(this.failMsg || failMsg)
      } else if (response.status === 200) {
        this.successMsg && myMessage.success(this.successMsg)
        if (this.successCallback) {
          this.successCallback(response)
        } else {
          this.commit({ type: this.name, value: response.data }, { root: true })
        }
      } else if (this.responseType === 'json') {
        myMessage.error(response.data.msg)
        if (response.status === 401) {
          if (this.router) {
            this.router.push('/login')
          }
        } else {
          alert(response.data.msg)
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
