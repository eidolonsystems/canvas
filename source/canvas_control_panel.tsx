import * as React from 'react';
import { Canvas } from './canvas';
import { NodeEditor } from './node_editor';

interface Properties {

}

interface State {
  currentNode: Node;
}

export class CanvasControlPanel extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      currentNode: null
    };
  }

  public render(): JSX.Element {
    return (
      <div style={CanvasControlPanel.STYLES.wrapper}>
        <div style={CanvasControlPanel.STYLES.controlPanel}>
          <Canvas
            height={500}
            width={500}
            onNodeSelected={this.currentNodeUpdated.bind(this)}
            ref={(thing) => this.canvasRef = thing}/>
          <NodeEditor
            node={this.state.currentNode}
            ref={(thing) => this.nodeEditorRef = thing}/>
        </div>
        <div style={CanvasControlPanel.STYLES.controlPanel}>
          <button onClick={this.onAddNodeClick.bind(this)}
              style={CanvasControlPanel.STYLES.button}>
            Add Node
          </button>
          <button onClick={this.onConnectEdges.bind(this)}
              style={CanvasControlPanel.STYLES.button}>
            Add Edge
          </button>
          <button onClick={this.onRemoveEdge.bind(this)}
              style={CanvasControlPanel.STYLES.button}>
            Remove Edge
          </button>
        </div>
        <div style={CanvasControlPanel.STYLES.directions}>
          Click on a node to select it.
          <br/>Hold and drag the node to reposition it.
          <br/>To draw a arrow select two nodes.
          <br/>The second node you click on will be the head.
          <br/>Click somewhere there is no node to deselect.
          <br/>To delete a node select a node and then.
            press backspace or delete.
        </div>
      </div>);
  }

  private currentNodeUpdated(node: Node) {
    this.setState({
      currentNode: node
    });
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
  private nodeEditorRef: NodeEditor;
  private static readonly STYLES = {
    wrapper: {
      display: 'flex' as 'flex',
      flexDirection: 'row' as 'row',
      font: '400 11px system-ui'
    },
    controlPanel: {
      display: 'flex' as 'flex',
      flexDirection: 'column' as 'column'
    },
    directions: {
      padding: '50px'
    },
    button: {
      margin: '10px',
      paddingBottom: '10px',
      paddingTop: '10px'
    }
  };
}
