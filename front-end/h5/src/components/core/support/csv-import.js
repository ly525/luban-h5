import Papa from 'papaparse'

const validFileMimeTypes = ['text/csv', 'text/x-csv', 'application/vnd.ms-excel', 'text/plain']
export default {
  name: 'lbs-csv-import',
  methods: {
    checkMimeType (type) {
      return validFileMimeTypes.indexOf(type) > -1
    },
    validFileMimeType (e) {
      e.preventDefault()
      let file = this.$refs.csv.files[0]
      const isValidFileMimeType = this.checkMimeType(file.type)
      if (isValidFileMimeType) this.loadFile()
    },
    loadFile () {
      /**
       * output {String}
          "columnA,columnB,columnC
          "Susan",41,a
          "Mike",5,b
          "Jake",33,c
          "Jill",30,d
          "
        * csv {Object}
        {
          "data": [
            ["columnA", "columnB", "columnC"],
            ["Susan", "41", "a"],
            ["Mike", "5", "b"],
            ["Jake", "33", "c"],
            ["Jill", "30", "d"],
          ],
          "errors": [],
          "meta": {
            "delimiter": ",",
            "linebreak": "\n",
            "aborted": false,
            "truncated": false,
            "cursor": 72
          }
        }
       */
      this.readFile((output) => {
        // const sample = Papa.parse(output, { preview: 2, skipEmptyLines: true })
        const csv = Papa.parse(output, { skipEmptyLines: true })
        this.$emit('parse', csv)
        this.$refs.input.value = ''
      })
    },
    readFile (callback) {
      let file = this.$refs.csv.files[0]
      if (file) {
        let reader = new FileReader()
        reader.readAsText(file, 'UTF-8')
        reader.onload = function (evt) {
          callback(evt.target.result)
        }
        reader.onerror = function () {
        }
      }
    }
  },
  render () {
    const randomId = +new Date()
    return <div style="height: 24px;">
      <label for={randomId} class="ant-btn ant-btn-primary ant-btn-sm">选择导入 csv 文件</label>
      {/* <input id={randomId} style="visibility:hidden;" type="file"></input> */}
      <input ref="input" id={randomId} ref="csv" type="file" onChange={this.validFileMimeType} style="visibility:hidden;" name="csv">xxxx</input>
    </div>
  }
}
