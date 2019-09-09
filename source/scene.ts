import { Edge } from "./edge";
import { Node } from "./node";

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

  private _nodes: Node[];
  private _edges: Edge[];
}
