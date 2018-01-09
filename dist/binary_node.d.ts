export declare class BinaryNode {
    private _value;
    private _leftChild;
    private _rightChild;
    private _count;
    constructor(v?: any, l?: BinaryNode, r?: BinaryNode);
    value: any;
    leftChild: BinaryNode;
    rightChild: BinaryNode;
    count: number;
    children(): BinaryNode[];
}
