import * as React from 'react';

interface Properties {
  node: Node;
}

export class NodeEditor extends React.Component<Properties> {
  public render(): JSX.Element {
    if(this.props.node === null) {
      return(<div style={NodeEditor.STYLES.hidden}/>);
    } else {
      return (
    <div style={NodeEditor.STYLES.wrapper}>
      <div style={NodeEditor.STYLES.formPair}>
        <label style={NodeEditor.STYLES.label}>name:</label>
        <input type='text'></input>
      </div>
      <div style={NodeEditor.STYLES.formPair}>
        <label style={NodeEditor.STYLES.label}>color:</label>
        <input type='text'></input>
      </div>
      <button style={NodeEditor.STYLES.button} >Save</button>
    </div>);
    }
  }

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
    formPair: {
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
