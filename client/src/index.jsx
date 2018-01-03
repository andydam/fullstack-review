import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import AddRepo from './components/AddRepo.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: [],
      status: ''
    };
    this.fetchRepos();
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
        if (data.exists) {
          this.setState({
            status: `${term}'s repos already on server`
          });
        } else {
          this.setState({
            status: `loaded ${data.imported} repos from ${term}`
          });
          this.fetchRepos();
        }
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <h1>Github Fetcher</h1>
        <AddRepo addStatus={this.state.status} onAddRepo={e => this.addRepo(e)} />
        <RepoList repos={this.state.repos} />
      </div>
    );
  }

  fetchRepos() {
    fetch('http://127.0.0.1:1128/repos')
      .then(resp => {
        return resp.status === 200 ? resp.json() : Promise.reject(resp.status + resp.body);
      })
      .then(data => {
        this.setState({repos: data});
      })
      .catch(err => console.error(err));
  }
}

ReactDOM.render(<App />, document.getElementById('app'));