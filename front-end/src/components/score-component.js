import React from 'react';
import {connect} from 'react-redux';
import superagent from 'superagent';


const API_URL = 'http://localhost:4000';

class Score extends React.Component {

  // handleUpdate = (event) => {
  //   event.preventDefault();
    
  //   superagent.patch(`${API_URL}/score/${event.target.value}`)
  //     .send({name:'Kali', text: 'updated'})
  //     .set('Accept', 'application/json')
  //     .then(res=>{this.props.loadStore(res.body)})
  //     .catch(console.log('not updating'));
  // };

  componentDidMount(){
      superagent.get(`${API_URL}/score`)
        .then(results => {
            console.log(results.body);
          this.props.loadStore(results.body);
        });
  }

  handleDelete = (event) => {
    event.preventDefault();

    superagent.delete(`${API_URL}/score/${this.props.score._id}`)
      .then(results => {
        this.props.loadStore(results.body);
      })
      .catch(console.log);
  };

  render() {
    console.log(this.props.scores)
    return (
      <>
      <h1>High Scores</h1>
      <ul>
      {this.props.scores.map((score) => (
        <li key={score._id}>
            <p>{score.name}-{score.score}<button onClick = {this.handleDelete}>Delete</button></p>
        </li>
          )
        )}
      </ul>

      <form onSubmit = {this.handleSubmit}>
  <label>
    Name:
    <input type="text"/>
  </label>
  <label>
    Score:
    <input type="text" name="name" />
  </label>
  <button>Add Score</button>
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
  updateStore : (scores) => {
    dispatch({
      type: 'SCORE_UPDATE',
      payload: scores,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Score);