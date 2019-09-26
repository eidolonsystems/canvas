import * as React from 'react';
import { TransitionType } from './transition';

interface Properties {
  submit?: (type: TransitionType, name: string, code: string) => void;
}

interface State {
  selectedType: TransitionType;
  name: string;
  code: string;
  parameters: string;
}

export class NewTransitionForm  extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      selectedType: TransitionType.Condition,
      name: '',
      code: '',
      parameters: ''
    };
  }

  public render(): JSX.Element {
    const label = (() => {
      if(this.state.selectedType === TransitionType.Condition) {
        return 'Predicate';
      } else {
         return 'Code';
      }
    })();
    const parameters = (() => {
      if(this.state.selectedType === TransitionType.Event) {
        return (
          <div>
          <div>{'parameters:'}</div>
          <input type='text' value={this.state.parameters}
            onChange={this.onParameterChange.bind(this)}/>
        </div>
        );
      } else {
        return null;
      }
    })();
    return (
      <div style={NewTransitionForm.STYLES.wrapper}>
        <div>New Transition</div>
        <div style={NewTransitionForm.STYLES.padding}>
          <label>
          <input
            type='radio'
            name='type'
            value={TransitionType.Condition}
            onChange={() => this.radioButtonChange(TransitionType.Condition)}
            style={NewTransitionForm.STYLES.padding}
            checked={this.state.selectedType === TransitionType.Condition}/>
            condition
          </label>
           <label>
          <input
              type='radio'
              name='type'
              value={TransitionType.Event}
              onChange={() => this.radioButtonChange(TransitionType.Event)}
              style={NewTransitionForm.STYLES.padding}
              checked={this.state.selectedType === TransitionType.Event}/>
            event
          </label>
        </div>
        <div>
          <div>name:</div>
          <input type='text' value={this.state.name}
            onChange={this.onNameChange.bind(this)}/>
        </div>
        {parameters}
        <div style={NewTransitionForm.STYLES.padding}>{`${label}:`}</div>
        <textarea value={this.state.code}
          onChange={this.onCodeChange.bind(this)}
          style={NewTransitionForm.STYLES.padding}/>
        <button style={NewTransitionForm.STYLES.padding}
          onClick={this.onSubmit.bind(this)}>
          {'Add New Transition'}
        </button>
      </div>
    );
  }

  private onSubmit() {
    this.props.submit(this.state.selectedType,
      this.state.name, this.state.code);
    this.setState({
        name: '',
        code: ''
    });
  }

  private radioButtonChange(value: TransitionType) {
    if(value === TransitionType.Condition) {
      this.setState({
        parameters: '',
        selectedType: value
      });
    } else{
      this.setState({
        selectedType: value
      });
    }
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
      parameters: event.target.value
    });
  }

  private static readonly STYLES = {
    wrapper: {
      padding: '10px',
      margin: '10px',
      display: 'flex' as 'flex',
      flexDirection: 'column' as 'column',
      border: '2px solid #333333',
      width: '500px'
    },
    code: {
      width: '450px'
    },
    padding: {
      marginBottom: '10px'
    }
  };
}
