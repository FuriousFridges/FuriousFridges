import React from 'react';
import { connect } from 'react-redux';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import _ from 'lodash';
import QuestionCollection from './QuestionCollection.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import { Card } from 'material-ui/Card';
import { white, pinkA200 } from 'material-ui/styles/colors';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { setQuestionsInView } from '../actions';
import AnswerView from './AnswerView.jsx';
import { default as MarkerClusterer } from 'react-google-maps/lib/addons/MarkerClusterer';
import IconButton from 'material-ui/IconButton';
import ActionInfo from 'material-ui/svg-icons/action/info';


const RenderGoogleMap = withGoogleMap(props => {
  return (
    <GoogleMap
      ref={props.onMapLoad}
      defaultZoom={4}
      defaultCenter={{ lat: 39.4146132, lng: -97.0044277 }}
      onClick={props.onMapClick}
    >
      <MarkerClusterer
        averageCenter={true}
        enableRetinaIcons={true}
        gridSize={60}>
        {props.markers.map((marker) => (
          <Marker
            {...marker}
            onRightClick={() => props.onMarkerRightClick(marker)}
          />
        ))}
      </MarkerClusterer>
    </GoogleMap>
  );
});

class QuestionView extends React.Component {
  constructor(props) {
    super(props);

    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    //console.log('COMPARE: ', this.props.mapMarkers.length, nextProps.mapMarkers.length);
    if (this.props.mapMarkers.length !== nextProps.mapMarkers.length) {
      this.forceUpdate();
    }
  }
  handleMapLoad(map) {
    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
    }
  }

  handleMapClick(event) {
    let targetMarker = this.props.mapMarkers[0];
    let allQuestions = this.props.questions;
    let questionsToDisplay = _.filter(allQuestions, question =>
      this._mapComponent.getBounds().contains({ lat: question.latitude, lng: question.longitude })
    );
    this.props.dispatchQuestionsInView(questionsToDisplay);
  }

  render() {
    let questionView =
    <Card style={{flexGrow: 1, margin: 12}}>
      <QuestionCollection
        handleQuestionClick={this.props.handleQuestionClick}
        deleteQuestion={this.props.deleteQuestion}
        destinationCity={this.props.destinationCity}
      />
    </Card>;
    let answerView =
    <AnswerView
      backToQuestions={this.props.backToQuestions}
      handleAnswerChange={this.props.handleAnswerChange}
      handleAnswerSubmit={this.props.handleAnswerSubmit}
      deleteAnswer={this.props.deleteAnswer}
    />;
    let view = questionView;
    if (this.props.currentView === 'questions') {
      view = questionView;
    } else if (this.props.currentView === 'answers') {
      view = answerView;
    }
    return (
      <div style={
        this.props.width > 750 ? {
          width: '84%',
          display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'center',} :
        {
          width: '100%',
          display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'center',}}>
        {this.props.currentView === 'questions' ?
          <FloatingActionButton
            mini={this.props.width <= 750}
            style={styles.askQuestionButton}
            onTouchTap={this.props.openQuestionDialog}
            backgroundColor={pinkA200}>
            <ContentAdd />
          </FloatingActionButton> :
          <div/>
        }
        <div style={{flexGrow:1, width: '50%', minWidth: 300, margin: 12, position: 'relative'}}>
          <IconButton
            tooltip="Click the map to get questions within the map bounds"
            tooltipPosition="bottom-left"
            style={{right: 24, top: 24, position: 'absolute', }}>
            <ActionInfo />
          </IconButton>
          <RenderGoogleMap
            containerElement={
              <div style={{ height: '500px' }} />
            }
            mapElement={
              <div style={{ height: '100%' }} />
            }
            onMapLoad={this.handleMapLoad}
            onMapClick={this.handleMapClick}
            markers={this.props.mapMarkers}
            onMarkerRightClick={_.noop}
          />
        </div>
        <div style={{flexGrow:1, minWidth: 300, width: '40%'}}>
          {view}
        </div>
      </div>
    );
  }
}

const styles = {
  askQuestionButton: {
    margin: 0,
    right: 24,
    left: 'auto',
    top: 0,
    position: 'absolute',
  }
};

const mapStateToProps = (state) => ({
  currentUser: state.questionBoard.currentUser,
  currentView: state.questionBoard.currentView,
  mapMarkers: state.questionBoard.mapMarkers,
  questions: state.questionBoard.questions,
  questionsInView: state.questionBoard.questionsInView
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchQuestionsInView: (questionsInView) => {
      dispatch(setQuestionsInView(questionsInView));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionView);
