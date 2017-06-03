import React from 'react';
import axios from 'axios';
import {
  Link,
} from 'react-router-dom';
import {
  blueGrey500, white, pinkA200, pinkA100, grey300, grey400, darkBlack, blueGrey700, grey100, grey500, fullBlack
} from 'material-ui/styles/colors';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Redirect} from 'react-router';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import $ from 'jquery';
import CityData from '../CityOptions.json';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import Toggle from 'material-ui/Toggle';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class NewUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      finished: false,
      stepIndex: 0,
      originValue: 'Aarhus',
      destinationValue: 'Adelaide',
      describeValue: 'single',
      visibility: false,
    };
    this.async = this.async.bind(this);
    this.handleOriginChange = this.handleOriginChange.bind(this);
    this.handleDestinationChange = this.handleDestinationChange.bind(this);
    this.handleDescribeChange = this.handleDescribeChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.saveData = this.saveData.bind(this);
    this.handleVisibilityToggle = this.handleVisibilityToggle.bind(this);
  }


    // Save the form to the database
    // Convert destination and origin from their key value to the "value" value in CityData
    // (string) destination is at this.state.destinationValue
    // (string) origin is at this.state.originValue
    // (string) describe is at this.state.describeValue
    // (boolean) visibility is at this.state.visibility
    // (int) user id is at this.state.id
    // (string) firstName is at this.state.firstName
    // (string) lastName is at this.state.lastName
    // (string) email is at this.state.email
    // (string) photo is at this.state.profilePic
  saveData() {
    axios.put('/users', {
      origin: this.state.originValue,
      destination: this.state.destinationValue,
      type: this.state.describeValue,
      visible: this.state.visibility
    })
    .then(res => {
      console.log('FORM SAVED');
    });  
  }

  handleVisibilityToggle (event, input) {
    this.setState({
      visibility: input,
    });
  }

  async (cb) {
    this.setState({loading: true}, () => {
      this.asyncTimer = setTimeout(cb, 250);
    });
  }

  handleOriginChange (event, index, value) {
    this.setState({
      originValue: value,
    });
  }

  handleDestinationChange (event, index, value) {
    this.setState({
      destinationValue: value,
    });
  }

  handleDescribeChange (event, index, value) {
    this.setState({
      describeValue: value,
    });
  }

  handleNext () {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.async(() => this.setState({
        loading: false,
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
      }));
    }
  }

  handlePrev () {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.async(() => this.setState({
        loading: false,
        stepIndex: stepIndex - 1,
      }));
    }
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
        <div>
          <Subheader>Where are you moving from?</Subheader>
          <MuiThemeProvider>
            <DropDownMenu value={this.state.originValue} onChange={this.handleOriginChange}>
              {
                Object.keys(CityData).map((city, index) =>
                  <MenuItem value={city} primaryText={city} />
                )
              }
            </DropDownMenu>
          </MuiThemeProvider>
          <Divider/>
          <Subheader>Where are you going?</Subheader>
          <MuiThemeProvider>
            <DropDownMenu value={this.state.destinationValue} onChange={this.handleDestinationChange}>
              {
                Object.keys(CityData).map((city, index) =>
                  <MenuItem value={city} primaryText={city} />
                )
              }
            </DropDownMenu>
          </MuiThemeProvider>
        </div>
        );
      case 1:
        return (
          <div>
            {/*<Subheader>Is there a name you would like us to call you?</Subheader>
            <TextField
              hintText="John"
              floatingLabelText="First Name"
              floatingLabelFixed={true}
              defaultValue={this.state.firstName}
              style={{width: '100%', marginLeft: '18px'}}
              underlineFocusStyle={{borderColor: pinkA200}}
              floatingLabelFocusStyle={{color: pinkA200}}
            />
            <TextField
              hintText="Smith"
              floatingLabelText="Last Name"
              floatingLabelFixed={true}
              defaultValue={this.state.lastName}
              style={{width: '100%', marginLeft: '18px'}}
              underlineFocusStyle={{borderColor: pinkA200}}
              floatingLabelFocusStyle={{color: pinkA200}}
            />*/}
            <Subheader>What would you describe yourself as?</Subheader>
            <MuiThemeProvider>
              <DropDownMenu value={this.state.describeValue} onChange={this.handleDescribeChange}>
                <MenuItem value={'single'} primaryText={'Single'} />
                <MenuItem value={'couple'} primaryText={'Couple'} />
                <MenuItem value={'married'} primaryText={'Married'} />
                <MenuItem value={'parent'} primaryText={'Parent'} />
              </DropDownMenu>
            </MuiThemeProvider>
          </div>
        );
      case 2:
        return (
          <div>
            <MuiThemeProvider>
              <ListItem primaryText="Visibility"
                        secondaryText="Profile visible to other users"
                        rightToggle={
                          <Toggle
                            thumbSwitchedStyle={{
                              backgroundColor: pinkA200,
                            }}
                            trackSwitchedStyle={{
                              backgroundColor: pinkA100,
                            }}
                            onToggle={this.handleVisibilityToggle}
                          />}
              />
            </MuiThemeProvider>
          </div>
        );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  renderContent() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px', overflow: 'hidden'};

    if (finished) {
      return (
        <div style={contentStyle}>
          <p>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.setState({stepIndex: 0, finished: false});
              }}
            >
              Click here
            </a> to reset the example.
          </p>
        </div>
      );
    }

    return (
      <div style={contentStyle}>
        <div>{this.getStepContent(stepIndex)}</div>
      </div>
    );
  }


  componentWillMount() {
    let width = $(window).width();
    axios.get('/authenticated')
      .then(res => {
        this.setState({
          id: res.data.id,
          firstName: res.data.first,
          lastName: res.data.last,
          email: res.data.email,
          width: width,
          profilePic: res.data.profile_pic,
        });
      });
  }
  render() {
    const styles = {
      homeStyle: {
        textDecoration: 'none',
      },
      toolbarStyle: {
        backgroundColor: blueGrey500,
      },
      whiteTextStyle: {
        color: 'white',
        left: 15,
      },
      signInStyle: {
        left: 'auto',
        bottom: 'auto',
      },
    };
    const muiTheme = getMuiTheme({
      palette: {
        primary1Color: pinkA200,
        primary2Color: blueGrey700,
        primary3Color: grey400,
        accent1Color: pinkA200,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        pickerHeaderColor: blueGrey500,
        shadowColor: fullBlack,
      },
    });
    const {finished, loading, stepIndex} = this.state;
    return (

      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Toolbar
            style = {styles.toolbarStyle}>
            <ToolbarGroup firstChild={true} style={styles.titleStyle}>
              <Link to='/'
                    style={styles.homeStyle}
              >
                <ToolbarTitle
                  text="Relocate.me"
                  style={styles.whiteTextStyle}
                />
              </Link>
            </ToolbarGroup>
            <ToolbarGroup style={styles.signInStyle}>
              <a href='/logout'>
                <FlatButton
                  style={styles.whiteTextStyle}
                  label="LOG OUT"
                />
              </a>
            </ToolbarGroup>
          </Toolbar>
        </MuiThemeProvider>
        <div style={{width: '100%', maxWidth: '800px', marginTop: '20px', marginLeft: 'auto', marginRight:'auto'}}>
          <MuiThemeProvider muiTheme={muiTheme}>
            <Card>
              <CardHeader
                title={this.state.firstName + ' ' + this.state.lastName}
                subtitle={this.state.email}
                avatar={this.state.profilePic}
              />
              {/*<CardTitle
                title={'Welcome ' + this.state.firstName + ' ' + this.state.lastName}
                subtitle={this.state.email} />*/}
              <CardText>
                <Stepper
                  activeStep={stepIndex}
                  orientation='horizontal'
                >
                  <Step>
                    <StepLabel>
                      Origin and Destination
                    </StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>
                      Personal
                    </StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>
                      Privacy and Other
                    </StepLabel>
                  </Step>
                </Stepper>
              </CardText>
              <CardText>
                {finished ? ( this.saveData() ||
                <Redirect push to="/profile" />) : (
                  <div>
                    <ExpandTransition loading={loading} open={true}>
                      {this.renderContent()}
                    </ExpandTransition>
                    <div style={{marginTop: 24, marginBottom: 12}}>
                      <FlatButton
                      label="Back"
                      disabled={stepIndex === 0}
                      onTouchTap={this.handlePrev}
                      style={{marginRight: 12}}
                      />
                      <RaisedButton
                      label={stepIndex === 2 ? 'Done' : 'Next'}
                      labelColor={white}
                      backgroundColor={pinkA200}
                      onTouchTap={this.handleNext}
                      />
                    </div>
                  </div>
                )}
              </CardText>
            </Card>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

export default NewUserForm;
