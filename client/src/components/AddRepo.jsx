import React from 'react';

class AddRepo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    };
  }

  onChange(e) {
    this.setState({
      term: e.target.value
    });
  }

  addRepo() {
    this.props.onAddRepo(this.state.term);
  }

  render() {
    return (
      <div>
        <h4>Add more repos!</h4>
        Enter a github username: <input value={this.state.terms} onChange={e => this.onChange(e)} />       
        <button onClick={e => this.addRepo(e)}> Add Repos </button>
      </div>
    ); 
  }
}

export default AddRepo;