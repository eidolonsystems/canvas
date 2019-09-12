import * as React from 'react';
import { Edge } from './edge';
import { Position, Node } from './node';
import { Scene } from './scene';
import { Canvas } from './canvas';

interface Properties {
  scene: Scene;
}

export class CanvasControlPanel extends React.Component<Properties> {
  public render(): JSX.Element {
    return (
      <div>
        <Canvas scene={this.props.scene}
            height={500}
            width={500}
            ref={(thing) => this.canvasRef = thing}/>
        <button onClick={this.onClick.bind(this)}>Add Node</button>
      </div>);
  }

  private onClick() {
    const red = (Math.random() * 200) % 200;
    const green = (Math.random() * 50) % 50;
    const blue = (Math.random() * 200) % 200;
    const newNode = new Node(
      0,
      'new',
      `rgb(${red}, ${150 + green}, ${blue})`,
      {x: 50, y: 86}
    );
    this.props.scene.addNode(newNode);
    this.canvasRef.reDraw();
  }

  private canvasRef: Canvas;
}
