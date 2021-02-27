import axios from 'axios'
import DS_ENUM, { REFRESH_ENUM, REFRESH_DEFAULT_INTERVAL } from 'core/enum/data-source'

export default class DataSource {
  constructor (ds) {
    this.init(ds)
  }

  init (ds) {
    this.id = ds.id
    this.name = ds.name
    this.url = ds.url
    this.type = ds.type
    this.dependencies = ds.dependencies || []
    this.relatedDsList = ds.relatedDsList || []
    this.refreshType = ds.refreshType || REFRESH_ENUM.code2value.ONCE
    this.refreshInterval = ds.refreshInterval || REFRESH_DEFAULT_INTERVAL
    this.pipe = ds.pipe
    this.resHandler = this.getHandlerFn(ds.pipe)
    this.updated = null
    this.loading = false
  }

  updateRelated () {
    const storage = (this.relatedDsList || []).reduce((storage, dsName) => {
      let ds = (window.__work.datasources || []).find(ds => ds.name === dsName)
      if (!ds || ds.type !== DS_ENUM.code2value.STATIC) return storage
      ds = new DataSource(ds, this.options)

      const deps = ds.dependencies.reduce((deps, name) => ({ ...deps, [name]: this.vm.$ds[name] }), {})
      return { ...storage, [dsName]: typeof ds.resHandler === 'function' ? ds.resHandler(deps) : {} }
    }, {})
    import('core/store/index.js').then(coreStore => {
      const store = coreStore.default
      store.commit('dataCenter/updateStorage', storage)
    })
  }

  getHandlerFn (handlerStr) {
    return new Function(`return ${handlerStr}`)()
  }

  _request () {
    const ds = this
    return new Promise((resolve, reject) => {
      ds.loading = true
      axios(ds.url).then(response => {
        ds.updated = +new Date()
        ds.loading = false
        const storage = {
          [ds.name]: typeof ds.resHandler === 'function' ? ds.resHandler(response) : response.data
        }
        import('core/store/index.js').then(coreStore => {
          const store = coreStore.default
          store.commit('dataCenter/updateStorage', storage)
          // this.vm.updateStorage(storage)
          this.updateRelated()
          resolve()
        })
      })
    })
  }

  request () {
    return this._request().then(() => {
      if (this.refreshType === REFRESH_ENUM.code2value.FIXED) {
        setInterval(() => {
          this._request()
        }, this.refreshInterval * 1000)
      }
    })
  }

  static dispatchRequest (work) {
    const dsList = (work.datasources || []).filter(ds => ds.type === DS_ENUM.code2value.HTTP_API)
    if (!dsList.length) return
    this.requestQueueLen = dsList.length
    this.loading = true
    dsList.forEach(ds => {
      new DataSource(ds).request().then(() => {
        this.requestQueueLen--
        if (this.requestQueueLen === 0) {
          this.loading = false
        }
      })
    })
  }
}
