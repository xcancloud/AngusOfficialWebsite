
function treeToArray (tree, formater) {
  if (typeof tree !== 'object' || !tree.length) {
    return [];
  }
  const result = [];
  function handler (_data, level, parent) {
    if (!_data?.length) {
      return [];
    }
    for (let i = 0, len = _data.length; i < len; i++) {
      const tempEle = (typeof formater === 'function') ? formater(_data[i], level, parent) : _data[i];
      const _children = _data[i].children?.map(item => item.id) || [];
      const temp = {
        ...tempEle,
        pid: parent?.id || '-1',
        level,
        children: _children
      };
      result.push(temp);
      const children = _data[i].children;
      if (children) {
        handler(children, level + 1, _data[i]);
      }
    }
  }
  handler(tree, 1);
  return result;
};

export { treeToArray };
