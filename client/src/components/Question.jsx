import React from 'react';
import {List, ListItem} from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

const Question = (props) => {
  let now = new Date();
  let created = new Date(props.question.createdAt); 
  let elapsed = Math.floor((now - created) / 1000);
  let postTime = '';
  let timeIncrement = '';

  if (elapsed < 60) {
    if (elapsed === 0) {
      postTime = 'Just now';
    } else {
      timeIncrement = elapsed === 1 ? 'second' : 'seconds';
      postTime = `${elapsed} ${timeIncrement} ago`;
    }
  } else if (elapsed < 3600) {
    timeIncrement = Math.floor(elapsed / 60) === 1 ? 'minute' : 'minutes';
    postTime = `${Math.floor(elapsed / 60)} ${timeIncrement} ago`;
  } else if (elapsed < 86400) {
    timeIncrement = Math.floor(elapsed / 3600) === 1 ? 'hour' : 'hours';
    postTime = `${Math.floor(elapsed / 3600)} ${timeIncrement} ago`;
  } else if (elapsed < 2678400) {
    timeIncrement = Math.floor(elapsed / 86400) === 1 ? 'day' : 'days';
    postTime = `${Math.floor(elapsed / 86400)} ${timeIncrement} ago`;
  } else if (elapsed < 31536000) {
    timeIncrement = Math.floor(elapsed / 2628000) === 1 ? 'month' : 'months';
    postTime = `${Math.floor(elapsed / 2628000)} ${timeIncrement} ago`; 
  } else {
    postTime = 'More than a year ago';
  }

  const answerQuestion = () => {
    props.handleQuestionClick(props.question);
  };

  return (
    <MuiThemeProvider>
      <ListItem
        primaryText={<span style={{'fontSize': '20px'}}>{props.question.body}<br /></span>}
        secondaryText={`${props.question.author} · ${props.question.location} · ${postTime}`}
        leftAvatar={<Avatar src={props.photoUrl} />}
        onTouchTap={answerQuestion}
        rightIconButton={
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem
              primaryText="Delete"
              onTouchTap={() => { props.deleteQuestion(props.question.id); }}
            />
          </IconMenu>
        }
      />
    </MuiThemeProvider>
  );
};

export default Question;
