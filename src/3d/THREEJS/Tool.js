class Tool {
  static findMesh(father, name) {
    return father.children.find(item=>{return item.name===name})
  }
}
export default Tool
