import * as React from 'react';
import { Edge } from './edge';
import { Position, Node } from './node';
import { Scene } from './scene';

interface Properties {
  scene: Scene;
  width: number;
  height: number;
}

interface State {

}

export class Canvas extends React.Component<Properties> {
  public render(): JSX.Element {
    return (
      <canvas ref={(thing) => this.canvasRef = thing}
          height={this.props.height}
          width={this.props.width}>
        {'Your browser does not support HTML5 Canvas.'}
      </canvas>);
  }

  public componentDidMount() {
    this.drawMachine();
    this.machineState = 'rest';
    this.isMouseDown = false;
    this.currentNode = null;
    this.previousNode = null;
    this.currentArrow = null;
    this.canvasRef.addEventListener('pointerdown', this.onMouseDown.bind(this));
    this.canvasRef.addEventListener('pointerup', this.onMouseUp.bind(this));
    this.canvasRef.addEventListener('pointermove', this.onMouseMove.bind(this));
    window.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  public componentWillUnmount() {
    this.canvasRef.removeEventListener('pointerdown',
      this.onMouseDown.bind(this));
    this.canvasRef.removeEventListener('pointerup', this.onMouseUp.bind(this));
    this.canvasRef.removeEventListener('pointermove',
      this.onMouseMove.bind(this));
    window.removeEventListener('keydown', this.onKeyDown.bind(this));
  }

  private drawMachine() {
    const ctx = this.canvasRef.getContext('2d');
    ctx.fillStyle = '#f2f2f2';
    ctx.fillRect(0, 0, this.canvasRef.width, this.canvasRef.height);
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
    if(this.currentNode === node) {
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#ff390d';
      ctx.arc(node.position.x, node.position.y, Canvas.radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.closePath();
    } else if(this.previousNode === node) {
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#c70404';
      ctx.arc(node.position.x, node.position.y, Canvas.radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.closePath();
    }
    ctx.beginPath();
    ctx.font = '12px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(node.name, node.position.x, node.position.y);
    ctx.closePath();
  }

  private drawArrow(edge: Edge) {
    const ctx = this.canvasRef.getContext('2d');
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.moveTo(edge.tail.position.x, edge.tail.position.y);
    const tail = edge.tail.position;
    const head = edge.head.position;
    const magnitude = this.computeMagnitude(head, tail);
    const unitVector = {
      x: (head.x - tail.x) / magnitude,
      y: (head.y - tail.y)/magnitude};
    let point1 = {x: 0, y: 0};
    const intersection = this.computeMagnitude(head, tail) - Canvas.radius;
    if(true) {
      point1 = {
        x: tail.x + (intersection * unitVector.x),
        y: tail.y + (intersection * unitVector.y)
      };
    }
    ctx.lineTo(point1.x, point1.y);
    ctx.stroke();
    ctx.closePath();
    this.drawTriangle(edge);
  }

  private drawTriangle(edge: Edge) {
    const tail = edge.tail.position;
    const head = edge.head.position;
    const magnitude = this.computeMagnitude(head, tail);
    const unitVector = {
      x: (head.x - tail.x) / magnitude,
      y: (head.y - tail.y)/magnitude};
    let point1 = {x: 0, y: 0};
    const intersection = this.computeMagnitude(head, tail) - Canvas.radius;
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

  private computeMagnitude(point1: Position, point2: Position) {
    return Math.sqrt(Math.pow((point1.x - point2.x), 2) +
      Math.pow((point1.y - point2.y), 2));
  }

  public reDraw() {
    const ctx = this.canvasRef.getContext('2d');
    ctx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
    this.drawMachine();
  }

  public clearSelected() {
    this.currentNode = null;
    this.previousNode = null;
    this.drawMachine();
  }

  public drawEdge() {
    if(this.currentNode !== null  && this.previousNode !== null) {
      this.props.scene.connectNodes(this.currentNode, this.previousNode);
      this.reDraw();
    }
  }

  private getNode(x: number, y: number) {
    for(const node of this.props.scene.nodes.reverse()) {
      if(Math.pow(x - node.position.x, 2) + Math.pow(y - node.position.y, 2) <=
        Math.pow(Canvas.radius, 2)) {
        return node;
      }
    }
    return null;
  }

  private onMouseDown(event: PointerEvent) {
    this.isMouseDown = true;
    if(this.machineState === 'rest') {
      const newNode = this.getNode(event.offsetX, event.offsetY);
      if(newNode === null) {
        this.clearSelected();
      } else {
        this.previousNode = this.currentNode;
        this.currentNode = newNode;
      }
      this.reDraw();
      this.restState();
    }
  }

  private onMouseUp(event: PointerEvent) {
    this.isMouseDown = false;
    if(this.machineState === 'repositioning') {
      this.restState();
    }
  }

  private onMouseMove(event: PointerEvent) {
    if(this.machineState === 'repositioning') {
      this.currentNode.position = {x: event.offsetX, y: event.offsetY};
      this.repositioningState();
    }
  }

  private onKeyDown(event: KeyboardEvent) {
    console.log('key down!');
    if(event.key === 'Delete' || event.key === 'Backspace') {
      console.log('deleeeeeteeee');
      if(this.currentNode !== null) {
        console.log(this.currentNode);
        this.props.scene.deleteNode(this.currentNode);
        this.reDraw();
      }
    }
  }

  private restState() {
    this.machineState = 'rest';
    if(this.currentNode && this.isMouseDown) {
      this.repositioningState();
    }
  }

  private repositioningState() {
    this.machineState = 'repositioning';
    this.reDraw();
  }

  private machineState: string;
  private canvasRef: HTMLCanvasElement;
  private currentNode: Node;
  private previousNode: Node;
  private currentArrow: Node;
  private isMouseDown: boolean;
  private static radius = 30;
  private static arrowLenght = 10;
  private static arrowWidth = 5;
}
