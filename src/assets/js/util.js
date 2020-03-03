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
  }
};

export default util;
