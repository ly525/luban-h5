class Work {
  constructor (work = {}) {
    this.title = work.title || '标题'
    this.description = work.description || '描述'
    this.pages = work.pages || []
    this.type = work.type || 'h5'

    this.id = this.id
    this.key = this.key
    this.cover_image_url = ''
    this.project_id = 1
    this.is_publish = false
    this.create_time = new Date()
    this.update_time = new Date()
  }
}

export default Work
