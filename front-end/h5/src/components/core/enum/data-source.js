import { getEnum } from '@/utils/enum'

const HTTP_API = 'httpApi'
const STATIC = 'static'
const CSV = 'csv'

// [label, value, code]
export default getEnum([
  ['静态数据源', STATIC, 'STATIC'],
  ['http/https', HTTP_API, 'HTTP_API'],
  ['CSV', CSV, 'CSV']
])

export const REFRESH_ENUM = getEnum([
  ['单次触发', 'once', 'ONCE'],
  ['定时更新', 'fixed', 'FIXED']
])

export const REFRESH_DEFAULT_INTERVAL = 2
