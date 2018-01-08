var BinaryNode = require('./binary_node.js');
var DEFAULT_COMP = function (a, b) {
    if (a < b)
        return -1;
    else if (a === b)
        return 0;
    else if (a > b)
        return 1;
    else
        return false;
};
module.exports = (function () {
    function BinarySearchTree(comp, elements) {
        if (comp === void 0) { comp = DEFAULT_COMP; }
        if (elements === void 0) { elements = new Array(); }
        this._root = undefined;
        this._comp = function (value, node) { return !node ? false : comp(value, node.value); };
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var e = elements_1[_i];
            this.insert(e);
        }
    }
    Object.defineProperty(BinarySearchTree.prototype, "root", {
        get: function () {
            return this._root;
        },
        set: function (node) {
            this._root = node;
        },
        enumerable: true,
        configurable: true
    });
    BinarySearchTree.prototype.insert = function (value) {
        if (!this._root)
            this._root = new BinaryNode(value);
        else {
            var node = this._root;
            var equal = this._comp(value, node);
            while (true) {
                if (equal === -1) {
                    if (!node.leftChild) {
                        node.leftChild = value;
                        break;
                    }
                    else
                        node = node.leftChild;
                }
                else if (equal === 0) {
                    node.count++;
                    break;
                }
                else if (equal === 1) {
                    if (!node.rightChild) {
                        node.rightChild = value;
                        break;
                    }
                    else
                        node = node.rightChild;
                }
                else
                    return false;
                equal = this._comp(value, node);
            }
        }
        return true;
    };
    BinarySearchTree.prototype.get = function (value) {
        var node = this._root;
        var equal = this._comp(value, node);
        while (equal !== 0) {
            if (equal === -1) {
                if (!node.leftChild)
                    return false;
                else
                    node = node.leftChild;
            }
            else if (equal === 1) {
                if (!node.rightChild)
                    return false;
                else
                    node = node.rightChild;
            }
            else
                return false;
            equal = this._comp(value, node);
        }
        return node;
    };
    BinarySearchTree.prototype.delete = function (value) {
        var node = this.get(value);
        if (!node)
            return false;
        else
            node.count--;
        if (node.count === 0) {
            if (node.leftChild) {
                var replacer = replacer.leftChild;
                while (replacer.rightChild)
                    replacer = replacer.rightChild;
                node.value = replacer.value;
                node.count = replacer.count;
                if (!replacer.leftChild)
                    this.parent(replacer.value).rightChild = undefined;
                else {
                    replacer.value = replacer.leftChild.value;
                    replacer.rightChild = replacer.leftChild.rightChild;
                    replacer.leftChild = replacer.leftChild.leftChild;
                    replacer.count = replacer.leftChild.count;
                }
            }
            else if (node.rightChild) {
                var replacer = replacer.rightChild;
                while (replacer.leftChild)
                    replacer = replacer.leftChild;
                node.value = replacer.value;
                node.count = replacer.count;
                if (!replacer.rightChild)
                    this.parent(replacer.value).leftChild = undefined;
                else {
                    replacer.value = replacer.rightChild.value;
                    replacer.leftChild = replacer.rightChild.leftChild;
                    replacer.rightChild = replacer.rightChild.rightChild;
                    replacer.count = replacer.rightChild.count;
                }
            }
            else {
                var parent_1 = this.parent(node.value);
                if (!parent_1)
                    this._root = undefined;
                else if (parent_1.leftChild.value === node.value)
                    parent_1.leftChild = undefined;
                else if (parent_1.rightChild.value === node.value)
                    parent_1.rightChild = undefined;
            }
        }
        return true;
    };
    BinarySearchTree.prototype.parent = function (value) {
        var node = this._root;
        var parent = undefined;
        while (true) {
            if (this._comp(value, node) === -1) {
                parent = node;
                node = node.leftChild;
            }
            else if (this._comp(value, node) === 1) {
                parent = node;
                node = node.rightChild;
            }
            else if (this._comp(value, node) === 0)
                return parent;
            else
                return false;
        }
    };
    BinarySearchTree.prototype.leftSubtree = function (node) {
        if (!node || !node.leftChild)
            return false;
        var t = new BinarySearchTree(this._comp);
        t.root = node.leftChild;
        return t;
    };
    BinarySearchTree.prototype.rightSubtree = function (node) {
        if (!node || !node.rightChild)
            return false;
        var t = new BinarySearchTree(this._comp);
        t.root = node.rightChild;
        return t;
    };
    BinarySearchTree.prototype.preOrderTraversal = function () {
        var result = new Array();
        function traverse(node) {
            if (node && (node.value || node.leftChild || node.rightChild)) {
                for (var i = 0; i < node.count; i++)
                    result.push(node.value);
                traverse(node.leftChild);
                traverse(node.rightChild);
            }
        }
        traverse(this.root);
        return result;
    };
    BinarySearchTree.prototype.inOrderTraversal = function () {
        var result = new Array();
        function traverse(node) {
            if (node && (node.value || node.leftChild || node.rightChild)) {
                traverse(node.leftChild);
                for (var i = 0; i < node.count; i++)
                    result.push(node.value);
                traverse(node.rightChild);
            }
        }
        traverse(this.root);
        return result;
    };
    BinarySearchTree.prototype.postOrderTraversal = function () {
        var result = new Array();
        function traverse(node) {
            if (node && (node.value || node.leftChild || node.rightChild)) {
                traverse(node.leftChild);
                traverse(node.rightChild);
                for (var i = 0; i < node.count; i++)
                    result.push(node.value);
            }
        }
        traverse(this.root);
        return result;
    };
    return BinarySearchTree;
}());
