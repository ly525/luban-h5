import Strapi from 'strapi-sdk-javascript'
import { get as lodashGet } from 'lodash'

const baseUrl = lodashGet(window, 'LubanEditor.options.API_PATH')
const strapi = new Strapi(baseUrl)

export default strapi
