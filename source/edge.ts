import { Node } from './node';
import { Transition } from './transition';

export class Edge {
  constructor(id: number, tail: Node, head: Node) {
    this._id = id;
    this._tail = tail;
    this._head = head;
    this._transition = null;
  }

  public get id(): number {
    return this._id;
  }

  public getLabel(): string {
    return this._id.toString();
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

  public get transition() {
    return this._transition;
  }

  public set transition(transition: Transition) {
    this._transition = transition;
  }

  public removeTransition() {
    this._transition = null;
  }

  private _id: number;
  private _tail: Node;
  private _head: Node;
  private _transition: Transition;
}
