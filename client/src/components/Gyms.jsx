import React from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import DatePicker from 'material-ui/DatePicker';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import EventSeat from 'material-ui/svg-icons/action/event-seat';
import Avatar from 'material-ui/Avatar';
import Arrow from 'material-ui/svg-icons/navigation/arrow-forward';
import Divider from 'material-ui/Divider';
import {
  grey500, white, green500,
} from 'material-ui/styles/colors';


class Gyms extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gyms: []
    };
  }
 
  componentWillReceiveProps() {
    axios.get('/gyms')
      .then(res => {
        var sample = [];
        for (var key in res.data) {
          sample.push(res.data[key]);
        }
        this.setState({gyms: sample});
      });
  }

  render() {
    let gyms = Object.entries(this.state.gyms);
    
    const styles = {
      card: {
        width: '100%',
        height: 400,
      },
      gridList: {
        width: '100%',
        height: '80%',
        overflowY: 'auto',
      },
      avatar: {
        backgroundColor: green500,
      },
      cardHeader: {
        height: '20%',
      },
      chart: {
        width: '80%'
      }
    }; 

    return (
      <div>
        <Card
          style={styles.card}>
          <CardHeader
            title="Gyms"
            subtitle={'stay healthy'}
          />
          <Divider/>
          <GridList
            cellHeight={100}
            style={styles.gridList}
          >
            {gyms.map((gym) => (
              <GridTile
                title={gym[1].name}
                cols = {2}
                rows = {2} 
              >
                 <a target="_blank">
                  <img src = {gym[1].image} />
                </a>
              </GridTile>
            ))}
          </GridList>
        </Card>
      </div>   
    );
  }
}

export default Gyms;
