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
      <div style={CanvasControlPanel.STYLES.wrapper}>
        <Canvas scene={this.props.scene}
            height={500}
            width={500}
            ref={(thing) => this.canvasRef = thing}/>
        <button onClick={this.onAddNodeClick.bind(this)}>Add Node</button>
        <button onClick={this.onConnectEdges.bind(this)}>Add Edge</button>
        <button onClick={this.onRemoveEdge.bind(this)}>Remove Edge</button>
      </div>);
  }

  private onAddNodeClick() {
    const red = (Math.random() * 250) % 250;
    const green = (Math.random() * 50) % 50;
    const blue = (Math.random() * 250) % 250;
    const someX = (Math.random() * 500) % 500;
    const someY = (Math.random() * 500) % 500;
    const newNode = new Node(
      0,
      'new',
      `rgb(${red}, ${150 + green}, ${blue})`,
      {x: someX, y: someY}
    );
    this.props.scene.addNode(newNode);
    this.canvasRef.reDraw();
  }

  private onRemoveEdge() {
    this.canvasRef.removeEdge();
  }

  private onConnectEdges() {
    this.canvasRef.drawEdge();
  }

  private canvasRef: Canvas;
  private static readonly STYLES = {
    wrapper: {
      display: 'flex' as 'flex',
      flexDirection: 'row' as 'row'
    },
    controlPanel: {
      display: 'flex' as 'flex',
      flexDirection: 'column' as 'column'
    }
  };
}
