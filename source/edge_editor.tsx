import * as React from 'react';
import { Edge } from './edge';
import { Transition } from './transition';
import { TransitionEditor } from './transition_editor';

interface Properties {
  edge: Edge;
  transition?: Transition | null;
  submitUpdatedEdge?: (edge: Edge, name: string, transitionID: number) => void;
}

interface State {
  name: string;
  transition: string;
}

export class EdgeEditor extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      name: this.props.edge.name,
      transition: ''
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onTransitionChange = this.onTransitionChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  public render(): JSX.Element {
    if(this.props.edge === null) {
      return(<div style={EdgeEditor.STYLES.hidden}/>);
    } else {
      return (
        <div>
          <div style={EdgeEditor.STYLES.wrapper}>
            <div style={EdgeEditor.STYLES.center}>{'Edge Editor'}</div>
            <div style={EdgeEditor.STYLES.center}>
              <label style={EdgeEditor.STYLES.label}>name:</label>
              <input type='text' value={this.state.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.onNameChange(e)}/>
            </div>
              <div style={EdgeEditor.STYLES.center}>
              <label style={EdgeEditor.STYLES.label}>transitons:</label>
              <input type='number' value={this.state.transition}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  this.onTransitionChange(e)}/>
            </div>
            <button style={EdgeEditor.STYLES.button}
                onClick={this.onSubmit}>
              Save Changes
            </button>
          </div>
          <TransitionEditor transiton={this.props.transition}/>
        </div>);
    }
  }

  public onNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({name: event.target.value});
  }

  public onTransitionChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({transition: event.target.value});
  }

  private onSubmit() {
    this.props.submitUpdatedEdge(
      this.props.edge, this.state.name, parseInt(this.state.transition, 10));
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
      paddingBottom: '10px',
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
