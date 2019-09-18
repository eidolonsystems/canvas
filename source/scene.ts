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

  public deleteNode(nodeToRemove: Node): void {
    for(let i = 0; i < this._nodes.length ; ++i) {
      if(this._nodes[i].id === nodeToRemove.id) {
        this._nodes.splice(i, 1);
      }
    }
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
  private _maxNodeID: number;
  private _maxEdgeID: number;
}
