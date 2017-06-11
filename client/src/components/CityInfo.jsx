import React from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';
import ActionHome from 'material-ui/svg-icons/action/home';
import ImageHealing from 'material-ui/svg-icons/image/healing';
import MapsTerrain from 'material-ui/svg-icons/maps/terrain';
import EditorAttachMoney from 'material-ui/svg-icons/editor/attach-money';
import MapsLocalBar from 'material-ui/svg-icons/maps/local-bar';
import MapsDirectionsTransit from 'material-ui/svg-icons/maps/directions-transit';
import MapsDirectionsCar from 'material-ui/svg-icons/maps/directions-car';
import MapsLocalFlorist from 'material-ui/svg-icons/maps/local-florist';
import SocialPublic from 'material-ui/svg-icons/social/public';
import MapsLocalLibrary from 'material-ui/svg-icons/maps/local-library';
import ActionExplore from 'material-ui/svg-icons/action/explore';
import SocialGroup from 'material-ui/svg-icons/social/group';
import ActionTrendingUp from 'material-ui/svg-icons/action/trending-up';
import ActionTrendingDown from 'material-ui/svg-icons/action/trending-down';
import MapsLocalAtm from 'material-ui/svg-icons/maps/local-atm';
import SocialDomain from 'material-ui/svg-icons/social/domain';
import HardwareLaptop from 'material-ui/svg-icons/hardware/laptop';
import SocialPerson from 'material-ui/svg-icons/social/person';
import CityOptions from '../CityOptions.json';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Chip from 'material-ui/Chip';
import {
  blueGrey500, blueGrey700, blueGrey300, red500, orange500, amber500, lightGreen500, green500, grey500, pinkA200, grey50, blue500, cyan500, indigo500, lightBlue500
} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';

class CityInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      housing: 0,
      col: 0,
      health_care: 0,
      environmental_quality: 0,
      economy: 0,
      leisure: 0,
      commute: 0,
      safety: 0,
      education: 0,
      summary: '',
      travel_connectivity: 0,
      internet_access: 0,
      tolerance: 0,
      outdoors: 0,
      taxation: 0,
      business_freedom: 0,
      startups: 0,
      venture_capital: 0,
      score: 0,
      colArray: [],
      climate: [],
    };
    this.calculateColor = this.calculateColor.bind(this);
    this.calculateScoreStatus = this.calculateScoreStatus.bind(this);
    this.objectKeyByValue = this.objectKeyByValue.bind(this);
    this.convertFormat = this.convertFormat.bind(this);
  }

  convertFormat (label, data) {
    if ( label === 'Average annual percent chance of sunshine' || label === 'Average annual percent chance of clear skies') {
      return Math.floor(data * 100) + '%';
    } else if ( label === 'Average high temperature (Celsius)' || label === 'Average low temperature (Celsius)') {
      return Math.floor(data * 1.8 + 32) + '°';
    }
    return data;
  }

  objectKeyByValue (obj, val) {
    if ( typeof val === 'undefined' ) {
      return [''];
    }
    return Object.entries(obj).find(i => i[1] === val);
  }

  calculateColor (score) {
    if ( score > 8 ) {
      return green500;
    } else if ( score > 6 ) {
      return lightGreen500;
    } else if ( score > 4.5 ) {
      return amber500;
    } else if ( score > 3 ) {
      return orange500;
    } else if ( score > 0 ) {
      return red500;
    } else {
      return grey500;
    }
  }
  calculateScoreStatus (score) {
    if ( score > 8 ) {
      return 'Among the best';
    } else if ( score > 6 ) {
      return 'Above Average';
    } else if ( score > 4.5 ) {
      return 'Around Average';
    } else if ( score > 3 ) {
      return 'Below Average';
    } else if ( score > 0 ) {
      return 'Among the worst';
    } else {
      return 'Not Available';
    }
  }

  componentWillReceiveProps() {
    axios.get('/cityinfo')
      .then(res => {
        let cityInfo = JSON.parse(res.data.city_info);
        let cityDetails = JSON.parse(res.data.city_details);
        this.setState({
          housing: cityInfo.categories[0].score_out_of_10,
          col: cityInfo.categories[1].score_out_of_10,
          health_care: cityInfo.categories[8].score_out_of_10,
          environmental_quality: cityInfo.categories[10].score_out_of_10,
          economy: cityInfo.categories[11].score_out_of_10,
          leisure: cityInfo.categories[14].score_out_of_10,
          travel_connectivity: cityInfo.categories[4].score_out_of_10,
          internet_access: cityInfo.categories[13].score_out_of_10,
          tolerance: cityInfo.categories[15].score_out_of_10,
          outdoors: cityInfo.categories[16].score_out_of_10,
          commute: cityInfo.categories[5].score_out_of_10,
          safety: cityInfo.categories[7].score_out_of_10,
          education: cityInfo.categories[9].score_out_of_10,
          taxation: cityInfo.categories[12].score_out_of_10,
          business_freedom: cityInfo.categories[6].score_out_of_10,
          startups: cityInfo.categories[2].score_out_of_10,
          venture_capital: cityInfo.categories[3].score_out_of_10,
          summary: cityInfo.summary.replace(/<\/?[^>]+(>|$)/g, ''),
          score: cityInfo.teleport_city_score,
          colArray: cityDetails.categories[3].data.slice(1,cityDetails.categories[3].data.length),
          climate: cityDetails.categories[2].data.slice(0,cityDetails.categories[2].data.length-2),
        });
      })
      .catch(err => {
        if (err.message.includes('404')) {
          console.log('USER HAS NOT REGISTERED DESTINATION CITY');
          this.props.history.push('/form');
        }
      });
    axios.get('/cityphoto')
      .then(res => {
        this.setState({
          photoURL: res.data.photos[0].image.web,
        });
      });
    axios.get('/origininfo')
      .catch(err => {
        if (err.message.includes('404')) {
          console.log('USER HAS NOT REGISTERED ORIGIN CITY');
          setTimeout(() => {
            this.props.history.push('/form');
          }, 1000);
        }
      });
    this.setState({
      city: this.objectKeyByValue(CityOptions, this.props.destinationCity)[0],
    });
  }

  render () {
    const styles = {
      cardStyle: {
        margin: '8px',
      },
      flexStyle: {
        margin: '16px',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
      },
      growStyle: {
        flexGrow: 1,
      },
      centerStyle: {
        width: '90%',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
      },
      mobileCenterStyle: {
        width: '100%',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
      },
      emptyStyle: {
        flexGrow: 1000,
      },
      image: {
        height: '35vh',
        width: '100%',
      },
      divImage: {
        height: '100%',
        width: '100%',
        position: 'relative',
        objectFit: 'cover',
        overflow: 'hidden',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundImage: 'url(' + this.state.photoURL + ')',
      },
      text: {
        position: 'absolute',
        left: '0px',
        bottom: '0px',
        right: '0px',
        background: 'rgba(0, 0, 0, 0.4)'
      },
      textMargin: {
        marginLeft: '5vw',
        marginRight: '5vw',
        marginBottom: '20px',
        float: 'left',
      },
      city: {
        fontFamily: "'Roboto Medium', sans-serif",
        color: grey50,
        fontSize: '3em',
      },
      summary: {
        fontFamily: "'Roboto', sans-serif",
        color: grey50,
        fontSize: '1em',
      },
      subHeaderStyle: {
        fontFamily: "'Roboto', sans-serif",
        color: grey50,
        fontSize: '2em',
        marginLeft: '5vw',
        marginRight: '5vw',
      },
      chip: {
        margin: 4,
      },
      paper: {
        height: 80,
        width: 80,
        margin: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: blueGrey300,
      },
      chipGrow: {
        width: 'auto',
        minWidth: 100,
        flexGrow: 1,
      },
      priceStyle: {
        fontFamily: "'Roboto', sans-serif",
        color: grey50,
        fontSize: '1em',
      },
    };
    let teleportScore = ['Teleport Score', this.state.score, <ActionHome/>];
    let cards = [
      ['Housing Affordability', this.state.housing, <ActionHome/>],
      ['Cost of Living', this.state.col, <EditorAttachMoney/>],
      ['Economy', this.state.economy, this.state.economy > 5 ? <ActionTrendingUp/> : <ActionTrendingDown/>],
      ['Health Care', this.state.health_care, <ImageHealing/>],
      ['Environment Quality', this.state.environmental_quality, <MapsLocalFlorist/>],
      ['Leisure and Culture', this.state.leisure, <MapsLocalBar/>],
      ['Safety', this.state.safety, <SocialPublic/>],
      ['Outdoors', this.state.outdoors, <MapsTerrain/>],
      ['Education', this.state.education, <MapsLocalLibrary/>],
      ['Tolerance', this.state.tolerance, <SocialGroup/>],
      ['Commute', this.state.commute, <MapsDirectionsCar/>],
      ['Air and Rail Connectivity', this.state.travel_connectivity, <MapsDirectionsTransit/>],
      ['Taxation', this.state.taxation, <MapsLocalAtm/>],
      ['Business Freedom', this.state.business_freedom, <SocialDomain/>],
      ['Startup Culture', this.state.startups, <HardwareLaptop/>],
      ['Venture Capital', this.state.venture_capital, <SocialPerson/>],
      ['Internet Access', this.state.internet_access, <ActionExplore/>]].sort((a, b) => { return b[1] - a[1]; });

    const costOfLiving = [
      ['Apples', '1kg'],
      ['Bread', 'One Loaf'],
      ['Cappuccino', 'One Cup'],
      ['Movie Ticket', 'One Admission'],
      ['Gym Membership', 'One Month'],
      ['Beer', 'One Bottle'],
      ['Public Transportation', 'Monthly Pass'],
      ['Lunch', 'One Entree'],
      ['Taxi Ride', '5km'],
      ['Dinner at Restaurant', '2 Entrees, Appetizer, Drinks']];
    const icons = {
      'Average day length (hours)': '/assets/default.png',
      'Average number of rainy days per year': '/assets/sleet.png',
      'Average number of clear days per year': '/assets/clear-night.png',
      'Average annual percent chance of sunshine': '/assets/clear-day.png',
      'Average annual percent chance of clear skies': '/assets/clear-night.png',
      'Average high temperature (Celsius)': <ActionTrendingUp/>,
      'Average low temperature (Celsius)': <ActionTrendingDown/>,
    };
    const climateLabels = {
      'Average day length (hours)': ['Day Length', 'Average Hours', amber500],
      'Average number of rainy days per year': ['# of Rainy Days', 'Yearly', blue500],
      'Average number of clear days per year': ['# of Clear Days', 'Yearly', cyan500],
      'Average annual percent chance of sunshine': ['% of Sunshine', 'Yearly', amber500, ],
      'Average annual percent chance of clear skies': ['% of Clear Skies', 'Yearly', cyan500],
      'Average high temperature (Celsius)': ['High Temperature', 'Average Fahrenheit', red500],
      'Average low temperature (Celsius)': ['Low Temperature', 'Average Fahrenheit', lightBlue500],
    };
    const context = this;
    return (
      <div>
        <div>
          <MuiThemeProvider>
            <Paper style={styles.image} zDepth={1}>
              <div style={styles.divImage}>
                  <div style={styles.text}>
                    <div style={styles.textMargin}>
                      <span style={styles.city}>{this.state.city}</span>
                      { this.props.width > 750 ?
                        <div>
                          <span style={styles.summary}>{this.state.summary}</span>
                        </div>
                        :
                        <div/>
                      }
                    </div>
                  </div>
              </div>
            </Paper>
          </MuiThemeProvider>
        </div>
        {
          this.props.width > 750 ?
            <div
              style={styles.flexStyle}>
              <div
                style={styles.centerStyle}>
                <br/>
                <div
                  style={styles.growStyle}>
                  <MuiThemeProvider>
                    <Card
                      style={styles.cardStyle}>
                      <CardHeader
                        title={teleportScore[0]}
                        subtitle={context.calculateScoreStatus(teleportScore[1]/10)}
                        avatar={
                          <Avatar
                            icon={teleportScore[2]}
                            backgroundColor={pinkA200}
                          />
                        }
                      >
                        <div
                          style={{
                            marginTop: '8px',
                            width: teleportScore[1] + '%',
                            height: '2px',
                            background: context.calculateColor(teleportScore[1] / 10)}}>
                        </div>
                      </CardHeader>
                    </Card>
                  </MuiThemeProvider>
                </div>
                { cards.map(card =>
                <div
                  style={styles.growStyle}>
                  <MuiThemeProvider>
                    <Card
                      style={styles.cardStyle}>
                      <CardHeader
                        title={card[0]}
                        subtitle={context.calculateScoreStatus(card[1])}
                        avatar={
                          <Avatar
                            icon={card[2]}
                            backgroundColor={context.calculateColor(card[1])}
                          />
                        }
                      >
                        <div
                          style={{marginTop: '8px', width: card[1] * 10 + '%', height: '2px', background: context.calculateColor(card[1])}}>
                        </div>
                      </CardHeader>
                      {/*<CardText>
                        <div
                          style={{width: card[1] * 10 + '%', height: '2px', background: context.calculateColor(card[1])}}>
                        </div>
                      </CardText>>*/}
                    </Card>
                  </MuiThemeProvider>
                </div>)}
                <div style={styles.emptyStyle}/>
              </div>
            </div>
          :
            <div
              style={styles.flexStyle}>
              <div
                style={styles.mobileCenterStyle}>
                <Paper
                  style={{flexGrow: 1, padding: '8px'}}>
                  <div
                    style={styles.growStyle}>
                    <MuiThemeProvider>
                      <ListItem
                        style={{width: '100%'}}
                        primaryText={teleportScore[0]}
                        secondaryText={context.calculateScoreStatus(teleportScore[1] / 10)}
                        disabled={true}
                        leftAvatar={
                          <Avatar
                            icon={teleportScore[2]}
                            backgroundColor={pinkA200}
                          />
                        }
                      />
                    </MuiThemeProvider>
                    <div
                      style={{width: teleportScore[1] + '%', height: '2px', background: context.calculateColor(teleportScore[1] / 10)}}>
                    </div>
                    <Divider />
                  </div>
                  { cards.map(card =>
                  <div
                    style={styles.growStyle}>
                    <MuiThemeProvider>
                      <ListItem
                        style={{width: '100%'}}
                        primaryText={card[0]}
                        secondaryText={context.calculateScoreStatus(card[1])}
                        disabled={true}
                        leftAvatar={
                          <Avatar
                            icon={card[2]}
                            backgroundColor={context.calculateColor(card[1])}
                          />
                        }
                      />
                    </MuiThemeProvider>
                    <div
                      style={{width: card[1] * 10 + '%', height: '2px', background: context.calculateColor(card[1])}}>
                    </div>
                    <Divider />
                    <div style={styles.emptyStyle}/>
                  </div>)
                  }
                </Paper>
              </div>
            </div>
        }
        <div
          style={{padding: '20px', backgroundColor: blueGrey500}}>
          <span
            style={styles.subHeaderStyle}>
            Cost of Living
          </span>
        </div>
        <div
          style={styles.flexStyle}>
          <div
            style={styles.centerStyle}>
              {
              context.state.colArray.map((colData,index) =>
                <div
                  style={styles.growStyle}>
                  <MuiThemeProvider>
                    <Card
                      style={styles.cardStyle}>
                        <ListItem
                          primaryText={costOfLiving[index][0]}
                          secondaryText={costOfLiving[index][1]}
                          disabled={true}
                          rightAvatar={
                            <Avatar
                              backgroundColor={pinkA200}
                            >{colData.currency_dollar_value > 1 ? '$' + Math.floor(colData.currency_dollar_value) : '$' + Math.ceil(colData.currency_dollar_value)}</Avatar>
                          }
                        />
                    </Card>
                  </MuiThemeProvider>
                </div>
              )
            }
            <div style={styles.emptyStyle}/>
          </div>
        </div>
        <div
          style={{padding: '20px', backgroundColor: blueGrey500}}>
          <span
            style={styles.subHeaderStyle}>
            Climate
          </span>
        </div>
        <div
          style={styles.flexStyle}>
          <div
            style={styles.centerStyle}>
            {
              context.state.climate.map((climateData,index) =>
                <div
                  style={styles.growStyle}>
                  <MuiThemeProvider>
                    <Card
                      style={{margin: 8, backgroundColor: climateLabels[climateData.label][2], overflow: 'hidden'}}>
                      <ListItem
                        primaryText={climateLabels[climateData.label][0]}
                        secondaryText={climateLabels[climateData.label][1]}
                        disabled={true}
                        style={{backgroundColor: grey50}}
                        leftAvatar={
                          !climateData.label.includes('temperature') ?
                          <Avatar
                            backgroundColor={grey50}
                            src={icons[climateData.label]}
                          /> :
                          <Avatar
                            backgroundColor={climateLabels[climateData.label][2]}
                            icon={icons[climateData.label]}
                          />}
                      />
                      <CardText
                        style={{minWidth: 200, height: this.props.width > 750 ? 150 : 100, position: 'relative', backgroundColor: climateLabels[climateData.label][2]}}>
                        <span
                          style={{right: -12, bottom: -40, position: 'absolute', fontFamily: "'Roboto Light', sans-serif", color: grey50, fontSize: '5em'}}>
                          {context.convertFormat(climateData.label, climateData[climateData.type+'_value'])}
                        </span>
                      </CardText>
                    </Card>
                  </MuiThemeProvider>
                </div>
              )
            }
            <div style={styles.emptyStyle}/>
          </div>
        </div>
      </div>
    );
  }
}

export default CityInfo;
