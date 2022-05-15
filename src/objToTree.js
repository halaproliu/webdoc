var obj = [
  { "id": 3, "parent": 2 },
  { "id": 1, "parent": null },
  { "id": 2, "parent": 1 }
]

const objToTree = function (items) {
  const result = {
    obj: {}
  }  // 存放结果集
  const itemMap = {}  // 
    
  // 先转成map存储
  for (const item of items) {
    itemMap[item.id] = {...item, children: []}
  }
  
  for (const item of items) {
    const id = item.id
    const pid = item.parent
    const treeItem = itemMap[id]
    if (pid === null) {
      result.obj = treeItem
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: []
        }
      }
      itemMap[pid].children.push(treeItem)
    }
  }
  return result
}