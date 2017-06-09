import React from 'react';
import EventCard from './EventCard.jsx';
import MeetUp from './MeetUp.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    const styles = {
      flexStyle: {
        margin: '8px',
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
      emptyStyle: {
        flewGrow: 1000,
      }
    };
    return (
      <div
        style={styles.flexStyle}>
        <div
          style={styles.centerStyle}>
          <div
            style={styles.growStyle}>
            <EventCard />
            <div style={styles.emptyStyle}/>
              <MeetUp />
            <div style={styles.emptyStyle}/>
            
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
