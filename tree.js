class tree{
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree{
    constructor(){
        this.root = null;
    }
    
    insert(data){
        if(!this.root){
            this.root = new tree(data);
            return;
        }
        const currentNode = this.root;
        while(currentNode.left || currentNode.right){
            currentNode = currentNode.left || currentNode.right;
        }
        if(currentNode.data){
            currentNode.left = new tree(data);
        }
        else{
            currentNode.right = new tree
        }
    }

    search(data) {
        let currentNode = this.root;
        while(currentNode) {
            if(data === currentNode.data){
                return currentNode
            }
            currentNode = currentNode.left || currentNode.right;
        }

        return null;
    }
    delete(data) {
        currentNode = this.root;
        parentNode = null;
    
        while (currentNode) {
          if (currentNode.data === data) {
            // Found the node to delete
            if (!currentNode.left && !currentNode.right) {
              // Leaf node
              if (!parentNode) {
                // Root node
                this.root = null;
              } else {
                if (currentNode === parentNode.left) {
                  parentNode.left = null;
                } else {
                  parentNode.right = null;
                }
              }
              break;
            } else if (!currentNode.left || !currentNode.right) {
              // Node with only one child
              const childNode = currentNode.left ? currentNode.left : currentNode.right;
    
              if (!parentNode) {
                // Root node
                this.root = childNode;
              } else {
                if (currentNode === parentNode.left) {
                  parentNode.left = childNode;
                  childNode.parent = parentNode;
                } else {
                  parentNode.right = childNode;
                  childNode.parent = parentNode;
                }
              }
              break;
            } else {
              // Node with two children
              const successor = currentNode.right;
              let successorParent = currentNode;
    
              while (successor.left) {
                successorParent = successor;
                successor = successor.left;
              }
    
              currentNode.data = successor.data;
    
              if (successorParent !== currentNode) {
                successorParent.left = successor.right;
                if (successor.right) {
                  successor.right.parent = successorParent;
                }
              } else {
                currentNode.right = successor.right;
                if (successor.right) {
                  successor.right.parent = currentNode;
                }
              }
              break;
            }
          }
    
          parentNode = currentNode;
          currentNode = currentNode.left || currentNode.right;
        }
      }


}