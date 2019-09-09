import * as React from 'react';
import { Edge } from './edge';
import { Node } from './node';
import { Scene } from './scene';

interface Properties {
  scene: Scene;
}

export class Canvas extends React.Component<Properties> {
  public render(): JSX.Element {
    return (
      <canvas ref={(thing) => this.canvasRef = thing}/>);
  }

  public componentDidMount() {
    this.drawMachine();
  }

  private drawMachine() {
    for(const edge of this.props.scene.edges) {
      this.drawLine(edge);
    }
    for(const node of this.props.scene.nodes) {
      this.drawCircle(node);
    }
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
