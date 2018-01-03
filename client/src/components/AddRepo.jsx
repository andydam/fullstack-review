import React from 'react';
import {Alert, Button, Fade, FormControl, FormGroup, Label, InputGroup, Input, InputGroupAddon} from 'reactstrap';

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
        <Fade in={this.props.addStatus}>
          <Alert color='secondary'> {this.props.addStatus} </Alert>
        </Fade>
        <FormGroup>
          <Label>Enter a github username:</Label>
          <InputGroup>
            <Input value={this.state.terms} onChange={e => this.onChange(e)} />
            <InputGroupAddon><Button onClick={e => this.addRepo(e)}> Add Repos </Button></InputGroupAddon>
          </InputGroup>
        </FormGroup>
      </div>
    ); 
  }
}

export default AddRepo;