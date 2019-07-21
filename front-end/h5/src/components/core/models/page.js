import Element from '../models/element'

class Page {
  constructor (page = {}) {
    this.uuid = +new Date()
    this.elements = page.elements || []
  }

  clone () {
    const elements = this.elements.map(element => new Element(element))
    return new Page({ elements })
  }
}

export default Page
