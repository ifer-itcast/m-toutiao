// 存储
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

// 获取
export const getItem = key => {
  const data = localStorage.getItem(key)
  try {
    // 转换非 JSON 格式字符串会报错
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

// 删除
export const removeItem = key => {
  localStorage.removeItem(key)
}
