import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  blueGrey500, white, pinkA200,pinkA100, grey300
} from 'material-ui/styles/colors';
import {
  Link,
} from 'react-router-dom';
import {Tabs, Tab} from 'material-ui/Tabs';
import ActionDashboard from 'material-ui/svg-icons/action/dashboard';
import SocialLocationCity from 'material-ui/svg-icons/social/location-city';
import ActionList from 'material-ui/svg-icons/action/list';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Dashboard from './Dashboard.jsx';
import CityInfo from './CityInfo.jsx';
import QuestionBoard from './QuestionBoard.jsx';
import Drawer from 'material-ui/Drawer';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import {List, ListItem} from 'material-ui/List';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle () {
    this.setState({open: !this.state.open});
  }
  render () {

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
      divStyle: {
        overflow: 'hidden',
      },
      tabStyle: {
        backgroundColor: blueGrey500,
      },
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
      },
      textFieldStyle: {
        left: '18px',
      },
      underlineStyle: {
        borderColor: pinkA200,
      },
      floatingLabelStyle: {
        color: pinkA200,
      },
      switchStyle: {
        backgroundColor: pinkA200,
      },
      trackStyle: {
        backgroundColor: pinkA100,
      },
      saveButtonStyle: {
        color: pinkA200,
      }
    };

    return (
      <div style={styles.divStyle}>
        <MuiThemeProvider>
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
              <IconButton
                tooltip="Settings"
                onTouchTap={this.handleToggle}>
                <ActionSettings
                  color = {white}
                />
              </IconButton>
              <a href='/logout'>
                <FlatButton
                  style={styles.whiteTextStyle}
                  label="LOG OUT"
                />
              </a>
            </ToolbarGroup>
          </Toolbar>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Tabs
            tabItemContainerStyle={{width: '400px'}}
            inkBarStyle={{background: pinkA200, zIndex: 500}}
            contentContainerStyle={{background: grey300}}
            style={{background: blueGrey500}}>
            <Tab
              label="DASHBOARD"
              style={styles.tabStyle}>
              <div>
                <p>{this.props.user}</p>
                <Dashboard/>
              </div>
            </Tab>
            <Tab
              label="CITY INFO"
              style={styles.tabStyle}
            >
              <div>
                <CityInfo/>
              </div>
            </Tab>
            <Tab
              label="QUESTIONS"
              style={styles.tabStyle}
            >
              <div>
                <QuestionBoard/>
              </div>
            </Tab>
          </Tabs>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Drawer
            docked={false}
            open={this.state.open}
            width={400}
            openSecondary={true}
            onRequestChange={(open) => this.setState({open})} >
            <Subheader>General</Subheader>
            <TextField
              style={styles.textFieldStyle}
              hintText="John"
              floatingLabelText="First Name"
              floatingLabelFixed={true}
              underlineFocusStyle={styles.underlineStyle}
              floatingLabelFocusStyle={styles.floatingLabelStyle}
            />
            <br/>
            <TextField
              style={styles.textFieldStyle}
              hintText="Smith"
              floatingLabelText="Last Name"
              floatingLabelFixed={true}
              underlineFocusStyle={styles.underlineStyle}
              floatingLabelFocusStyle={styles.floatingLabelStyle}
            />
            <Divider/>
            <Subheader>Location</Subheader>
            <Divider/>
            <Subheader>Privacy</Subheader>
            <ListItem primaryText="Visibility"
                      secondaryText="Profile visible to other users"
                      rightToggle={
                        <Toggle
                          thumbSwitchedStyle={styles.switchStyle}
                          trackSwitchedStyle={styles.trackStyle}
                        />}
            />
            <FlatButton
              label="SAVE"
              style ={styles.saveButtonStyle}
            />
            <FlatButton
              label="CANCEL"
              onTouchTap={this.handleToggle}
            />
          </Drawer>
        </MuiThemeProvider>
      </div>);
  }
}

export default Profile;