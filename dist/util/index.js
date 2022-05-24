/**
 * 获取一个数组的非空子集
 * @param {Array} arr
 */
export var subsets = function (arr) {
    var result = [];
    function dfs(path, start) {
        if (path.length != 0)
            result.push(path.slice());
        for (var i = start; i < arr.length; i++) {
            path.push(arr[i]);
            dfs(path, i + 1);
            path.pop();
        }
    }
    dfs([], 0);
    return result;
};
export var arrToPromiseKey = function (arr) {
    return arr.join('&');
};
/**
 * 判断 arr1 是否为 arr2 的子集
 * @param {Arrary} arr1
 * @param {Array} arr2
 */
export var isSubset = function (arr1, arr2) {
    var key = null;
    arr1.map(function (item) {
        if (!arr2.includes(item)) {
            key = item;
            return key;
        }
    });
    return key;
};
