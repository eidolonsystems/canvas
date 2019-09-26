import * as React from 'react';
import { Transition, TransitionType } from './transition';

interface Properties {
  transition: Transition;
  delete?: (id: number) => void;
}

export class TransitionEntry extends React.Component<Properties>  {
  public render(): JSX.Element {
    const type = (() => {
      if(this.props.transition.type === TransitionType.Condition) {
        return 'condition';
      } else {
         return 'event';
      }
    })();
    const label = (() => {
      if(this.props.transition.type === TransitionType.Condition) {
        return 'predicate';
      } else {
         return 'code';
      }
    })();
    return(
      <div style={TransitionEntry.STYLES.wrapper}>
        <div style={TransitionEntry.STYLES.row}>
          <div style={TransitionEntry.STYLES.padding}>{'id:'}</div>
          <div>{this.props.transition.id}</div>
          <div style={TransitionEntry.STYLES.close}
              onClick = {() => {this.props.delete(this.props.transition.id);}}>
            {'X'}
          </div>
        </div>
        <div style={TransitionEntry.STYLES.row}>
          <div style={TransitionEntry.STYLES.padding}>{'type:'}</div>
          <div>{type}</div>
        </div>
        <div style={TransitionEntry.STYLES.row}>
          <div style={TransitionEntry.STYLES.padding}>{'name'}</div>
          <div>{this.props.transition.name}</div>
        </div>
        <div style={TransitionEntry.STYLES.row}>
          <div style={TransitionEntry.STYLES.padding}>{label}:</div>
          <div>{this.props.transition.code}</div>
        </div>
      </div>);
    }
  private static readonly STYLES = {
    wrapper: {
      display: 'flex' as 'flex',
      flexDirection: 'column' as 'column',
      font: '420 12px Arial',
      padding: '5px',
      marginTop: '5px',
      marginBottom: '5px',
      border: '2px solid #333333'
    },
    row: {
      display: 'flex' as 'flex',
      flexDirection: 'row' as 'row',
      paddingTop: '2px',
      paddingBottom: '2px'
    },
    padding: {
      marginLeft: '4px',
      marginRight: '20px'
    },
    close: {
      color: '#ff032d',
      font: '800 12px Arial',
      display: 'flex' as 'flex',
      flexDirection: 'row' as 'row',
      flexGrow: 1,
      justifyContent: 'flex-end' as 'flex-end'
    }
  };
}
