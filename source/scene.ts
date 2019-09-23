import { Edge } from './edge';
import { Node } from './node';
import { Transition, TransitionType } from './transition';

export class Scene {
  constructor() {
    this._nodes = [];
    this._edges = [];
    this._transitions = new Map<number, Transition>();
    this._maxNodeID = 0;
    this._maxEdgeID = 0;
    this._maxTransition = 0;
  }

  public get nodes(): Node[] {
    return this._nodes.slice();
  }

  public get edges(): Edge[] {
    return this._edges.slice();
  }

  public get transitions(): Transition[] {
    const thing = [] as Transition[];
    for(const transition of this._transitions.values()) {
      thing.push(transition);
    }
    return thing;
  }

  public addNode(): void {
    const red = Math.floor(Math.random() * Math.floor(150));
    const green = Math.floor(Math.random() * Math.floor(100));
    const blue = Math.floor(Math.random() * Math.floor(250));
    const someX = Math.floor(Math.random() * Math.floor(500));
    const someY = Math.floor(Math.random() * Math.floor(500));
    const newNode = new Node(
      this._maxNodeID,
      `s${this._maxNodeID}`,
      `rgb(${red}, ${130 + green}, ${20 + blue})`,
      {x: someX, y: someY}
    );
    ++this._maxNodeID;
    this._nodes.push(newNode);
  }

  public deleteNode(nodeToRemove: Node): void {
    for(let i = 0; i < this._nodes.length ; ++i) {
      if(this._nodes[i].id === nodeToRemove.id) {
        this._nodes.splice(i, 1);
      }
    }
  }

  public connectNodes(head: Node, tail: Node) {
    if(this.findEdgeIndexFromEnds(head, tail) >= 0) {
      return;
    }
    const newEdge = new Edge(
      this._maxEdgeID,
      `E${this._maxEdgeID}`,
      tail,
      head
    );
    this._edges.push(newEdge);
    ++this._maxEdgeID;
  }

  public disconnectEdge(head: Node, tail: Node) {
    const index = this.findEdgeIndexFromEnds(head, tail);
    if(this.findEdgeIndexFromEnds(head, tail) >= 0) {
      this._edges.splice(index, 1);
    }
  }

  public deleteEdge(edge: Edge) {
    const index = this.findEdgeIndexFromEdge(edge);
    if(index >= 0) {
      this._edges.splice(index, 1);
    }
  }

  public changeEnds(edge: Edge, head: Node, tail: Node) {
    const index = this.findEdgeIndexFromEdge(edge);
    let i = -1;
    if(head === null) {
      i = this.findEdgeIndexFromEnds(this.edges[index].head, tail);
    } else if(tail == null) {
     i = this.findEdgeIndexFromEnds(head, this.edges[index].tail);
    } else {
      i = this.findEdgeIndexFromEnds(head, tail);
    }
    if(i >= 0) {
      return;
    }
    if(tail !== null) {
      this.edges[index].tail = tail;
    }
    if(head !== null) {
      this.edges[index].head = head;
    }
  }

  public addTransition(type: TransitionType, name: string, code: string) {
    const transition = new Transition(this._maxTransition, type, name, code);
    this._transitions.set(this._maxTransition, transition);
    ++this._maxTransition;
  }

  public getTransitionByID(id: number): Transition {
    if(this._transitions.has(id)) {
      return this._transitions.get(id);
    } else {
      return null;
    }
  }
  private findEdgeIndexFromEnds(head: Node, tail: Node): number {
    for(let i = 0; i < this._edges.length; ++i) {
      const edge = this._edges[i];
      if(edge.head.id === head.id && edge.tail.id === tail.id) {
        return i;
      }
    }
    return -1;
  }

  private findEdgeIndexFromEdge(someEdge: Edge): number {
    for(let i = 0; i < this._edges.length; ++i) {
      const edge = this._edges[i];
      if(edge.id === someEdge.id) {
        return i;
      }
    }
    return -1;
  }

  private _nodes: Node[];
  private _edges: Edge[];
  private _transitions: Map<number, Transition>;
  private _maxNodeID: number;
  private _maxEdgeID: number;
  private _maxTransition: number;
}
