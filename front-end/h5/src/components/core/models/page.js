import Element from '../models/element'
import LbpBackground from '../../plugins/lbp-background'

class Page {
  constructor (page = {}) {
    this.uuid = +new Date()
    this.title = page.title || ''
    this.elements = page.elements || [new Element(LbpBackground)]
  }

  clone () {
    const elements = this.elements.map(element => new Element(element))
    return new Page({ title: this.title, elements })
  }
}

export default Page
