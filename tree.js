class HuffmanTree{
    constructor(data, freq, left = null, right = null){
        this.data = data;
        this.freq = freq;
        this.left = left;
        this.right = right;
    }
}

module.exports = HuffmanTree;