import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Bootstrap, Navbar, Nav, Modal, ModalHeader, ModalBody} from 'reactstrap';
import AddRepo from './components/AddRepo.jsx';
import RepoList from './components/RepoList.jsx';
import UserList from './components/UserList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: [],
      users: [],
      status: '',
      isLoading: true
    };
  }

  componentWillMount() {
    this.fetchRepos();
    this.fetchUsers();
  }

  addRepo(term) {
    this.toggleLoading(true);
    console.log(`${term} was POSTed`);
    fetch('http://127.0.0.1:1128/repos', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username: term})
    })
      .then(resp => resp.json())
      .then(data => {
        switch (data.status) {
        case 0:
          this.setState({
            status: `loaded ${data.imported} repos from ${term}`
          });
          this.fetchRepos();
          this.fetchUsers();
          this.clearStatus();
          break;
        case 1:
          this.setState({
            status: `${term}'s repos already on server`
          });
          this.clearStatus();
          break;
        case 2:
          this.setState({
            status: `error finding user: ${data.message}`
          });
          this.clearStatus();
          break;
        case 3:
          this.setState({
            status: `error loading repos: ${data.message}`
          });
          this.clearStatus();
          break;
        default:
          console.warn('unexpected response from server', data);
        }
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className='container'>
        <Modal isOpen={this.state.isLoading}>
          <ModalBody>Loading</ModalBody>
        </Modal>
        <h1>Github Repo Fetcher</h1>
        <AddRepo addStatus={this.state.status} onAddRepo={e => this.addRepo(e)} />
        <div className='row'>
          <RepoList repos={this.state.repos} />
          <UserList users={this.state.users} />
        </div>
      </div>
    );
  }

  fetchRepos() {
    this.toggleLoading(true);
    fetch('http://127.0.0.1:1128/repos')
      .then(resp => resp.status === 200 ? resp.json() : Promise.reject(resp.status + resp.body))
      .then(data => this.setState({repos: data, isLoading: false}))
      .catch(err => console.error(err));
  }

  fetchUsers() {
    this.toggleLoading(true);
    fetch('http://127.0.0.1:1128/users')
      .then(resp => resp.status === 200 ? resp.json() : Promise.reject(resp.status + resp.body))
      .then(data => this.setState({users: data, isLoading: false}))
      .catch(err => console.error(err));
  }

  clearStatus() {
    this.toggleLoading(false);
    setTimeout(() => this.setState({status: ''}), 5000);
  }

  toggleLoading(bool) {
    this.setState({isLoading: bool});
  }
}

ReactDOM.render(<App />, document.getElementById('app'));