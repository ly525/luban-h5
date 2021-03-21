export class StaticDataSource {
  constructor (ds) {
    ['name', 'relatedDsList', 'dependencies', 'handler', 'type', 'resource', 'url', 'refreshInterval', 'refreshType'].forEach(key => {
      this[key] = ds[key]
    })
    this.handler = `function handler(deps) {\ndebugger\nreturn deps\n}`
    this.relatedDsList = this.relatedDsList || []
    this.dependencies = this.dependencies || []
  }
}

export class HttpDataSource {
  constructor (ds) {
    ['name', 'relatedDsList', 'dependencies', 'handler', 'type', 'resource', 'url', 'refreshInterval', 'refreshType'].forEach(key => {
      this[key] = ds[key]
    })

    this.relatedDsList = this.relatedDsList || []
    this.dependencies = this.dependencies || []
    this.handler = this.handler || `function handler(response){ \n return response.data \n}`
  }
}
