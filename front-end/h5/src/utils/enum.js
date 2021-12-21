export function getEnum (items) {
  const labels = []
  const values = []
  const codes = []
  const options = []

  const code2value = {}
  const code2label = {}
  const value2label = {}
  items.forEach(item => {
    const [label, value, code] = item
    value2label[value] = label
    code2label[code] = label
    code2value[code] = value
    labels.push(label)
    values.push(value)
    codes.push(code)
    options.push({ label, value })
  })

  return {
    codes,
    values,
    labels,
    options,
    code2label,
    value2label,
    code2value
  }
}
