import Cookies from 'js-cookie'

class Storage {
  constructor ({ storage = 'localStorage', tokenKey = 'jwt' } = {}) {
    this.storage = storage
    this.tokenKey = tokenKey
  }
  set (key, value) {
    if (this.storage === 'localStorage') {
      localStorage.setItem(...arguments)
    } else {
      Cookies.set(...arguments)
    }
  }

  get (key) {
    if (this.storage === 'localStorage') {
      return localStorage.getItem(...arguments)
    } else {
      return Cookies.get(...arguments)
    }
  }

  remove (key) {
    if (this.storage === 'localStorage') {
      localStorage.removeItem(...arguments)
    } else {
      Cookies.remove(...arguments)
    }
  }

  getToken () {
    return this.get(this.tokenKey)
  }

  setToken (token) {
    this.set(this.tokenKey, token)
  }

  removeToken () {
    this.remove(this.tokenKey)
  }
}

export default new Storage()
