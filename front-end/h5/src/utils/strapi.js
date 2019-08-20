import Strapi from 'strapi-sdk-javascript'
import { API_ORIGIN } from '../constants/api.js'

// TODO 通过 env 来配置后端 URL 等信息
const strapi = new Strapi(API_ORIGIN)

export default strapi
