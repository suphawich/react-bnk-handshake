import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import SwipeableViews from 'react-swipeable-views'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'

import ButtonMembers from './ButtonMembers'

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
});

class SelectMembersTabs extends React.Component { 
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  }

  handleChangeIndex = index => {
    this.setState({ value: index });
  }

  filterGen = (members, gen) => {
    let data = []
    members.forEach(m => {
      if (m.gen === gen) {
        data.push(m)
      }
    })
    return data
  }

  render() {
    const { classes, theme } = this.props
    let genOne = this.filterGen(this.props.members, 1)
    let genTwo = this.filterGen(this.props.members, 2)
    
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Gen 1" />
            <Tab label="Gen 2" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <ButtonMembers callback={this.props.callback} isSelected={this.props.isSelected} members={genOne} />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <ButtonMembers callback={this.props.callback} isSelected={this.props.isSelected} members={genTwo} />
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

SelectMembersTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SelectMembersTabs);