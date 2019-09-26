import * as React from 'react';
import { TransitionType, Transition } from './transition';

interface Properties {
  transiton: Transition;
  submitUpdatedTransition?: (
    transition: Transition, name: string, code: string) => void;
}

interface State {
  name: string;
  code: string;
  parameter: string;
}

export class TransitionEditor  extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      name: '',
      code: '',
      parameter: ''
    };
    this.onNameChange = this.onNameChange.bind(this);
    this.onCodeChange = this.onCodeChange.bind(this);
  }

  public componentDidMount() {
    if(this.props.transiton !== null && this.props.transiton !== undefined) {
        this.setState({
          name: this.props.transiton.name,
          code: this.props.transiton.code
        });
      }
  }

  public componentDidUpdate(prevProps: Properties) {
    if(this.props.transiton !== null && this.props.transiton !== undefined) {
      if(this.props.transiton !== prevProps.transiton) {
        this.setState({
          name: this.props.transiton.name,
          code: this.props.transiton.code
        });
      }
    }
  }
  public render(): JSX.Element {
    if(this.props.transiton === null || this.props.transiton === undefined) {
      return <div style={TransitionEditor.STYLES.hidden}/>;
    }
    const type = (() => {
      if(this.props.transiton.type === TransitionType.Condition) {
        return 'condition';
      } else {
          return 'event';
      }
    })();
    const parameters = (() => {
      if(this.props.transiton.type === TransitionType.Event) {
        return (
          <div>
          <div>{'parameters:'}</div>
          <input type='text' value={this.state.parameter}
            onChange={this.onParameterChange.bind(this)}/>
        </div>
        );
      } else {
        return null;
      }
    })();
    {parameters}
    const codeLabel = (() => {
      if(this.props.transiton.type === TransitionType.Condition) {
        return 'predicate:';
      } else {
         return 'code:';
      }
    })();
    return (
      <div style={TransitionEditor.STYLES.wrapper}>
        <div style={TransitionEditor.STYLES.row}>{'Transition Editor'}</div>
        <div style={TransitionEditor.STYLES.row}>
          <div style={TransitionEditor.STYLES.label}>{'id:'}</div>
          <div style={TransitionEditor.STYLES.label}>
            {this.props.transiton.id}
          </div>
          <div style={TransitionEditor.STYLES.label}>{'type:'}</div>
          <div>{type}</div>
        </div>
        <div style={TransitionEditor.STYLES.row}>
          <div style={TransitionEditor.STYLES.label}>{'name:'}</div>
          <input type='text'
            value={this.state.name} onChange={this.onNameChange}/>
        </div>
        <div style={TransitionEditor.STYLES.row}>
          <div style={TransitionEditor.STYLES.label}>{codeLabel}</div>
          <textarea value={this.state.code} onChange={this.onCodeChange}/>
        </div>
        <div>
          <button
            onClick={() => this.props.submitUpdatedTransition(
              this.props.transiton, this.state.name, this.state.code)}>
              {'Save Changes'}
          </button>
        </div>
      </div>
    );
  }

  private onCodeChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({
      code: event.target.value
    });
  }

  private onNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      name: event.target.value
    });
  }

  private onParameterChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      parameter: event.target.value
    });
  }

  private static readonly STYLES = {
    hidden: {
      display: 'none' as 'none'
    },
    wrapper: {
      padding: '10px',
      margin: '10px',
      display: 'flex' as 'flex',
      flexDirection: 'column' as 'column',
      alignItems: 'center' as 'center'
    },
    row: {
      paddingBottom: '10px',
      display: 'flex' as 'flex',
      flexDirection: 'row' as 'row',
      justifyContent: 'center' as 'center'
    },
    label: {
      paddingRight: '20px'
    }
  };
}
