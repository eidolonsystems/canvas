import * as React from 'react';
import { Node } from './node';

interface Properties {
  node: Node;
  submitUpdatedNode?: (name: string, color: string) => void;
}

export class NodeEditor extends React.Component<Properties> {
  public render(): JSX.Element {
    if(this.props.node === null) {
      return(<div style={NodeEditor.STYLES.hidden}/>);
    } else {
      return (
    <div style={NodeEditor.STYLES.wrapper}>
      <div style={NodeEditor.STYLES.center}>{'Node Editor'}</div>
      <div style={NodeEditor.STYLES.center}>
        <label style={NodeEditor.STYLES.label}>name:</label>
        <input type='text' ref={(thing) => this.nameInputRef = thing}></input>
      </div>
      <div style={NodeEditor.STYLES.center}>
        <label style={NodeEditor.STYLES.label}>color:</label>
        <input type='text' ref={(thing) => this.colorInputRef = thing}></input>
      </div>
      <button style={NodeEditor.STYLES.button}
          onClick={this.onSubmit.bind(this)}>
        Save Changes
      </button>
    </div>);
    }
  }

  public componentDidUpdate() {
    if(this.props.node !== null) {
    this.nameInputRef.value = this.props.node.name;
    this.colorInputRef.value = this.props.node.color;
    }
  }

  private onSubmit() {
    this.props.submitUpdatedNode(
      this.nameInputRef.value.toString(),
      this.colorInputRef.value.toString());
  }

  private nameInputRef: HTMLInputElement;
  private colorInputRef: HTMLInputElement;
  private static readonly STYLES = {
    hidden: {
      display: 'none' as 'none'
    },
    wrapper: {
      padding: '25px',
      display: 'flex' as 'flex',
      flexDirection: 'column' as 'column',
      alignItems: 'center' as 'center'
    },
    center: {
      paddingBottom: '15px',
      display: 'flex' as 'flex',
      flexDirection: 'row' as 'row',
      justifyContent: 'center' as 'center'
    },
    label: {
      paddingRight: '20px'
    },
    button: {
      width: '180px'
    }
  };
}
