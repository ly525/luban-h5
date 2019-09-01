class Work {
  constructor (work = {}) {
    this.title = work.title || '标题'
    this.description = work.description || '描述'
    this.pages = work.pages || [{ elements: [] }]

    // this.id = this.id
    // TODO 用id 并不是一个好办法，有心人会得知整个系统中共有多少作品等额外信息，尽量防止信息泄漏
    // this.key = this.key
    this.cover_image_url = ''
    // TODO 后期可以添加一个类似项目组的概念，每个项目组下可以有多个作品
    // this.project_id = 1
    this.create_time = new Date()
    this.update_time = new Date()
    this.is_publish = false
    this.is_template = false
  }
}

export default Work
