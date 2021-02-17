import _ from 'lodash'
export function bindData (obj, dataCenter) {
  // 插值替换 <span>{{a}}<spam> => {a: 10}=> <span>10</span>
  const reg = /\{\{(.*)\}\}/g
  const newObj = JSON.parse(JSON.stringify(obj).replace(reg, (match, exp) => {
    //   // 表达式包含数组：dataCenter.page[0].title
    //   // https://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-and-arays-by-string-path
    exp = exp.trim().replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
    exp = exp.replace(/^\./, '') // strip a leading dot
    if (/DS\./.test(exp)) {
      return _.get(window, exp)
    }
    return exp
  }))
  return newObj
}
