import Element from '../models/element'
import LbpBackground from '../../plugins/lbp-background'

class Page {
  constructor (page = {}) {
    this.uuid = +new Date()
    this.elements = page.elements || [new Element(LbpBackground)]
  }

  clone () {
    const elements = this.elements.map(element => new Element(element))
    return new Page({ elements })
  }
}

export default Page
