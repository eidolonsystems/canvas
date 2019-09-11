import * as React from 'react';
import { Edge } from './edge';
import { Position, Node } from './node';
import { Scene } from './scene';

interface Properties {
  scene: Scene;
}

export class Canvas extends React.Component<Properties> {
  public render(): JSX.Element {
    return (
      <canvas ref={(thing) => this.canvasRef = thing}
          height={500}
          width={600}>
        {'Your browser does not support HTML5 Canvas.'}
      </canvas>);
  }

  public componentDidMount() {
    this.drawMachine();
    this.machineState = 'rest';
    this.canvasRef.addEventListener('pointerdown', this.onMouseDown.bind(this));
    this.canvasRef.addEventListener('pointerup', this.onMouseUp.bind(this));
    this.canvasRef.addEventListener('pointermove', this.onMouseMove.bind(this));
  }

  public componentWillUnmount() {
    this.canvasRef.removeEventListener('pointerdown',
      this.onMouseDown.bind(this));
    this.canvasRef.removeEventListener('pointerup', this.onMouseUp.bind(this));
    this.canvasRef.removeEventListener('pointermove',
      this.onMouseMove.bind(this));
  }

  private drawMachine() {
    for(const edge of this.props.scene.edges) {
      this.drawArrow(edge);
    }
    for(const node of this.props.scene.nodes) {
      this.drawCircle(node);
    }
  }

  private drawCircle(node: Node) {
    const ctx = this.canvasRef.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = node.color;
    ctx.arc(node.position.x, node.position.y, Canvas.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.font = '12px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(node.name, node.position.x, node.position.y);
    ctx.closePath();
  }

  private drawArrow(edge: Edge) {
    const ctx = this.canvasRef.getContext('2d');
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.moveTo(edge.tail.position.x, edge.tail.position.y);
    ctx.lineTo(edge.head.position.x, edge.head.position.y);
    ctx.stroke();
    ctx.closePath();
    this.drawTriangle(edge);
  }

  private drawTriangle(edge: Edge) {
    const tail = edge.tail.position;
    const head = edge.head.position;

    const magnitude = Math.sqrt(Math.pow((head.x - tail.x), 2) +
      Math.pow((head.y - tail.y), 2));
    const unitVector = {x: (head.x - tail.x) / magnitude,
      y: (head.y - tail.y)/magnitude};
    let point1 = {x: 0, y: 0};
    const intersection =
      this.distanceBetweenPoints(head, tail) - Canvas.radius;
    if(intersection <= 0) {
      return;
    } else {
      point1 = {
        x: tail.x + (intersection * unitVector.x),
        y: tail.y + (intersection * unitVector.y)
      };
    }
    const helperPoint = {
        x: tail.x + ((intersection - Canvas.arrowLenght) * unitVector.x),
        y: tail.y + ((intersection - Canvas.arrowLenght) * unitVector.y)
    };
    const helperUnitMag = (Math.sqrt(Math.pow((helperPoint.x - point1.x), 2) +
          Math.pow((helperPoint.y - point1.y) , 2)));
    const helperUnitVector = {
      x: (helperPoint.x - point1.x) / helperUnitMag,
      y: (helperPoint.y - point1.y) / helperUnitMag
    };
    const helperPerp = {x: -helperUnitVector.y, y: helperUnitVector.x };
    const helperPerpMagnitude = Math.sqrt(
      Math.pow(helperPerp.x, 2) + Math.pow(helperPerp.y, 2));
    const helperPerpUnitVector = {
      x: helperPerp.x / helperPerpMagnitude,
      y: helperPerp.y / helperPerpMagnitude
    };
    const point2 = {
      x: helperPoint.x + (Canvas.arrowWidth * helperPerpUnitVector.x),
      y: helperPoint.y + (Canvas.arrowWidth * helperPerpUnitVector.y)
    };
    const point3 = {
      x: helperPoint.x - (Canvas.arrowWidth * helperPerpUnitVector.x),
      y: helperPoint.y - (Canvas.arrowWidth * helperPerpUnitVector.y)
    };
    const ctx = this.canvasRef.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.lineTo(point3.x, point3.y);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
  }

  private distanceBetweenPoints(point1: Position, point2: Position) {
    return Math.sqrt(Math.pow((point1.x - point2.x), 2) +
      Math.pow((point1.y - point2.y), 2));
  }

  private reDraw() {
    const ctx = this.canvasRef.getContext('2d');
    ctx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
    this.drawMachine();
  }

  private getNode(x: number, y: number) {
    for(const node of this.props.scene.nodes) {
      if(Math.pow(x - node.position.x, 2) + Math.pow(y - node.position.y, 2) <=
        Math.pow(Canvas.radius, 2)) {
        return node;
      }
    }
  }

  private onMouseDown(event: PointerEvent) {
    if(this.machineState === 'rest') {
      this.currentNode = this.getNode(event.offsetX, event.offsetY);
      this.restState();
    }
  }

  private onMouseUp(event: PointerEvent) {
    if(this.machineState === 'repositioning') {
      this.currentNode = null;
      this.restState();
    }
  }

  private onMouseMove(event: PointerEvent) {
    if(this.machineState === 'repositioning') {
      this.currentNode.position = {x: event.offsetX, y: event.offsetY};
      this.repositioningState();
    }
  }

  private restState() {
    this.machineState = 'rest';
    if(this.currentNode) {
      this.repositioningState();
    } else {
      this.currentNode = null;
    }
  }

  private repositioningState() {
    this.machineState = 'repositioning';
    this.reDraw();
  }

  private machineState: string;
  private canvasRef: HTMLCanvasElement;
  private currentNode: Node;
  private static radius = 20;
  private static arrowLenght = 10;
  private static arrowWidth = 5;
}
