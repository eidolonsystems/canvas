import * as React from 'react';
import { Edge } from "./edge";
import { Node } from "./node";

export class Canvas extends React.Component {
  public render(): JSX.Element {
    return (
      <canvas ref={(thing) => this.canvasRef = thing}/>);
  }

  public componentDidMount() {
    const node1 = new Node('s1', '#1cd2ff', {x: 10, y: 10} );
    const node2 = new Node('s2', '#ff7da6', {x: 50, y: 90});
    const edge = new Edge('e1', node1, node2);
    this.drawCircle(node1);
    this.drawCircle(node2);
    this.drawLine(edge);
  }

  private drawCircle(node: Node) {
    const ctx = this.canvasRef.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = node.color;
    ctx.arc(node.position.x, node.position.y, 10, 0, 2 * Math.PI);
    console.log('colorz', node.color, ctx.fillStyle.toString());
    ctx.fill();
    ctx.closePath();
  }

  private drawLine(edge: Edge) {
    const ctx = this.canvasRef.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(edge.tail.position.x, edge.tail.position.y);
    ctx.lineTo(edge.head.position.x, edge.head.position.y);
    ctx.stroke();
    ctx.closePath();
  }

  private canvasRef: HTMLCanvasElement;
}
