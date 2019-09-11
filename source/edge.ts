import { Node } from './node';

export class Edge {
  constructor(name: string, tail: Node, head: Node) {
    this._name = name;
    this._tail = tail;
    this._head = head;
  }

  public get name(): string {
    return this._name;
  }

  public set name(newName: string) {
    this._name = newName;
  }

  public get head(): Node {
    return this._head;
  }

  public set head(newHead: Node) {
    this._head = newHead;
  }

  public get tail(): Node {
    return this._tail;
  }

  public set tail(newTail: Node) {
    this._tail = newTail;
  }

  private _name: string;
  private _tail: Node;
  private _head: Node;
}
