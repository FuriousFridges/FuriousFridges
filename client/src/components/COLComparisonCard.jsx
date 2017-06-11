import React from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import Divider from 'material-ui/Divider';
import {
  grey500, green500, grey50, lightGreen500, amber500, orange500, red500,
} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import CityOptions from '../CityOptions.json';
import Avatar from 'material-ui/Avatar';
import EditorAttachMoney from 'material-ui/svg-icons/editor/attach-money';

class COLComparisonCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: 'N/A',
      destination: 'N/A',
      originArray: [],
      destinationArray: [],
    };
    this.objectKeyByValue = this.objectKeyByValue.bind(this);
    this.calculateChangeInCOL = this.calculateChangeInCOL.bind(this);
    this.calculateColor = this.calculateColor.bind(this);
  }

  calculateColor() {
    let originTotal = 0;
    let destinationTotal = 0;
    for ( let value of this.state.originArray ) {
      originTotal += value.currency_dollar_value;
    }
    for ( let value of this.state.destinationArray ) {
      destinationTotal += value.currency_dollar_value;
    }
    let ratio = originTotal/destinationTotal;
    if ( ratio > 1.6 ) {
      return green500;
    } else if ( ratio > 1.2 ) {
      return lightGreen500;
    } else if ( ratio > 0.8 ) {
      return amber500;
    } else if ( ratio > 0.4 ) {
      return orange500;
    } else {
      return red500;
    }
  }
  componentWillReceiveProps() {
    this.setState({
      origin: this.objectKeyByValue(CityOptions, this.props.origin)[0],
      destination: this.objectKeyByValue(CityOptions, this.props.destination)[0],
      originArray: this.props.originArray,
      destinationArray: this.props.destinationArray,
    });
  }

  objectKeyByValue (obj, val) {
    if ( typeof val === 'undefined' ) {
      return [''];
    }
    return Object.entries(obj).find(i => i[1] === val);
  }

  calculateChangeInCOL () {
    let originTotal = 0;
    let destinationTotal = 0;
    for ( let value of this.state.originArray ) {
      originTotal += value.currency_dollar_value;
    }
    for ( let value of this.state.destinationArray ) {
      destinationTotal += value.currency_dollar_value;
    }
    let ratio = originTotal/destinationTotal;
    if ( isNaN(ratio) ) {
      return 'N/A';
    }
    if (ratio > 1) {
      return '↓' + Math.floor((originTotal - destinationTotal)/originTotal*100) + '%';
    } else {
      return '↑' + Math.floor((destinationTotal - originTotal)/originTotal*100) + '%';
    }
  }

  render() {
    const color = this.calculateColor();
    const styles = {
      growStyle: {
        flexGrow: 1,
      },
      cardText: {
        minWidth: 200,
        height: 150,
        position: 'relative',
        backgroundColor: color,
      },
      cutOffText: {
        right: -12,
        bottom: -40,
        position: 'absolute',
        fontFamily: "'Roboto Light', sans-serif",
        color: grey50,
        fontSize: '5em'
      },
      card: {
        backgroundColor: color,
        margin: 8,
        overflow: 'hidden',
      }
    };
    return (
      <div>
        <MuiThemeProvider>
          <Card
            style={styles.card}>
            <ListItem
              primaryText='Cost of Living Comparison'
              secondaryText={this.state.origin + ' → ' + this.state.destination}
              disabled={true}
              style={{backgroundColor: grey50}}
              leftAvatar={
                <Avatar
                icon={<EditorAttachMoney/>}
                backgroundColor={color}
                />
              }
            />
            <CardText
              style={styles.cardText}>
              <span
                style={styles.cutOffText}>
                {this.calculateChangeInCOL()}
              </span>
            </CardText>
          </Card>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default COLComparisonCard;
