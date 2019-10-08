import React from 'react';
import {connect} from 'react-redux';
import superagent from 'superagent';


const API_URL = 'http://localhost:4000';

class Score extends React.Component {
  constructor(props){
    super (props);

    this.state = {};
    this.state.name = '';
    this.state.score = '';
  }

  componentDidMount(){
      superagent.get(`${API_URL}/score`)
        .then(results => {
            console.log(results.body);
          this.props.loadStore(results.body);
        });
  }

  handleDelete = (event) => {
    event.preventDefault();

    superagent.delete(`${API_URL}/score`)
      .send({id: event.target.value})
      .set('Accept', 'application/json')
      .then(results => {
        this.props.loadStore(results.body);
      })
      .catch(console.log('broken'));
  };

  handleNameChange = (event) => {
    event.preventDefault();
    this.setState({name: event.target.value});
  }

  handleScoreChange = (event) => {
    event.preventDefault();
    this.setState({score: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    superagent.post(`${API_URL}/score`)
    .send({name:this.state.name, score:this.state.score})
    .set('Accept', 'application/json')
    .then(results => {
      this.props.loadStore(results.body);
    })
  }

  render() {
    return (
      <>
      <h1>High Scores</h1>
      <ul>
      {this.props.scores.map((score) => (
        <li key={score._id}>
            <p>{score.name} -- {score.score}points -- <button onClick = {this.handleDelete}>Delete</button></p>
        </li>
          )
        )}
      </ul>

      <form onSubmit = {this.handleSubmit}>
        <label>
          Name:
          <input onChange={this.handleNameChange} value={this.state.name} type="text"/>
        </label>
        <label>
          Score:
          <input onChange={this.handleScoreChange} value={this.state.score} type="text"/>
        </label>
        < button type='submit'>Add Score</button>
      </form>
    </>);
    }
}

const mapStateToProps = (state) => ({
    scores: state.scores,
  });

const mapDispatchToProps = (dispatch) => ({
  loadStore : (scores) => {
    dispatch({
      type: 'SCORE_LOAD',
      payload: scores,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Score);