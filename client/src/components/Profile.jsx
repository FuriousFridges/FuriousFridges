import React from 'react';
import {
  Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import geolocator from 'geolocator';
import { setCurrentUser } from '../actions';
import {
  blueGrey500, white, pinkA200, pinkA100, grey300, grey50
} from 'material-ui/styles/colors';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Tabs, Tab } from 'material-ui/Tabs';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import {List, ListItem} from 'material-ui/List';
import Snackbar from 'material-ui/Snackbar';
import AskQuestionBoard from './AskQuestionBoard.jsx';
import Dashboard from './Dashboard.jsx';
import Avatar from 'material-ui/Avatar';
import CityInfo from './CityInfo.jsx';
import CityData from '../CityOptions.json';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import CircularProgress from 'material-ui/CircularProgress';
import ActionDashboard from 'material-ui/svg-icons/action/dashboard';
import SocialLocationCity from 'material-ui/svg-icons/social/location-city';
import ActionQuestionAnswer from 'material-ui/svg-icons/action/question-answer';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      snackBar: false,
      firstName: '',
      lastName: '',
      email: '',
      question: false,
      profilePic: '',
      visibilityValue: false,
      spinner: true,
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleVisibility = this.handleVisibility.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleNewQuestion = this.handleNewQuestion.bind(this);
    this.handleQuestionClose = this.handleQuestionClose.bind(this);
    this.handleQuestionSubmit = this.handleQuestionSubmit.bind(this);
    this.handleOriginChange = this.handleOriginChange.bind(this);
    this.handleDestinationChange = this.handleDestinationChange.bind(this);
    this.handleDescribeChange = this.handleDescribeChange.bind(this);
  }

  componentDidMount() {
    this.getCurrentUserInfo();
    setTimeout(() => {
      this.setState({
        spinner: false
      }, function() {
        this.forceUpdate();
      });
    }, 2000);
  }

  setUserCurrentLocation() {
    geolocator.config({
      language: 'en',
      google: {
        version: '3',
        key: process.env.GOOGLE_API_KEY
      }
    });
    var options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumWait: 10000,     // max wait time for desired accuracy
      maximumAge: 0,          // disable cache
      desiredAccuracy: 30,    // meters
      fallbackToIP: true,     // fallback to IP if Geolocation fails or rejected
      addressLookup: true,    // requires Google API key if true
      timezone: false,         // requires Google API key if true
      staticMap: false        // map image URL (boolean or options object)
    };
    geolocator.locate(options, (err, location) => {
      let cityStateCountry = 'Anonymous location';
      let latitude = -37.297947;
      let longitude = -12.677656;
      
      if (err) {
        console.log('ERROR: Unable to resolve location! You may be blocking location services', err);
      } else {
        let city = location.address.city || null;
        let state = location.address.state || null;
        let country = location.address.country || null;

        if (country === 'United States') {
          country = 'USA';
        }
        if (city && state && country) {
          cityStateCountry = `${city}, ${state}, ${country}`;
        } else if (city && !state && country) {
          cityStateCountry = `${city}, ${country}`;
        }
        if (location.coords.latitude) {
          latitude = location.coords.latitude;
        }
        if (location.coords.longitude) {
          longitude = location.coords.longitude;
        }
      }

      axios.put('/users', {
        email: this.props.currentUser.email,
        'current-location': cityStateCountry,
        latitude,
        longitude
      })
        .then(res => {
          console.log('Successfully updated the user current location!');
        });
    });
  }

  getCurrentUserInfo() {
    axios.get('/createuser')
      .then(res => {
        this.props.dispatchCurrentUser(res.data);
        this.setState({
          originValue: res.data.origin,
          destinationValue: res.data.destination,
          describeValue: res.data.type,
          visibilityValue: res.data.visible,
          originUser: res.data.origin,
          destinationUser: res.data.destination,
          describeUser: res.data.type,
          visibilityUser: res.data.visible,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
          id: res.data.id,
          profilePic: res.data.photoUrl,
          width: $(window).width()
        });
        this.setUserCurrentLocation();
        this.getCityInfo();
      });
  }

  getCityInfo() {
    axios.get('/cityinfo')
      .then(res => {
        let cityDetails = JSON.parse(res.data.city_details);
        this.setState({
          colDestinationArray: cityDetails.categories[3].data.slice(1, cityDetails.categories[3].data.length),
          housingDestinationArray: cityDetails.categories[8].data,
        });
      })
      .catch(err => {
        if (err.message.includes('404')) {
          console.log('USER HAS NOT REGISTERED DESTINATION CITY');
          setTimeout(() => {
            this.props.history.push('/form');
          }, 1000);
        }
      });
    axios.get('/origininfo')
      .then(res => {
        let cityDetails = JSON.parse(res.data.city_details);
        this.setState({
          colOriginArray: cityDetails.categories[3].data.slice(1, cityDetails.categories[3].data.length),
          housingOriginArray: cityDetails.categories[8].data,
        });
      })
      .catch(err => {
        if (err.message.includes('404')) {
          console.log('USER HAS NOT REGISTERED ORIGIN CITY');
          setTimeout(() => {
            this.props.history.push('/form');
          }, 1000);
        }
      });
  }

  handleToggle () {
    this.setState({
      open: !this.state.open,
    });
  }

  handleCancel () {
    this.setState({
      open: !this.state.open,
      originValue: this.state.originUser,
      destinationValue: this.state.destinationUser,
      describeValue: this.state.describeUser,
      visibilityValue: this.state.visibilityUser,
    });
  }

  handleSave () {
    axios.put('/users', {
      origin: this.state.originValue,
      destination: this.state.destinationValue,
      type: this.state.describeValue,
      visible: this.state.visibilityValue,
      email: this.state.email
    })
      .then(res => {
        this.setState({
          originValue: this.state.originValue,
          destinationValue: this.state.destinationValue,
          originUser: this.state.originValue,
          destinationUser: this.state.destinationValue,
          describeValue: this.state.describeValue,
          describeUser: this.state.describeUser,
          visibilityValue: this.state.visibilityValue,
          visibilityUser: this.state.visibilityValue,
        }, this.getCityInfo );
      });
    this.setState({snackBar: true, open: false}, this.getCityInfo);
  }
  handleClose () {
    this.setState({snackBar: false});
  }
  handleNewQuestion () {
    this.setState({question: true});
  }
  handleQuestionClose () {
    this.setState({question: false});
  }
  handleQuestionSubmit () {
    this.setState({question: false});
    // Add question here
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
  handleVisibility () {
    this.setState({visibilityValue: !this.state.visibilityValue});
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
        color: grey50,
        left: 15,
      },
      signInStyle: {
        left: 'auto',
        bottom: 'auto',
      },
      tabStyle: {
        backgroundColor: blueGrey500,
        overflow: 'hidden',
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
      },
      tabs: {
        color: blueGrey500,
      },
      tab: {
        flex: '1',
      },
      loading: {
        fontFamily: "'Roboto', sans-serif",
        color: blueGrey500,
        fontSize: '1em',
      },
    };

    const loadingPhrases = [
      'Rebooting the Internet',
      'Building Skynet',
      'Meddling in elections',
      'Overthrowing governments',
      'Taking over the world',
      'Erasing databases',
      'Performing XSS attacks',
      'Imposing martial law',
      'Reticulating Splines',
      'Hacking into private email servers',
      'Covfefe',
      'Crushing dissent',
      'Exploiting security holes',
      'Eroding public confidence',
      'Figuring out what \'this\' is',
      'Replacing JavaScript with TypeScript',
      'Leaking sensitive data',
      'Replacing humans with robots',
      'Dropping tables',
      'Choosing React over Angular',
      'Gathering nuclear launch codes',
      'Getting stuck in while loops',
      'Materializing UI',
      'Putting up a fake loading screen',
      'Destroying the human race',
      'Determining the fate of the world',
    ];

    if (this.state.spinner) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexWrap: 'wrap',
            flexDirection: 'row'}}>
          <MuiThemeProvider>
            <CircularProgress style={{margin: 20}}color={pinkA200} size={60} thickness={3.5} />
          </MuiThemeProvider>
          <span style={styles.loading}>{loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)] + '.  We thank you for your patience.'}</span>
        </div>
      );
    } else {
      return (
        <div>
        <MuiThemeProvider>
          <Toolbar
            id='toolbar'
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
            id='tabs'
            tabItemContainerStyle={{width: '100vw'}}
            inkBarStyle={{background: pinkA200, zIndex: 500}}
            contentContainerStyle={{background: grey300}}
            style={styles.tabs}>
            { this.state.width > 750 ?
              <Tab
                label="DESTINATION INFO"
                style={styles.tabStyle}
              >
                <div>
                  <CityInfo formToggle={this.props.formToggle}
                            destinationCity={this.state.destinationUser}
                            width={this.state.width}
                            history={this.props.history}/>
                </div>
              </Tab> :
              <Tab
                icon={<SocialLocationCity/>}
                style={styles.tabStyle}
              >
                <div>
                  <CityInfo formToggle={this.props.formToggle}
                            destinationCity={this.state.destinationUser}
                            width={this.state.width}
                            history={this.props.history} />
                </div>
              </Tab>
            }
            { this.state.width > 750 ?
              <Tab
                label="DASHBOARD"
                style={styles.tabStyle}
              >
                <div>
                  <Dashboard
                    width={this.state.width}
                    origin={this.state.originUser}
                    destination={this.state.destinationUser}
                    colOriginArray={this.state.colOriginArray}
                    colDestinationArray={this.state.colDestinationArray}
                    housingOriginArray={this.state.housingOriginArray}
                    housingDestinationArray={this.state.housingDestinationArray}
                  />
                </div>
              </Tab> :
              <Tab
                icon={<ActionDashboard/>}
                style={styles.tabStyle}
              >
                <div>
                  <Dashboard
                    width={this.state.width}
                    origin={this.state.originUser}
                    destination={this.state.destinationUser}
                    colOriginArray={this.state.colOriginArray}
                    colDestinationArray={this.state.colDestinationArray}
                    housingOriginArray={this.state.housingOriginArray}
                    housingDestinationArray={this.state.housingDestinationArray}
                  />
                </div>
              </Tab>
            }
            { this.state.width > 750 ?
              <Tab
                label="QUESTIONS"
                style={styles.tabStyle}
              >
                <div
                  style={styles.tab}
                >
                  <AskQuestionBoard
                    width={this.state.width}
                    destinationCity={this.state.destinationUser}
                  />
                </div>
              </Tab> :
              <Tab
                icon={<ActionQuestionAnswer/>}
                style={styles.tabStyle}
              >
                <div
                  style={styles.tab}
                >
                  <AskQuestionBoard
                    width={this.state.width}
                    destinationCity={this.state.destinationUser}
                  />
                </div>
              </Tab>
            }
          </Tabs>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Drawer
            open={this.state.open}
            width={this.state.width > 400 ? 400 : '100%'}
            openSecondary={true}
            onRequestChange={(open) => this.setState({open})}
            style={{overflow: 'hidden'}} >
            <ListItem
              leftAvatar={<Avatar src={this.state.profilePic}/>}
              primaryText={this.state.firstName + ' ' + this.state.lastName}
              secondaryText={this.state.email}
              disabled={true}
            />
            <Subheader
              style={{color: blueGrey500}}>
              Origin
            </Subheader>
            <MuiThemeProvider>
              <DropDownMenu value={this.state.originValue} onChange={this.handleOriginChange}>
                {
                  Object.keys(CityData).map((city, index) =>
                    <MenuItem value={CityData[city]} primaryText={city} />
                  )
                }
              </DropDownMenu>
            </MuiThemeProvider>
            <Divider/>
            <Subheader
              style={{color: blueGrey500}}>
              Destination
            </Subheader>
            <MuiThemeProvider>
              <DropDownMenu value={this.state.destinationValue} onChange={this.handleDestinationChange}>
                {
                  Object.keys(CityData).map((city, index) =>
                    <MenuItem value={CityData[city]} primaryText={city} />
                  )
                }
              </DropDownMenu>
            </MuiThemeProvider>
            <Divider/>
            <Subheader
              style={{color: blueGrey500}}>
              Description
            </Subheader>
            <MuiThemeProvider>
              <DropDownMenu value={this.state.describeValue} onChange={this.handleDescribeChange}>
                <MenuItem value={'single'} primaryText={'Single'} />
                <MenuItem value={'couple'} primaryText={'Couple'} />
                <MenuItem value={'married'} primaryText={'Married'} />
                <MenuItem value={'parent'} primaryText={'Parent'} />
              </DropDownMenu>
            </MuiThemeProvider>
            <Divider/>
            <Subheader
              style={{color: blueGrey500}}>
              Privacy
            </Subheader>
            <ListItem primaryText="Visibility"
                      secondaryText="Profile visible to other users"
                      rightToggle={
                        <Toggle
                          thumbSwitchedStyle={styles.switchStyle}
                          trackSwitchedStyle={styles.trackStyle}
                          toggled={this.state.visibilityValue}
                          onToggle={this.handleVisibility}
                        />}
            />
            <FlatButton
              label="SAVE"
              style ={styles.saveButtonStyle}
              onTouchTap = {this.handleSave}
            />
            <FlatButton
              label="CANCEL"
              onTouchTap={this.handleCancel}
            />
          </Drawer>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Snackbar
            open={this.state.snackBar}
            message="Settings were saved"
            autoHideDuration={3000}
            action="DISMISS"
            onActionTouchTap={this.handleClose}
            onRequestClose={this.handleClose}
          />
        </MuiThemeProvider>
      </div>);
    }
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.questionBoard.currentUser
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchCurrentUser: (currentUser) => {
      dispatch(setCurrentUser(currentUser));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
