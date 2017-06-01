import React from 'react';
import Question from './Question.jsx';
import Answer from './Answer.jsx';
import AnswerForm from './AnswerForm.jsx';
import $ from 'jquery';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {
  blueGrey500, white, pinkA200, pinkA100, grey300
} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {List, ListItem} from 'material-ui/List';

class AskQuestionBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentQuestion: {},
      questions: [],
      answers: [],
      view: 'questions',
      user: null,
      questionDialog: false,
      question: '',
      answer: '',
    };

    this.addQuestion = this.addQuestion.bind(this);
    this.answerQuestion = this.answerQuestion.bind(this);
    this.answerQuestionInView = this.answerQuestionInView.bind(this);
    this.backToQuestions = this.backToQuestions.bind(this);
    this.handleQuestionDialogClose = this.handleQuestionDialogClose.bind(this);
    this.openQuestionDialog = this.openQuestionDialog.bind(this);
    this.handleQuestionDialogSubmit = this.handleQuestionDialogSubmit.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this);
  }

  componentDidMount() {
    $.get('/authenticated', (auth) => {
      console.log('Logged in user: ', auth);
      this.setState({
        user: auth
      });
    });
    $.get('/questions', (questions) => {
      this.setState({ questions });
    });
  }

  handleQuestionDialogClose() {
    this.setState({
      questionDialog: false,
    });
  }

  handleQuestionDialogSubmit() {
    this.setState({
      questionDialog: false,
    });
    this.addQuestion(this.state.user, this.state.question);
    this.setState({
      question: '',
    });
  }

  handleQuestionChange(event) {
    this.setState({
      question: event.target.value,
    });
  }

  handleAnswerChange(event) {
    this.setState({
      answer: event.target.value,
    });
  }

  handleAnswerSubmit(event) {
    if (event.charCode === 13) {
      this.answerQuestionInView(this.state.user, this.state.answer, this.state.currentQuestion.id);
      this.setState({
        answer: '',
      });
    }
  }

  openQuestionDialog() {
    this.setState({
      questionDialog: true,
    });
  }

  addQuestion(author, body) {
    let email = this.state.user.email;
    $.post('/questions', { question: body, email }, (question) => {
      this.setState({
        questions: this.state.questions.concat([question])
      });
    });
    // const question = {
    //   id: this.state.questions.length + 1,
    //   author,
    //   body,
    //   answers: []
    // };
  }

  answerQuestion(questionId) {
    $.get('/answers', { questionId }, (results) => {
      let currentQuestion = this.state.questions[questionId - 1];
      let answers = results; 
      this.setState({
        view: 'answer',
        currentQuestion,
        answers
      });
    });
  }

  answerQuestionInView(author, body) {
    // $.ajax({
    //   url: '/answers',
    //   data: JSON.stringify({ question_id: questionId, answer: body }),
    //   contentType: 'application/json',
    //   success: function(results) {
    //     console.log(results);
    //   }
    // });
    let currentQuestion = this.state.currentQuestion;
    let questionId = currentQuestion.id;
    let email = this.state.user.email;
    $.post('/answers', { questionId, answer: body, email }, (answer) => {
      this.setState({
        answers: this.state.answers.concat([answer])
      });
    });
    // const answer = {
    //   id: this.state.answers.length + 1,
    //   author,
    //   body
    // };
  }

  backToQuestions(questionId) {
    this.setState({
      view: 'questions'
    });
  }

  render() {
    const styles = {
      askQuestionButton: {
        margin: 0,
        right: 20,
        left: 'auto',
        top: 0,
        position: 'absolute',
      },
      cardStyle: {
        width: '60vw',
      },
      divStyle: {
        margin: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }
    };
    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={this.handleQuestionDialogClose}
      />,
      <FlatButton
        label="Submit"
        keyboardFocused={true}
        onTouchTap={this.handleQuestionDialogSubmit}
      />,
    ];
    return (
      <div>
        <div>
          <Dialog
            title="Ask a Question"
            modal={false}
            actions={actions}
            open={this.state.questionDialog}
            onRequestClose={this.handleQuestionDialogClose}
          >
            <TextField
              value={this.state.question}
              onChange={this.handleQuestionChange}
              hintText="What is the weather like in San Francisco?"
              floatingLabelText="Question"
              floatingLabelFixed={true}
              rows={1}
              fullWidth = {true}
            />
          </Dialog>
        </div>
        <div
          style={styles.divStyle}>
          {
            this.state.view === 'questions'
            ? <div>
                <Card
                  style={styles.cardStyle}>
                  {
                    this.state.questions.map(question =>
                      <Question question={question}
                                answerQuestion={this.answerQuestion}
                                key={question.id}/>
                    )
                  }
                </Card>
                <RaisedButton
                  label='ASK A QUESTION'
                  backgroundColor={pinkA200}
                  labelColor={white}
                  style={styles.askQuestionButton}
                  onTouchTap={this.openQuestionDialog}
                />
              </div>
            : null
          }
          {
            this.state.view === 'answer'
            ? <div>
                <Card
                  style={styles.cardStyle}>
                  <IconButton
                    onTouchTap={this.backToQuestions}>
                    <NavigationArrowBack />
                  </IconButton>
                  <CardTitle
                    title={this.state.currentQuestion.body}
                    subtitle={this.state.currentQuestion.author} />
                  {
                    this.state.answers.map(answer =>
                      <Answer id={answer.id}
                              author={answer.author}
                              body={answer.body}
                              key={answer.id} />
                    )
                  }
                  <ListItem
                    disabled={true}>
                    <TextField
                      floatingLabelText="Reply"
                      floatingLabelFixed={true}
                      fullWidth ={true}
                      value={this.state.answer}
                      onChange={this.handleAnswerChange}
                      onKeyPress={this.handleAnswerSubmit}
                    />
                  </ListItem>
                </Card>
              </div>
            : null
          }
        </div>
      </div>
    );
  }
}

export default AskQuestionBoard;
