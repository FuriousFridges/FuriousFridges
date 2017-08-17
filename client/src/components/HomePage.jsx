import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  blueGrey500, blueGrey400, blueGrey200, grey800, grey300, white, pinkA200, grey50, grey500, red500, orange500, amber500, green500, lightGreen500
} from 'material-ui/styles/colors';
import {
  Link,
} from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import CityData from '../CityOptions.json';
import Chip from 'material-ui/Chip';
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
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import HardwareDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import {List, ListItem} from 'material-ui/List';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.calculateScoreStatus = this.calculateScoreStatus.bind(this);
    this.calculateColor = this.calculateColor.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
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
    } else {
      return 'Among the worst';
    }
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

  handleScroll() {
    $('html, body').animate({
      scrollTop: $('#firstSection').offset().top - $('#toolbar').height()
    }, 750);
  }

  render () {
    const images = [
      '/assets/LibertySquare.jpg',
      '/assets/VictoriaHarbor.jpg',
      '/assets/Kyoto.jpg',
      '/assets/Singapore.jpg',
      '/assets/CentralPark.jpg',
      '/assets/GoldenGate.jpg',
      '/assets/Zhangjiajie.jpg',
      '/assets/AntelopeValley.jpg',
      '/assets/Paris.jpg',
      '/assets/TajMahal.jpg',
      '/assets//HalfDome.jpg',
      '/assets/JiuFen.jpg',
      '/assets/Chicago.jpg',
      '/assets/Uluru.jpg',
      '/assets/GuangHuaMen.jpg',
      '/assets/BrandenburgGate.jpg',
      '/assets/StBasilsCathedral.jpg',
    ];
    const captions = [
      'Liberty Square, Taipei · 自由廣場，臺北市',
      'Victoria Harbor, Hong Kong · 維多利亞港，香港',
      'Fushimi Inari Taisha, Kyoto · 伏見稲荷大社，京都',
      'Gardens By The Bay, Singapore · 滨海湾花园资讯指南，新加坡',
      'Central Park, New York City',
      'Golden Gate Bridge, San Francisco',
      'Zhangjiajie National Park, China · 湖南张家界国家森林公园;，中国',
      'Antelope Canyon, Arizona',
      'Paris, France',
      'Taj Mahal, India',
      'Half Dome, California',
      'Jiufen, Taiwan · 九分，臺灣',
      'Millennium Park, Chicago',
      'Uluru, Australia',
      'Gwanghwamun, South Korea · 광화문，대한민국',
      'Brandenburg Gate, Berlin · Brandenburger Tor, Berlin',
      'St. Basil\'s Cathedral, Moscow · Собор Василия Блаженного, Москва́'
    ];
    let pictureSet = new Set();
    while ( pictureSet.size < 4) {
      pictureSet.add(Math.floor(Math.random() * images.length));
    }
    pictureSet = Array.from(pictureSet);
    let cityNames = [];
    Object.keys(CityData).map((city) => {
      cityNames.push(city);
    });
    let set = new Set();
    while ( set.size < 20 ) {
      set.add(cityNames[Math.floor(Math.random() * cityNames.length)]);
    }
    set = Array.from(set);

    const cards = [['Housing Affordability', <ActionHome/>],
      ['Cost of Living', <EditorAttachMoney/>],
      ['Economy', <ActionTrendingUp/>],
      ['Health Care', <ImageHealing/>],
      ['Environment Quality', <MapsLocalFlorist/>],
      ['Leisure and Culture', <MapsLocalBar/>],
      ['Safety', <SocialPublic/>],
      ['Outdoors', <MapsTerrain/>],
      ['Education', <MapsLocalLibrary/>],
      ['Tolerance', <SocialGroup/>],
      ['Commute', <MapsDirectionsCar/>],
      ['Air and Rail Connectivity', <MapsDirectionsTransit/>],
      ['Internet Access', <ActionExplore/>],
      ['Taxation', <MapsLocalAtm/>],
      ['Business Freedom', <SocialDomain/>],
      ['Startup Culture', <HardwareLaptop/>],
      ['Venture Capital', <SocialPerson/>]];
    let score = [];
    for ( let i = 0; i < cards.length; i++ ) {
      score[i] = Math.random()*10;
    }
    let cardSet = new Set();
    while ( cardSet.size < 10 ) {
      cardSet.add(cards[Math.floor(Math.random() * cards.length)]);
    }
    cardSet = Array.from(cardSet);

    const styles = {
      homeStyle: {
        textDecoration: 'none',
      },
      toolbarStyle: {
        backgroundColor: blueGrey500,
        position: 'fixed',
        zIndex: 10000,
        width: '100%',
      },
      whiteTextStyle: {
        color: 'white',
        left: 15,
      },
      signInStyle: {
        left: 'auto',
        bottom: 'auto',
      },
      centerStyle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      },
      subHeaderStyle: {
        fontFamily: "'Roboto', sans-serif",
        color: grey300,
        fontSize: '2em',
        marginBottom: 24,
      },
      headerStyle: {
        fontFamily: "'Roboto', sans-serif",
        color: grey50,
        fontSize: '4em',
      },
      captionStyle: {
        fontFamily: "'Roboto', sans-serif",
        color: grey50,
        fontSize: '1em',
        position: 'absolute',
        left: '20px',
        bottom: '20px',
      },
      fab: {
        right: '20px',
        position: 'absolute',
        bottom: '20px',
      },
      divStyle: {
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      },
      parallaxFirst: {
        flexGrow: 1,
        position: 'relative',
        backgroundImage: 'url(' + images[pictureSet[0]] + ')',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      },
      parallaxSecond: {
        flexGrow: 1,
        position: 'relative',
        backgroundImage: 'url(' + images[pictureSet[1]] + ')',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      },
      parallaxThird: {
        flexGrow: 1,
        position: 'relative',
        backgroundImage: 'url(' + images[pictureSet[2]] + ')',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      },
      parallaxFourth: {
        flexGrow: 1,
        position: 'relative',
        backgroundImage: 'url(' + images[pictureSet[3]] + ')',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      },
      chip: {
        margin: 4,
        backgroundColor: grey50,
      },
      flexStyle: {
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      },
      partialFlexStyle: {
        height: '40%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }
    };

    return (
      <div style={styles.divStyle}>
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
              <Link to='/signup'>
                <FlatButton
                  style={styles.whiteTextStyle}
                  label="SIGN UP"
                />
              </Link>
              <ToolbarSeparator/>
              <Link to='/login'>
                <FlatButton
                  style={styles.whiteTextStyle}
                  label="LOG IN"
                />
              </Link>
            </ToolbarGroup>
          </Toolbar>
        </MuiThemeProvider>
        <div
          style={styles.flexStyle}>
          <div
            style={styles.parallaxFirst}>
            <p
              style={styles.captionStyle}>
              {captions[pictureSet[0]]}
            </p>
            <MuiThemeProvider>
              <FloatingActionButton
                style={styles.fab}
                backgroundColor={pinkA200}
                onTouchTap={this.handleScroll}
                keyboardFocused={true}
              >
                <HardwareDown />
              </FloatingActionButton>
            </MuiThemeProvider>
          </div>
        </div>
        <div
          id='firstSection'
          style={{padding: '20px', backgroundColor: blueGrey400, textAlign: 'center'}}>
          <span
            style={styles.subHeaderStyle}>
            Determine the best qualities of cities, and how they compare to others
          </span>
        </div>
        <div
          style={{backgroundColor: blueGrey200}}>
          <div
            style={{justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop: 24, marginBottom: 24}}>
            <div
              style={{width: '90%', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
              {
                cardSet.map((card, index) => {
                  return (
                    <MuiThemeProvider>
                      <Card
                        style={{flexGrow: 1, margin: '4px'}}>
                        <CardHeader
                          title={card[0]}
                          subtitle={this.calculateScoreStatus(score[index])}
                          avatar={
                            <Avatar
                              icon={card[1]}
                              backgroundColor={this.calculateColor(score[index])}
                            />
                          }
                        />
                      </Card>
                    </MuiThemeProvider>
                  );
                })
              }
              <div style={{flexGrow: 10000}}/>
            </div>
          </div>
        </div>
        {/*<div
          style={styles.partialFlexStyle}>
          <div
            style={styles.parallaxSecond}>
            <p
              style={styles.captionStyle}>
              {captions[pictureSet[1]]}
            </p>
          </div>
        </div>*/}
        <div
          style={{padding: '20px', backgroundColor: blueGrey400, textAlign: 'center'}}>
          <span
            id='secondSection'
            style={styles.subHeaderStyle}>
            Hundreds of cities all over the world to lookup
          </span>
        </div>
        <div
          style={{backgroundColor: blueGrey200}}>
          <div
            style={{justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop: 24, marginBottom: 24}}>
            <div
              style={{width: '90%', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            {
              set.map((city) => {
                return (
                  <MuiThemeProvider>
                    <Chip
                      style={styles.chip}>
                      <Avatar size={32}
                              backgroundColor={pinkA200}
                      >
                        {city[0]}
                      </Avatar>
                      {city}
                    </Chip>
                  </MuiThemeProvider>);
              })
            }
            </div>
          </div>
        </div>
        <div
          style={{padding: '20px', backgroundColor: blueGrey400, textAlign: 'center'}}>
          <span
            style={styles.subHeaderStyle}>
            Have questions?  Ask the locals for the best pint, or nearby park.
          </span>
        </div>
        <div
          style={{backgroundColor: blueGrey200}}>
          <div
            style={{justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop: 24, marginBottom: 24}}>
            <div
              style={{width: '90%', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
              <MuiThemeProvider>
                <Card
                  style={{margin: 12, maxWidth: 600, flexGrow: 1}}>
                  <CardTitle
                    title='What is the weather like in San Francisco?'
                    subtitle='Kevin Smith' />
                  <ListItem
                    primaryText='The weather is pretty mild year round.'
                    secondaryText='Jane Wong'
                    leftAvatar={<Avatar><SocialPerson style={{color: white}}/></Avatar>}
                    disabled={true}
                  />
                  <ListItem
                    primaryText='Foggy in the morning, but it clears up by mid-day'
                    secondaryText='Frank Ervin'
                    leftAvatar={<Avatar><SocialPerson style={{color: white}}/></Avatar>}
                    disabled={true}
                  />
                </Card>
              </MuiThemeProvider>
              <MuiThemeProvider>
                <Card
                  style={{margin: 12, maxWidth: 600, flexGrow: 1}}>
                  <CardTitle
                    title='How safe is it in New York City?'
                    subtitle='May Kim' />
                  <ListItem
                    primaryText='Pretty safe.'
                    secondaryText='Tony Garvin'
                    leftAvatar={<Avatar><SocialPerson style={{color: white}}/></Avatar>}
                    disabled={true}
                  />
                  <ListItem
                    primaryText='Nothing to worry about, especially in Manhattan'
                    secondaryText='Allison Franklin'
                    leftAvatar={<Avatar><SocialPerson style={{color: white}}/></Avatar>}
                    disabled={true}
                  />
                </Card>
              </MuiThemeProvider>
            </div>
          </div>
        </div>
        <div
         style={styles.partialFlexStyle}>
         <div
         style={styles.parallaxFourth}>
         <p
         style={styles.captionStyle}>
         {captions[pictureSet[3]]}
         </p>
         </div>
        </div>
        <div
          style={{padding: '20px', backgroundColor: blueGrey400, textAlign: 'center'}}>
          <span
            style={styles.subHeaderStyle}>
            About Us
          </span>
        </div>
        <div
          style={{backgroundColor: blueGrey200}}>
          <div
            style={{justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop: 24, marginBottom: 24}}>
            <div
              style={{width: '90%', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
              <div
                style={{minWidth: 300, flexGrow: 1, maxWidth: 400, margin: 12}}>
                <MuiThemeProvider>
                  <Card>
                    <CardHeader
                      title="Anthony Wong"
                      subtitle="Software Engineer"
                    />
                    <CardMedia>
                      <img src="/assets/AnthonyWong.webp" />
                    </CardMedia>
                    <CardActions>
                      <FlatButton href='https://linkedin.com/in/anthonywg' style={{color: '#0077B5'}} label="LinkedIn" />
                      <FlatButton href='https://git.io/anthonywong' label="GitHub" />
                    </CardActions>
                  </Card>
                </MuiThemeProvider>
              </div>
              <div
                style={{minWidth: 300, flexGrow: 1, maxWidth: 400, margin: 12}}>
                <MuiThemeProvider>
                  <Card>
                    <CardHeader
                      title="Kara Marnell"
                      subtitle="Software Engineer"
                    />
                    <CardMedia>
                      <img src="/assets/KaraMarnell.webp" />
                    </CardMedia>
                    <CardActions>
                      <FlatButton href='https://www.linkedin.com/in/karamarnell/' style={{color: '#0077B5'}} label="LinkedIn" />
                      <FlatButton href='https://github.com/kmarnell' label="GitHub" />
                    </CardActions>
                  </Card>
                </MuiThemeProvider>
              </div>
              <div
                style={{minWidth: 300, flexGrow: 1, maxWidth: 400, margin: 12}}>
                <MuiThemeProvider>
                  <Card>
                    <CardHeader
                      title="Salih Abuelyaman"
                      subtitle="Software Engineer"
                    />
                    <CardMedia>
                      <img src='/assets/SalihAbuelyaman.webp' />
                    </CardMedia>
                    <CardActions>
                      <FlatButton href='https://www.linkedin.com/in/salih7/' style={{color: '#0077B5'}} label="LinkedIn" />
                      <FlatButton href='https://github.com/salih7' label="GitHub" />
                    </CardActions>
                  </Card>
                </MuiThemeProvider>
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}

export default HomePage;
