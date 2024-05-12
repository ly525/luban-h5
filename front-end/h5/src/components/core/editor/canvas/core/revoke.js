/**
 撤销重做功能
 */
export class Revoke {
  // 历史记录
  recordList = [];

  // 撤销记录，用于重做
  redoList = [];

  // 当前记录用currentRecord变量暂时存储，当用户修改时，再存放到recordList
  currentRecord = null;

  // 上次插入数据时间
  time = 0;

  /**
   * @description: 插入历史记录
   * @param {object}record
   * @return {boolean}
   */
  push(record) {
    const nowTime = Date.now();
    // 防止添加重复的时间，当添加间隔小于100ms时，则替换当前记录并取消执行添加
    if (this.time + 100 > nowTime) {
      this.currentRecord = JSON.stringify(record);
      return false;
    }

    this.time = nowTime;

    // 判断之前是否已经存在currentRecord记录，有则存储到recordList
    if (this.currentRecord) {
      this.recordList.push(this.currentRecord);
      // 增加记录后则应该清空重做记录
      this.redoList.splice(0, this.redoList.length);
    }

    // 将json转成字符串存储
    this.currentRecord = JSON.stringify(record);

    // 最多存储20条记录，超过20天记录则删除之前的记录
    if (this.length > 20) {
      this.recordList.unshift();
    }

    return true;
  }

  /**
   * @description: 撤销操作
   * @param {*}
   * @return {object}
   */
  undo() {
    // 没有记录时,返回false
    if (this.recordList.length === 0) {
      return false;
    }
    const record = this.recordList.pop();

    // 将当前记录添加到重做记录里面
    if (this.currentRecord) {
      this.redoList.push(this.currentRecord);
    }
    // 丢弃当前记录，防止重复添加
    this.currentRecord = null;

    return JSON.parse(record);
  }

  /**
   * @description: 重做操作
   * @param {*}
   * @return {*}
   */
  redo() {
    // 没有重做记录时,返回false
    if (this.redoList.length === 0) {
      return false;
    }

    const record = this.redoList.pop();
    // 添加到重做记录里面
    if (this.currentRecord) {
      this.recordList.push(this.currentRecord);
    }
    // 丢弃当前记录，防止重复添加
    this.currentRecord = null;

    return JSON.parse(record);
  }
}
