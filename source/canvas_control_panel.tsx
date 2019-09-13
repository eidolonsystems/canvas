import * as React from 'react';
import { Canvas } from './canvas';

export class CanvasControlPanel extends React.Component {
  public render(): JSX.Element {
    return (
      <div style={CanvasControlPanel.STYLES.wrapper}>
        <Canvas
            height={500}
            width={500}
            ref={(thing) => this.canvasRef = thing}/>
        <div style={CanvasControlPanel.STYLES.controlPanel}>
          <button onClick={this.onAddNodeClick.bind(this)}>Add Node</button>
          <button onClick={this.onConnectEdges.bind(this)}>Add Edge</button>
          <button onClick={this.onRemoveEdge.bind(this)}>Remove Edge</button>
        </div>
        <div style={CanvasControlPanel.STYLES.directions}>
          <p>Click on a node to select it.</p>
          <p>Hold and drag the node to reposition it.</p>
          <p>To draw a arrow select two nodes.</p>
          <p>The second node you click on will be the head.</p>
          <p>Click somewhere there is no node to deselect.</p>
          <p>To delete a node select a node and then.
            press backspace or delete.</p>
        </div>
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
    },
    directions: {
      padding: '50px'
    }
  };
}
