export declare class BinaryNode {
    _value: any;
    _leftChild: BinaryNode;
    _rightChild: BinaryNode;
    _count: number;
    constructor(v?: any, l?: BinaryNode, r?: BinaryNode);
    value: any;
    leftChild: any;
    rightChild: any;
    count: number;
    children(): BinaryNode[];
}
