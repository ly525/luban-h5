/**
 * 获取 string path 对应的 value
 * 摘自vue 源码
 * getVMVal({a:1}, 'a') -> 1
 * getVMVal({a: {b: 1}}, 'a.b') -> 1
 */
export function getVMVal (vm, exp) {
  let val = vm
  exp = exp.split('.')
  exp.forEach(k => {
    try {
      val = val[k]
    } catch (error) {
      val = undefined
    }
  })
  return val
}
