import { Node } from './node';
import { Transition } from './transition';

export class Edge {
  constructor(id: number, name: string, tail: Node, head: Node) {
    this._id = id;
    this._name = name;
    this._tail = tail;
    this._head = head;
    this._transitions = [];
  }

  public get id(): number {
    return this._id;
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

  public addTransition() {
  }

  public removeTransition() {
  }

  private _id: number;
  private _name: string;
  private _tail: Node;
  private _head: Node;
  private _transitions: number[];
}
