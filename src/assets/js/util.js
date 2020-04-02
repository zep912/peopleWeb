import store from '@/store/index'
const util = {
  // 递归处理数组tree, 需要保留层级level
  treeHandle(tree = [], level) {
    tree.forEach(item => {
      if (level && level === item.level) {
        delete item.children;
      }
      if (item.children && item.children.length) {
        this.treeHandle(item.children, level);
      } else {
        delete item.children;
      }
    });
    return tree;
  },
  /*
  * 判断页面，获取搜索条件缓存
  * @params {to,from,next} vue路由守卫默认参数
  * @params {fromName,pageName,request} 分别为去往的页面名称（需要缓存的页面)、当前页面名称、请求实体
  * */
  setSearchCache({ to, from, next }, { toName, pageName, request }) {
    store.dispatch('setCache', { name: pageName, request })
  },
  /*
   * 判断页面，获取搜索条件缓存
   * @params {to,from,next} vue路由守卫默认参数
   * @params {fromName,pageName,request} 分别为去往的页面名称（需要缓存的页面)、当前页面名称、请求实体
   * */
  getSearchCache({ to, from, next }, { fromName, pageName }) {
    return store.getters.searchCache[pageName]
  },
};

export default util;
