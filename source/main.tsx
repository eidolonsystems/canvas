import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Canvas } from './canvas';
import { Edge } from './edge';
import { Node } from './node';
import { Scene } from './scene';

const node1 = new Node('s1', '#1cd2ff', {x: 10, y: 10} );
const node2 = new Node('s2', '#ff7da6', {x: 50, y: 90});
const edge = new Edge('e1', node1, node2);
const scene = new Scene([node1, node2], [edge]);

ReactDOM.render(
  <Canvas scene={scene}/>,
  document.getElementById('main'));
