export default class LocalPreferences {
  static get (key) {
    this.preferences = this.preferences || this.getAll()
    return this.preferences[key]
  }

  static getAll () {
    let preferences = {}
    try {
      preferences = JSON.parse(localStorage.preferences)
    } catch (error) {}
    return preferences
  }

  static set (key, value) {
    this.preferences = this.preferences || this.getAll()
    this.preferences[key] = value
    localStorage.preferences = JSON.stringify({
      ...this.getAll(),
      [key]: value
    })
  }
}

export const IS_CONFIRM_BEFORE_DELETE_ELEMENT = 'isConfirmBeforeDeleteElement'
