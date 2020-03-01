const util = {
  /*
   例如
   传入其请求路径"Erp/count/exportCountDepot"
   请求参数:req = {
   depot_id:"1",
   type:1
   }
   context:this(vue实例)
   得到结果http://erp.jcsjzx.cn/Erp/count/exportCountDepot?user_id=86&token=a70398ab4513d5ec7355bd3cd364f442d356770a
   &type=1&depot_id=1
   * */
  getUrlPara (url, req, context) {
    return url + '?' + delegateObj.geSearchParams(req, context)
  },
  geSearchParams (req, context) {
    console.log(context);
    let arr = [];
    Object.keys(req).forEach((key) => {
      arr.push(key + '=' + req[key])
    });
    return arr.join('&')
  },
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
  }
};

let delegateObj = util;
export default util;
