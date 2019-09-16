import * as React from 'react';
import { Edge } from './edge';

interface Properties {
  edge: Edge;
  submitUpdatedEdge?: (name: string) => void;
}

export class EdgeEditor extends React.Component<Properties> {
  public render(): JSX.Element {
    if(this.props.edge === null) {
      return(<div style={EdgeEditor.STYLES.hidden}/>);
    } else {
      return (
    <div style={EdgeEditor.STYLES.wrapper}>
      <div style={EdgeEditor.STYLES.center}>{'Edge Editor'}</div>
      <div style={EdgeEditor.STYLES.center}>
        <label style={EdgeEditor.STYLES.label}>name:</label>
        <input type='text' ref={(thing) => this.nameInputRef = thing}></input>
      </div>
      <button style={EdgeEditor.STYLES.button}
          onClick={this.onSubmit.bind(this)}>
        Save Changes
      </button>
    </div>);
    }
  }

  public componentDidUpdate() {
    if(this.props.edge !== null) {
      this.nameInputRef.value = this.props.edge.name;
    }
  }

  private onSubmit() {
    this.props.submitUpdatedEdge(this.nameInputRef.value.toString());
  }

  private nameInputRef: HTMLInputElement;
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
