import CronParser from 'cron-parser'

export default (rule, value, callback) => {
  // 没填写就不校验
  if (!value) {
    callback()
    return true
  }
  const values = value.split(' ').filter(item => !!item)
  if (values.length > 7) {
    callback(new Error('cron表达式最多7项'))
    return false
  }
  // 取其中的前六项
  const e = values.slice(0, 6).join(' ')
  let result = true
  try {
    const iter = CronParser.parseExpression(e)
    iter.next()
    callback()
  } catch (e) {
    callback(new Error('cron表达式错误:' + e))
    result = false
  }
  return result
}
