'use strict';
const BinaryNode = require('./binary_node.js');
var DEFAULT_COMP = (a, b) => {
    if (a < b) {
        return -1;
    }
    else if (a === b) {
        return 0;
    }
    else if (a > b) {
        return 1;
    }
};
module.exports = class BinarySearchTree {
    constructor(comp = DEFAULT_COMP, elements = []) {
        this.root = undefined;
        this._baseComp = comp;
        this._comp = (value, node) => {
            try {
                return comp(value, node.value);
            }
            catch (_a) {
                return undefined;
            }
        };
        for (const e of elements) {
            this.insert(e);
        }
    }
    get root() {
        return this._root;
    }
    set root(node) {
        this._root = node;
    }
    insert(value) {
        let node = this.root;
        if (node === undefined) {
            this.root = new BinaryNode(value);
            return true;
        }
        while (true) {
            const equal = this._comp(value, node);
            if (equal < 0) {
                if (node.hasLeftChild()) {
                    node = node.leftChild;
                }
                else {
                    node.leftChild = new BinaryNode(value);
                    return true;
                }
            }
            else if (equal === 0) {
                node.count++;
                return true;
            }
            else if (equal > 0) {
                if (node.hasRightChild()) {
                    node = node.rightChild;
                }
                else {
                    node.rightChild = new BinaryNode(value);
                    return true;
                }
            }
            else {
                return false;
            }
        }
    }
    get(value) {
        let node = this.root;
        while (true) {
            const equal = this._comp(value, node);
            if (equal < 0) {
                node = node.leftChild;
            }
            else if (equal === 0) {
                return node;
            }
            else if (equal > 0) {
                node = node.rightChild;
            }
            else {
                return undefined;
            }
        }
    }
    delete(value) {
        const node = this.get(value);
        let replacer = undefined;
        if (node === undefined) {
            return false;
        }
        else {
            node.count--;
        }
        if (node.count === 0) {
            if (node.hasLeftChild()) {
                replacer = node.leftChild;
                while (replacer.hasRightChild()) {
                    replacer = replacer.rightChild;
                }
                node.value = replacer.value;
                node.count = replacer.count;
                if (!replacer.hasLeftChild()) {
                    this.parent(replacer.value).rightChild = undefined;
                }
                else {
                    replacer.value = replacer.leftChild.value;
                    replacer.rightChild = replacer.leftChild.rightChild;
                    replacer.count = replacer.leftChild.count;
                    replacer.leftChild = replacer.leftChild.leftChild;
                }
            }
            else if (node.hasRightChild()) {
                replacer = node.rightChild;
                while (replacer.hasLeftChild()) {
                    replacer = replacer.leftChild;
                }
                node.value = replacer.value;
                node.count = replacer.count;
                if (!replacer.hasRightChild()) {
                    this.parent(replacer.value).leftChild = undefined;
                }
                else {
                    replacer.value = replacer.rightChild.value;
                    replacer.leftChild = replacer.rightChild.leftChild;
                    replacer.count = replacer.rightChild.count;
                    replacer.rightChild = replacer.rightChild.rightChild;
                }
            }
            else {
                const parent = this.parent(node.value);
                if (parent === undefined) {
                    this._root = undefined;
                }
                else if (parent.leftChild.value === node.value) {
                    parent.leftChild = undefined;
                }
                else if (parent.rightChild.value === node.value) {
                    parent.rightChild = undefined;
                }
            }
        }
        return true;
    }
    parent(value) {
        let node = this.root;
        let parent = undefined;
        while (true) {
            const equal = this._comp(value, node);
            if (equal < 0) {
                parent = node;
                node = node.leftChild;
            }
            else if (equal === 0) {
                return parent;
            }
            else if (equal > 0) {
                parent = node;
                node = node.rightChild;
            }
            else {
                return undefined;
            }
        }
    }
    leftSubtree(node) {
        if (node === undefined || !node.hasLeftChild()) {
            return undefined;
        }
        const t = new BinarySearchTree(this._baseComp);
        t.root = node.leftChild;
        return t;
    }
    rightSubtree(node) {
        if (node === undefined || !node.hasRightChild()) {
            return undefined;
        }
        const t = new BinarySearchTree(this._baseComp);
        t.root = node.rightChild;
        return t;
    }
    preOrderTraversal() {
        const result = [];
        traverse(this.root);
        return result;
        function traverse(node) {
            if (node === undefined) {
                return;
            }
            for (let i = 0; i < node.count; i++) {
                result.push(node.value);
            }
            traverse(node.leftChild);
            traverse(node.rightChild);
        }
    }
    inOrderTraversal() {
        const result = [];
        traverse(this.root);
        return result;
        function traverse(node) {
            if (node === undefined) {
                return;
            }
            traverse(node.leftChild);
            for (let i = 0; i < node.count; i++) {
                result.push(node.value);
            }
            traverse(node.rightChild);
        }
    }
    postOrderTraversal() {
        const result = [];
        traverse(this.root);
        return result;
        function traverse(node) {
            if (node === undefined) {
                return;
            }
            traverse(node.leftChild);
            traverse(node.rightChild);
            for (let i = 0; i < node.count; i++) {
                result.push(node.value);
            }
        }
    }
};
