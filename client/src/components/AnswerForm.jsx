import React from 'react';

class AnswerForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.answerQuestionInView(this.props.user, this._answer.value);
    // this.setState({
    //   answers: this.state.answers.concat([answer])
    // });
  }

  render() {
    return (
      <div>
        <h3>Answer this question</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <textarea placeholder="Answer:" ref={answer => this._answer = answer} ></textarea>
          </div>
          <button type="submit">Post</button>
        </form>
      </div>
    ); 
  }
}

export default AnswerForm;
