import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import AddRepo from './components/AddRepo.jsx';
import RepoList from './components/RepoList.jsx';
import UserList from './components/UserList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: [],
      users: [],
      status: ''
    };
  }

  componentWillMount() {
    this.fetchRepos();
    this.fetchUsers();
  }

  addRepo(term) {
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
          break;
        case 1:
          this.setState({
            status: `${term}'s repos already on server`
          });
          break;
        case 2:
          this.setState({
            status: `error finding user: ${data.message}`
          });
          break;
        case 3:
          this.setState({
            status: `error loading repos: ${data.message}`
          });
          break;
        default:
          console.warn('unexpected response from server', data);
        }
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <h1>Github Fetcher</h1>
        <AddRepo addStatus={this.state.status} onAddRepo={e => this.addRepo(e)} />
        <UserList users={this.state.users} />
        <RepoList repos={this.state.repos} />
      </div>
    );
  }

  fetchRepos() {
    fetch('http://127.0.0.1:1128/repos')
      .then(resp => resp.status === 200 ? resp.json() : Promise.reject(resp.status + resp.body))
      .then(data => this.setState({repos: data}))
      .catch(err => console.error(err));
  }

  fetchUsers() {
    fetch('http://127.0.0.1:1128/users')
      .then(resp => resp.status === 200 ? resp.json() : Promise.reject(resp.status + resp.body))
      .then(data => this.setState({users: data}))
      .catch(err => console.error(err));
  }
}

ReactDOM.render(<App />, document.getElementById('app'));