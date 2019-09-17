import * as React from 'react';
import { Canvas } from './canvas';
import { Edge } from './edge';
import { EdgeEditor } from './edge_editor';
import { Node } from './node';
import { NodeEditor } from './node_editor';
import { Scene } from './scene';

interface State {
  scene: Scene;
  currentNode: Node;
  previousNode: Node;
}

export class CanvasControlPanel extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      scene: new Scene([], []),
      currentNode: null,
      previousNode: null
    };
  }

  public render(): JSX.Element {
    return (
      <div style={CanvasControlPanel.STYLES.wrapper}>
        <div style={CanvasControlPanel.STYLES.controlPanel}>
          <Canvas
            scene={this.state.scene}
            height={500}
            width={500}
            previousNode={this.state.previousNode}
            currentNode={this.state.currentNode}
            onNodeSelected={this.newCurrentNodeSelected.bind(this)}
            onClearNodes={this.clearSelectedNodes.bind(this)}
            ref={(thing) => this.canvasRef = thing}/>
          <EdgeEditor
            edge={this.state.scene.findEdge(
              this.state.currentNode,
              this.state.previousNode
            )}
            submitUpdatedEdge={this.edgesValueUpdated.bind(this)}/>
          <NodeEditor
            node={this.state.currentNode}
            submitUpdatedNode={this.nodeValuesUpdated.bind(this)}/>
        </div>
        <div style={CanvasControlPanel.STYLES.controlPanel}>
          <button onClick={this.addNode.bind(this)}
              style={CanvasControlPanel.STYLES.button}>
            Add Node
          </button>
          <button onClick={this.removeNode.bind(this)}
              style={CanvasControlPanel.STYLES.button}>
            Remove Node
          </button>
          <button onClick={this.connectNodes.bind(this)}
              style={CanvasControlPanel.STYLES.button}>
            Add Edge
          </button>
          <button onClick={this.disconnectNode.bind(this)}
              style={CanvasControlPanel.STYLES.button}>
            Remove Edge
          </button>
        </div>
      </div>);
  }

  private newCurrentNodeSelected(node: Node) {
    this.setState({
      previousNode: this.state.currentNode,
      currentNode: node
    });
  }

  private clearSelectedNodes() {
    this.setState({
      previousNode: null,
      currentNode: null
    });
  }

  private nodeValuesUpdated(name: string, color: string) {
    if(name !== '') {
      this.state.currentNode.name = name;
    }
    if(color !== '') {
      this.state.currentNode.color = color;
    }
    this.setState({currentNode: this.state.currentNode});
  }

  private edgesValueUpdated(edge: Edge, name: string) {
    if(name !== '') {
      edge.name = name;
    }
    this.setState({scene: this.state.scene});
  }

  private addNode() {
    const red = Math.floor(Math.random() * Math.floor(250));
    const green = Math.floor(Math.random() * Math.floor(100));
    const blue = Math.floor(Math.random() * Math.floor(230));
    const someX = Math.floor(Math.random() * Math.floor(500));
    const someY = Math.floor(Math.random() * Math.floor(500));
    const newNode = new Node(
      0,
      'new',
      `rgb(${red}, ${130 + green}, ${20 + blue})`,
      {x: someX, y: someY}
    );
    this.state.scene.addNode(newNode);
    this.setState({scene: this.state.scene});
  }

  private removeNode() {
    this.state.scene.deleteNode(this.state.currentNode);
    this.setState({
      currentNode: null,
      previousNode: null,
      scene: this.state.scene
      });
  }

  private connectNodes() {
    if(this.state.currentNode !== null) {
      if(this.state.previousNode !== null) {
      this.state.scene.connectNodes(
        this.state.currentNode, this.state.previousNode);
      this.setState({scene: this.state.scene});
      } else {
        console.log('LOOP DE LOOOP');
        this.state.scene.connectNodes(
          this.state.currentNode, this.state.currentNode);
        this.setState({scene: this.state.scene});
      }
    }
  }

  private disconnectNode() {
    if(this.state.currentNode !== null  && this.state.previousNode !== null) {
      this.state.scene.removeEdge(
        this.state.currentNode, this.state.previousNode);
      this.setState({scene: this.state.scene});
    }
  }

  private canvasRef: Canvas;

  private static readonly STYLES = {
    wrapper: {
      display: 'flex' as 'flex',
      flexDirection: 'row' as 'row',
      font: '420 12px Arial'
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
      paddingTop: '10px',
      borderRadius: '8px',
      width: '65px'
    }
  };
}
