/**
 * 获取一个数组的非空子集
 * @param {Array} arr 
 */
export const subsets = function (arr: Array<string>): Array<any> {
  let result: Array<any> = []
  function dfs(path: Array<string>, start: number) {
    if (path.length != 0) result.push(path.slice())
    for (let i = start; i < arr.length; i++) {
      path.push(arr[i])
      dfs(path, i + 1)
      path.pop()
    }
  }
  dfs([], 0)
  return result
};

export const arrToPromiseKey = function (arr: Array<any>) {
  return arr.join('&')
}

/**
 * 判断 arr1 是否为 arr2 的子集
 * @param {Arrary} arr1 
 * @param {Array} arr2 
 */
export const isSubset = function (arr1: Array<string>, arr2: Array<string>) {
  let key = null
  arr1.map((item: string) => {
    if (!arr2.includes(item)) {
      key = item
      return key
    }
  })
  return key
}