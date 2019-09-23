import * as React from 'react';
import { TransitionType } from './transition';

interface Properties {
  submit?: (type: TransitionType, name: string, code: string) => void;
}

interface State {
  selectedType: TransitionType;
  name: string;
  code: string;
}

export class NewTransitionForm  extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      selectedType: TransitionType.Conditionon,
      name: '',
      code: ''
    };
  }

  public render(): JSX.Element {
    const label = (() => {
      if(this.state.selectedType === TransitionType.Conditionon) {
        return 'Predicate';
      } else {
         return 'Code';
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
            value={TransitionType.Conditionon}
            onChange={() => this.radioButtonChange(TransitionType.Conditionon)}
            style={NewTransitionForm.STYLES.padding}
            checked={this.state.selectedType === TransitionType.Conditionon}/>
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
        <div style={NewTransitionForm.STYLES.padding}>{`${label}:`}</div>
        <textarea value={this.state.code}
          onChange={this.onCodeChange.bind(this)}
          style={NewTransitionForm.STYLES.padding}/>
        <button style={NewTransitionForm.STYLES.padding}
          onClick={() =>
            this.props.submit(this.state.selectedType, this.state.name, this.state.code)}>
          {'Add New Transition'}
        </button>
      </div>
    );
  }

  private radioButtonChange(value: TransitionType) {
     this.setState({
      selectedType: value
    });
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
