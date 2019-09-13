import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Canvas } from './canvas';
import { CanvasControlPanel } from './canvas_control_panel';
import { Edge } from './edge';
import { Node } from './node';
import { Scene } from './scene';

const node1 = new Node(1, 's1', '#1cd2ff', {x: 50, y: 50} );
const node2 = new Node(2, 's2', '#ff7da6', {x: 150, y: 150});
const edge = new Edge(1, 'e1', node1, node2);
const scene = new Scene([], []);
scene.addNode(node1);
scene.addNode(node2);
scene.addEdge(edge);

ReactDOM.render(
  <CanvasControlPanel/>, document.getElementById('main'));
