import { BinaryNode } from './binary_node.js';
export declare class BinarySearchTree {
    private _root;
    private _baseComp;
    private _comp;
    constructor(comp?: (a: number, b: number) => number, elements?: any[]);
    root: BinaryNode;
    insert(value: any): boolean;
    get(value: any): BinaryNode;
    delete(value: any): boolean;
    parent(value: any): BinaryNode;
    leftSubtree(node: BinaryNode): BinarySearchTree;
    rightSubtree(node: BinaryNode): BinarySearchTree;
    preOrderTraversal(): any[];
    inOrderTraversal(): any[];
    postOrderTraversal(): any[];
}
