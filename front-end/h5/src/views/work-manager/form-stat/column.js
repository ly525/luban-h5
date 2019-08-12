export const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: 'PV',
    dataIndex: 'pv',
    key: 'pv'
  },
  {
    title: 'Uv',
    dataIndex: 'uv',
    key: 'uv'
  },
  {
    title: '表单数',
    key: 'formCount',
    dataIndex: 'formCount'
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export const data = [
  {
    key: '1',
    title: 'John Brown',
    pv: 32,
    uv: 32,
    formCount: 2
  },
  {
    key: '2',
    title: 'John Brown2',
    pv: 32,
    uv: 32,
    formCount: 2
  },
  {
    key: '3',
    title: 'John Brown3',
    pv: 32,
    uv: 32,
    formCount: 2
  }
]
