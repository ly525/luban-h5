class Work {
  constructor (work = {}) {
    this.title = work.title || '标题'
    this.description = work.description || '描述'
    this.pages = work.pages || []
    this.type = work.type || 'h5'
    this.work = work

    this.id = this.id
    this.coverImageUrl = ''
    this.projectId = 1
    this.isPublish = false
    this.createTime = +new Date()
    this.updateTime = +new Date()
  }
}

export default Work
