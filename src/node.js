class Node {
  constructor(data, priority) {
    this.data = data;
    this.priority = priority;
    this.parent = null;
    this.left = null;
    this.right = null;
  }

  appendChild(node) {
    if (!this.left) {
      this.left = node;
      this.left.parent = this;
    } else if (!this.right) {
      this.right = node;
      this.right.parent = this;
    }
  }

  removeChild(node) {
    if (this.left === node) {
      this.left.parent = null;
      this.left = null;
    } else if (this.right === node) {
      this.right.parent = null;
      this.right = null;
    } else {
      throw new Error('Passed node is not a child of this node');
    }
  }

  remove() {
    if (!this.parent) { return; }
    this.parent.removeChild(this);
  }

  swapWithParent() {
    const childNode = this;
    const parentNode = this.parent;
    let tempNode = null;
    let marker = null;

    if (parentNode !== null) {
      if (parentNode.left === childNode) {
        tempNode = parentNode.right;
        marker = NaN;
      } else if (parentNode.right === childNode) {
        tempNode = parentNode.left;
      }
    } else return;
    if (parentNode.parent !== null) {
      if (parentNode === parentNode.parent.right) {
        parentNode.parent.right = childNode;
      } else parentNode.parent.left = childNode;
    }

    if (this.left !== null) {
      this.left.parent = this.parent;
    }
    if (this.right !== null) {
      this.right.parent = this.parent;
    }
    this.parent.left = this.left;
    this.parent.right = this.right;
    this.parent = parentNode.parent;
    parentNode.parent = childNode;

    if (tempNode !== null) {
      tempNode.parent = childNode;
    }
    if (marker !== null) {
      childNode.right = tempNode;
      childNode.left = parentNode;
    } else {
      childNode.left = tempNode;
      childNode.right = parentNode;
    }
  }
}

module.exports = Node;
