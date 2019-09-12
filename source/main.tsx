import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Canvas } from './canvas';
import { CanvasControlPanel } from './canvas_control_panel';
import { Edge } from './edge';
import { Node } from './node';
import { Scene } from './scene';

const node1 = new Node(1, 's1', '#1cd2ff', {x: 10, y: 10} );
const node2 = new Node(2, 's2', '#ff7da6', {x: 50, y: 90});
const edge = new Edge(1, 'e1', node1, node2);
const scene = new Scene([], []);
scene.addNode(node1);
scene.addNode(node2);
scene.addEdge(edge);

ReactDOM.render(
  <CanvasControlPanel scene={scene}/>, document.getElementById('main'));
