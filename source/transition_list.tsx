import * as React from 'react';
import { Transition, TransitionType } from './transition';
import { TransitionEntry } from './transition_entry';

interface Properties {
  transitions: Transition[];
  delete?: (id: number) => void;
}

export class TransitionList extends React.Component<Properties>  {
  public render(): JSX.Element {
    const thing = [];
    for(const transiton of this.props.transitions) {
      thing.push(
      <TransitionEntry
        transition={transiton}
        key={transiton.id}
        delete={this.props.delete}/>);
    }
    return(
      <div style={TransitionList.STYLES.wrapper}>
        {thing}
      </div>);
    }

  private static readonly STYLES = {
    wrapper: {
      display: 'flex' as 'flex',
      flexDirection: 'column' as 'column',
      font: '420 12px Arial',
      marginTop: '5px',
      marginRight: '15px',
      marginLeft: '15px',
      overflowY: 'scroll' as 'scroll',
      height: '350px'
    }
  };
}
