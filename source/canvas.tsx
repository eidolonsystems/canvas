import * as React from 'react';
import { Edge } from './edge';
import { Position, Node } from './node';
import { Scene } from './scene';

interface Properties {
  width: number;
  height: number;
  scene: Scene;
  currentNode?: Node | null;
  previousNode?: Node | null;
  onNodeSelected?: (node: Node) => void;
  onClearNodes?: () => void;
}

interface State {
  isMouseInside: boolean;
}

export class Canvas extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isMouseInside: false
    };
  }

  public render(): JSX.Element {
    return (
      <canvas ref={(thing) => this.canvasRef = thing}
          height={this.props.height}
          width={this.props.width}
          onMouseEnter={this.onMouseEnter.bind(this)}
          onMouseLeave={this.onMouseLeave.bind(this)}>
        {'Your browser does not support HTML5 Canvas.'}
      </canvas>);
  }

  public componentDidMount() {
    this.drawMachine();
    this.machineState = 'rest';
    this.isMouseDown = false;
    this.canvasRef.addEventListener('pointerdown', this.onMouseDown.bind(this));
    this.canvasRef.addEventListener('pointerup', this.onMouseUp.bind(this));
    this.canvasRef.addEventListener('pointermove', this.onMouseMove.bind(this));
    document.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  public componentDidUpdate() {
    this.drawMachine();
  }

  public componentWillUnmount() {
    this.canvasRef.removeEventListener('pointerdown',
      this.onMouseDown.bind(this));
    this.canvasRef.removeEventListener('pointerup', this.onMouseUp.bind(this));
    this.canvasRef.removeEventListener('pointermove',
      this.onMouseMove.bind(this));
    document.removeEventListener('keydown', this.onKeyDown.bind(this));
  }

  private drawMachine() {
    const ctx = this.canvasRef.getContext('2d');
    ctx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
    ctx.fillStyle = '#f2f2f2';
    ctx.fillRect(0, 0, this.canvasRef.width, this.canvasRef.height);
    for(const edge of this.props.scene.edges) {
      if(edge.head === edge.tail) {
        this.drawLoop(edge);
      } else {
        this.drawArrow(edge);
      }
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
    if(this.props.currentNode === node) {
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#cc004e';
      ctx.arc(node.position.x, node.position.y, Canvas.radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.closePath();
    } else if(this.props.previousNode === node) {
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#4a0101';
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

  private drawLoop(edge: Edge) {
    if(edge.head === null) {
      return;
    }
    const ctx = this.canvasRef.getContext('2d');
    const intersection = {
      x: edge.head.position.x + Canvas.radius ,
      y: edge.head.position.y
    };
    const loopCenter = {
      x: edge.head.position.x + (Canvas.radius / 2) + Canvas.arrowLenght,
      y: edge.head.position.y + (Canvas.radius / 2) + (2 * Canvas.arrowWidth)
    };
    const somePoint = ({
      x: edge.head.position.x + Canvas.radius + 50 + Canvas.arrowLenght,
      y: edge.head.position.y
    });
    ctx.beginPath();
    ctx.arc(loopCenter.x, loopCenter.y, Canvas.radius,
      Math.PI, ((Math.PI / 2) * -1) + 0.5, true);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.font = '12px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(edge.name, loopCenter.x + 5, loopCenter.y + 5);
    ctx.closePath();
    this.drawTriangleForLoop(edge.head.position, intersection);
  }

  private drawArrow(edge: Edge) {
    const ctx = this.canvasRef.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(edge.tail.position.x, edge.tail.position.y);
    const tail = edge.tail.position;
    const head = edge.head.position;
    const magnitude = this.computeMagnitude(head, tail);
    const unitVector = {
      x: (head.x - tail.x) / magnitude,
      y: (head.y - tail.y) / magnitude};
    let endPoint = {x: 0, y: 0};
    const intersection = this.computeMagnitude(head, tail) - Canvas.radius;
    let labelPoint = {
      x: tail.x + (intersection / 2.5 * unitVector.x),
      y: tail.y + (intersection / 2.5 * unitVector.y)
    };
    labelPoint = {
      x: labelPoint.x - (20 * unitVector.y),
      y: labelPoint.y + (20 * unitVector.x)
    };
    ctx.font = '500 14px Arial';
    ctx.fillStyle = 'navy';
    ctx.fillText(edge.name, labelPoint.x, labelPoint.y);
    endPoint = {
      x: tail.x + (intersection * unitVector.x),
      y: tail.y + (intersection * unitVector.y)
    };
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.lineTo(endPoint.x, endPoint.y);
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
      y: (head.y - tail.y) / magnitude};
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

  private drawTriangleForLoop(nodePosition: Position, origin: Position) {
    const magnitude = this.computeMagnitude(nodePosition, origin);
    const unitVector = {
      x: (origin.x - nodePosition.x) / magnitude,
      y: (origin.y - nodePosition.y) / magnitude};
    const helper = {
        x: origin.x + (Canvas.arrowLenght * unitVector.x),
        y: origin.y + (Canvas.arrowLenght * unitVector.y)
    };
    const perpendicular = {
      x: -unitVector.y,
      y: unitVector.x
    };
    const point2 = {
      x: helper.x + (perpendicular.x * Canvas.arrowWidth),
      y: helper.y + (perpendicular.y * Canvas.arrowWidth)
    };
    const point3 = {
      x: helper.x - (perpendicular.x * Canvas.arrowWidth),
      y: helper.y - (perpendicular.y * Canvas.arrowWidth)
    };
    const ctx = this.canvasRef.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
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
        this.props.onClearNodes();
      } else {
        this.props.onNodeSelected(newNode);
      }
      this.restState();
    }
  }

  private onMouseEnter() {
    this.setState({isMouseInside: true});
  }

  private onMouseLeave() {
    this.setState({isMouseInside: false});
  }

  private onMouseUp(event: PointerEvent) {
    this.isMouseDown = false;
    if(this.machineState === 'repositioning') {
      this.restState();
    }
  }

  private onMouseMove(event: PointerEvent) {
    if(this.machineState === 'repositioning') {
      this.props.currentNode.position = {x: event.offsetX, y: event.offsetY};
      this.repositioningState();
    }
  }

  private onKeyDown(event: KeyboardEvent) {
    if(this.state.isMouseInside) {
      if(event.key === 'Delete' || event.key === 'Backspace') {
        if(this.props.currentNode !== null) {
          this.props.scene.deleteNode(this.props.currentNode);
          this.drawMachine();
        }
      }
    }
  }

  private restState() {
    this.machineState = 'rest';
    if(this.props.currentNode && this.isMouseDown) {
      this.repositioningState();
    }
  }

  private repositioningState() {
    this.machineState = 'repositioning';
    this.drawMachine();
  }

  private machineState: string;
  private canvasRef: HTMLCanvasElement;
  private isMouseDown: boolean;
  private static radius = 28;
  private static arrowLenght = 10;
  private static arrowWidth = 5;
}
