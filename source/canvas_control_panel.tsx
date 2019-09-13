import * as React from 'react';
import { Edge } from './edge';
import { Position, Node } from './node';
import { Scene } from './scene';
import { Canvas } from './canvas';

export class CanvasControlPanel extends React.Component {
  public render(): JSX.Element {
    return (
      <div style={CanvasControlPanel.STYLES.wrapper}>
        <Canvas
            height={500}
            width={500}
            ref={(thing) => this.canvasRef = thing}/>
        <button onClick={this.onAddNodeClick.bind(this)}>Add Node</button>
        <button onClick={this.onConnectEdges.bind(this)}>Add Edge</button>
        <button onClick={this.onRemoveEdge.bind(this)}>Remove Edge</button>
      </div>);
  }

  private onAddNodeClick() {
    this.canvasRef.addNode();
  }

  private onRemoveEdge() {
    this.canvasRef.disconnectNode();
  }

  private onConnectEdges() {
    this.canvasRef.connectNodes();
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
