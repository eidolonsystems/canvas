import * as React from 'react';
import { Canvas } from './canvas';
import { Edge } from './edge';
import { EdgeEditor } from './edge_editor';
import { Node } from './node';
import { NodeEditor } from './node_editor';
import { Scene } from './scene';

interface State {
  scene: Scene;
  currentEdge: Edge;
  currentNode: Node;
  previousNode: Node;
}

export class CanvasControlPanel extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      scene: new Scene(),
      currentEdge: null,
      currentNode: null,
      previousNode: null
    };
  }

  public render(): JSX.Element {
    return (
      <div style={CanvasControlPanel.STYLES.wrapper}>
        <div style={CanvasControlPanel.STYLES.controlPanel}>
          <button onClick={this.addNode.bind(this)}
              style={CanvasControlPanel.STYLES.button}>
            Add Node
          </button>
          <button onClick={this.deleteNode.bind(this)}
              style={CanvasControlPanel.STYLES.button}>
            Delete Node
          </button>
          <button onClick={this.connectNodes.bind(this)}
              style={CanvasControlPanel.STYLES.altButton}>
            Connect Nodes
          </button>
          <button onClick={this.disconnectNode.bind(this)}
              style={CanvasControlPanel.STYLES.altButton}>
            Disconnect Nodes
          </button>
          <button onClick={this.deleteEdge.bind(this)}
              style={CanvasControlPanel.STYLES.button}>
            Delete Edge
          </button>
          <button onClick={this.makeHead.bind(this)}
            style={CanvasControlPanel.STYLES.altButton}>
            Make Current Node Head
          </button>
          <button onClick={this.makeTail.bind(this)}
            style={CanvasControlPanel.STYLES.altButton}>
            Make Current Node Tail
          </button>
          <button onClick={this.changeEnds.bind(this)}
            style={CanvasControlPanel.STYLES.altButton}>
            Change Ends
          </button>
        </div>
        <div style={CanvasControlPanel.STYLES.controlPanel}>
          <Canvas
            scene={this.state.scene}
            height={600}
            width={800}
            previousNode={this.state.previousNode}
            currentNode={this.state.currentNode}
            selectedEdge={this.state.currentEdge}
            onNodeSelected={this.newCurrentNodeSelected.bind(this)}
            onClearNodes={this.clearSelected.bind(this)}
            onEdgeSelected={this.newEdgeSelected.bind(this)}
            />
          <EdgeEditor
            edge={this.state.currentEdge}
            submitUpdatedEdge={this.edgesValueUpdated.bind(this)}/>
          <NodeEditor
            node={this.state.currentNode}
            submitUpdatedNode={this.nodeValuesUpdated.bind(this)}/>
        </div>
      </div>);
  }

  private newEdgeSelected(edge: Edge) {
    this.setState({
      currentEdge: edge
    });
  }

  private newCurrentNodeSelected(node: Node) {
    this.setState({
      previousNode: this.state.currentNode,
      currentNode: node
    });
  }

  private clearSelected() {
    this.setState({
      currentEdge: null,
      previousNode: null,
      currentNode: null
    });
  }

  private nodeValuesUpdated(name: string, color: string, code: string) {sdfdsfdsf
    if(name !== this.state.currentNode.name) {
      this.state.currentNode.name = name;
    }
    if(color !== this.state.currentNode.color) {
      this.state.currentNode.color = color;
    }
    if(code !== this.state.currentNode.code) {
      this.state.currentNode.code = code;
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
    this.state.scene.addNode();
    this.setState({scene: this.state.scene});
  }

  private deleteNode() {
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
        this.state.scene.connectNodes(
          this.state.currentNode, this.state.currentNode);
        this.setState({scene: this.state.scene});
      }
    }
  }

  private disconnectNode() {
    if(this.state.currentNode !== null  && this.state.previousNode !== null) {
      this.state.scene.disconnectEdge(
        this.state.currentNode, this.state.previousNode);
      this.setState({scene: this.state.scene});
    }
  }

  private deleteEdge() {
    this.state.scene.deleteEdge(this.state.currentEdge);
    this.setState({currentEdge: null});
  }

  private makeHead() {
    if(this.state.currentEdge === null) {
      return;
    }
    this.state.scene.changeEnds(
      this.state.currentEdge, this.state.currentNode, null);
    this.setState({scene: this.state.scene});
  }

  private makeTail() {
    if(this.state.currentEdge === null) {
      return;
    }
    this.state.scene.changeEnds(
      this.state.currentEdge, null, this.state.currentNode);
    this.setState({scene: this.state.scene});
  }

  private changeEnds() {
    if(this.state.currentEdge === null) {
      return;
    }
    this.state.scene.changeEnds(
      this.state.currentEdge, this.state.currentNode, this.state.previousNode);
    this.setState({scene: this.state.scene});
  }

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
      backgroundColor: '#c4c4c4',
      margin: '10px',
      marginLeft: '2px',
      paddingBottom: '10px',
      paddingTop: '10px',
      borderRadius: '8px',
      width: '80px'
    },
    altButton: {
      backgroundColor: '#ebebeb',
      margin: '10px',
      marginLeft: '2px',
      paddingBottom: '10px',
      paddingTop: '10px',
      borderRadius: '8px',
      width: '80px'
    }
  };
}
