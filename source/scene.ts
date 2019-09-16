import { Edge } from './edge';
import { Node } from './node';

export class Scene {
  constructor(nodes: Node[], edge: Edge[]) {
    this._nodes = [];
    this._edges = [];
    this._maxNodeID = 0;
    this._maxEdgeID = 0;
  }

  public get nodes(): Node[] {
    return this._nodes.slice();
  }

  public get edges(): Edge[] {
    return this._edges.slice();
  }

  public addNode(node: Node): void {
    node.id = this._maxNodeID;
    node.name = `s${node.id}`;
    this._nodes.push(node);
    ++this._maxNodeID;
  }

  public addEdge(edge: Edge): void {
    edge.id = this._maxEdgeID;
    this._edges.push(edge);
    ++this._maxEdgeID;
  }

  public deleteNode(nodeToRemove: Node): void {
    for(let i = 0; i < this._nodes.length ; ++i) {
      if(this._nodes[i].id === nodeToRemove.id) {
        this._nodes.splice(i, 1);
      }
    }
  }

  public removeEdge(head: Node, tail: Node) {
    const index = this.findEdgeIndex(head, tail);
    if(this.findEdgeIndex(head, tail) > 0) {
      this._edges.splice(index, 1);
    }
  }

  public getRandomNode(): Node {
    const random =
      (Math.random() * (this._nodes.length - 1)) % (this._nodes.length - 1);
    return this._nodes.slice(random, random + 1)[0];
  }

  public findEdge(head: Node, tail: Node): Edge {
    if(head === null || tail === null) {
      return null;
    }
    for(let i = 0; i < this._edges.length; ++i) {
      const edge = this._edges[i];
      if(edge.head.id === head.id && edge.tail.id === tail.id) {
        return edge;
      }
    }
    return null;
  }

  public connectNodes(head: Node, tail: Node) {
    if(this.findEdgeIndex(head, tail) > 0) {
      return;
    }
    const newEdge = new Edge(
      0,
      `E${this._maxEdgeID}`,
      tail,
      head
    );
    this.addEdge(newEdge);
  }

  private findEdgeIndex(head: Node, tail: Node): number {
    for(let i = 0; i < this._edges.length; ++i) {
      const edge = this._edges[i];
      if(edge.head.id === head.id && edge.tail.id === tail.id) {
        return i;
      }
    }
    return -1;
  }

  private _nodes: Node[];
  private _edges: Edge[];
  private _maxNodeID: number;
  private _maxEdgeID: number;
}
