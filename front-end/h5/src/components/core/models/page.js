import Element from 'core/models/element'
import LbpBackground from 'core/plugins/lbp-background'

class Page {
  constructor (page = {}) {
    this.uuid = page.uuid || +new Date()
    this.title = page.title || ''
    this.elements = page.elements || [new Element(LbpBackground)]
    this.slidePresentation = page.slidePresentation || { 'pageShowEnable': true, 'pfst':false, 'pesaList': [] }
  }
  clone () {
    const elements = this.elements.map(element => new Element(element))
    return new Page({ title: this.title, elements, slidePresentation: {} })
  }
}

export default Page

