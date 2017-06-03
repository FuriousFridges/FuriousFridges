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
import ReactHighcharts from 'react-highcharts';
import {
	grey500, white, green500,
} from 'material-ui/styles/colors';


class EventList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			events: []
		}
	}

	searchEvents(location) {
		axios.get('/events')
			.then(res => {
				this.setState({
					events: res.data
				})
			}) 
		}
 


	render() {
		return()
	}


}