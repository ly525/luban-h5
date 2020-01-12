import axios from 'axios'
import ImageItem from '../components/image-item.js'
import Uploader from '../components/uploader.js'

export default {
  data: () => ({
    items: [],
    cachedItems: [],
    loading: false
  }),
  methods: {
    uploadSuccess ({ file, fileList }) {
      const response = file.response.length && file.response[0]
      this.items = [{ name: response.name, url: response.url.replace('http://localhost:1337', '') }, ...this.cachedItems]
    },
    beforeUpload (file) {
      this.items.unshift({
        loading: true
      })
      return file
    }
  },
  render (h) {
    return (
      <div>
        <a-spin tip="Loading..." spinning={this.loading}>
          <a-card>
            <Uploader
              slot="extra"
              beforeUpload={file => this.beforeUpload(file)}
              uploadSuccess={info => this.uploadSuccess(info)}
            />
            <a-list
              style="height: 400px; overflow: auto;"
              grid={{ gutter: 12, column: 3 }}
              dataSource={this.items}
              renderItem={(item, index) => (
                <a-list-item onClick={() => {
                  this.$emit('changeItem', item)
                }}>
                  <ImageItem item={item} />
                </a-list-item>
              )}
            >
            </a-list>
          </a-card>
        </a-spin>
      </div>
    )
  },
  mounted () {
    // demo code
    axios
      .get('/upload/files', {
        params: {
          '_limit': 10,
          '_start': 0,
          mime: 'image/png'
        }
      })
      .then(res => {
        this.items = res.data
        this.cachedItems = []
      })
  }
}
