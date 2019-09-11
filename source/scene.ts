import { Edge } from './edge';
import { Node } from './node';

export class Scene {
  constructor(nodes: Node[], edges: Edge[]) {
    this._nodes = nodes.slice();
    this._edges = edges.slice();
  }

  public get nodes(): Node[] {
    return this._nodes.slice();
  }

  public get edges(): Edge[] {
    return this._edges.slice();
  }

  public addNode(node: Node): void {
    this._nodes.push(node);
  }

  public deleteNode(nodeToRemove: Node): void {
    for(let i = 0; i < this._nodes.length ; ++i) {
      if(this._nodes[i].name === nodeToRemove.name &&
          this._nodes[i].color === nodeToRemove.color &&
          this._nodes[i].position.x === nodeToRemove.position.x &&
          this._nodes[i].position.y === nodeToRemove.position.y) {
        this._nodes.splice(i, 1);
      }
    }
  }

  private _nodes: Node[];
  private _edges: Edge[];
}
