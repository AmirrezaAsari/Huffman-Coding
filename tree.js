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
}