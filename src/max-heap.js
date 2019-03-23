const Node = require('./node');

class MaxHeap {
  constructor() {
    this.root = null;
    this.parentNodes = [];
    this.sizeOfHeap = 0;
  }

  push(data, priority) {
    const node = new Node(data, priority);
    this.sizeOfHeap += 1;
    this.insertNode(node);
    this.shiftNodeUp(node);
  }

  pop() {
    this.sizeOfHeap -= 1;
    if (!this.root) { return; }
    const { data } = this.root;
    const root = this.detachRoot();
    this.restoreRootFromLastInsertedNode(root);
    if (this.root) {
      this.shiftNodeDown(this.root);
    }
    return data;
  }

  detachRoot() {
    const detached = this.root;
    this.root = null;

    for (let i = 0; i < this.parentNodes.length; i += 1) {
      if (this.parentNodes[i] === detached) {
        this.parentNodes.shift();
        break;
      }
    }

    return detached;
  }

  restoreRootFromLastInsertedNode(detached) {
    const lastInsert = this.parentNodes.pop();

    if (lastInsert && detached) {
      if (lastInsert.parent && lastInsert.parent.right === lastInsert
          && lastInsert.parent !== detached) {
        this.parentNodes.unshift(lastInsert.parent);
      }
      if (lastInsert.parent) {
        lastInsert.parent.removeChild(lastInsert);
      }
      lastInsert.left = detached.left;
      lastInsert.right = detached.right;
      if (!detached.left || !detached.right) {
        this.parentNodes.unshift(lastInsert);
      }
      if (lastInsert.right) {
        lastInsert.right.parent = lastInsert;
      }
      if (lastInsert.left) {
        lastInsert.left.parent = lastInsert;
      }
      this.root = lastInsert;
    }
  }

  size() {
    return this.sizeOfHeap;
  }

  isEmpty() {
    if (this.sizeOfHeap === 0) {
      return true;
    }
    return false;
  }

  clear() {
    this.root = null;
    this.parentNodes = [];
    this.sizeOfHeap = 0;
  }

  insertNode(node) {
    if (!this.root) {
      this.parentNodes.push(node);
      this.root = this.parentNodes[0];
    } else {
      if (this.parentNodes[0].left && this.parentNodes[0].right) {
        this.parentNodes.shift();
      }
      this.parentNodes.push(node);
      this.parentNodes[0].appendChild(this.parentNodes[this.parentNodes.length - 1]);

      if (this.parentNodes[0].left && this.parentNodes[0].right) {
        this.parentNodes.shift();
      }
    }
  }

  shiftNodeUp(node) {
    if (node.parent) {
      if (node.parent.priority < node.priority) {
        const nodeIndex = this.parentNodes.indexOf(node);
        const nodeParentIndex = this.parentNodes.indexOf(node.parent);
        if (nodeIndex !== -1) {
          if (nodeParentIndex !== -1) {
            const tempNode = this.parentNodes[nodeIndex];
            this.parentNodes[nodeIndex] = this.parentNodes[nodeParentIndex];
            this.parentNodes[nodeParentIndex] = tempNode;
          } else {
            this.parentNodes[nodeIndex] = node.parent;
          }
        }
        node.swapWithParent();
        this.shiftNodeUp(node);
      }
    } else {
      this.root = node;
    }
  }

  shiftNodeDown(node) {
    let nodeChild;
    if (node.left && node.right && node.left.priority > node.right.priority) {
      nodeChild = node.left;
    } else if (node.left && node.right && node.left.priority <= node.right.priority) {
      nodeChild = node.right;
    } else if (node.left && node.left.priority > node.priority) {
      nodeChild = node.left;
    } else {
      return;
    }

    const nodeIndex = this.parentNodes.indexOf(node);
    const nodeChildIndex = this.parentNodes.indexOf(nodeChild);
    if (nodeChildIndex !== -1) {
      if (nodeIndex !== -1) {
        const tempNode = this.parentNodes[nodeIndex];
        this.parentNodes[nodeIndex] = this.parentNodes[nodeChildIndex];
        this.parentNodes[nodeChildIndex] = tempNode;
      } else {
        this.parentNodes[nodeChildIndex] = node;
      }
    }
    if (node === this.root) {
      this.root = nodeChild;
    }
    nodeChild.swapWithParent();
    this.shiftNodeDown(node);
  }
}

module.exports = MaxHeap;
