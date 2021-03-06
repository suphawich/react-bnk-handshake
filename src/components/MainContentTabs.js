import React from 'react'
import Media from 'react-media'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import SwipeableViews from 'react-swipeable-views'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'

import SimpleTable from './SimpleTable'

function TabContainer({ children, dir, mobileSize }) {
  return (
    <Media query={{ maxWidth: mobileSize }}>
    {matches =>
      matches ? (
        <Typography component="div" dir={dir} style={{ padding: 8 * 1}}>
          {children}
        </Typography>
      ) : (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3}}>
          {children}
        </Typography>
      )}
    </Media>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  tabs: {
    width: "100%",
    backgroundColor: theme.palette.primary.main
  },
  label: {
    [theme.breakpoints.down('xs')]: {
      fontSize: "11px",
    }
  }
});

class MainContentTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props
    let mobileSize = this.props.mobileSize || 320

    return (
      <div>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            fullWidth
            className={classes.tabs}
          >
            <Tab label="18 August" classes={{ label: classes.label }} />
            <Tab label="19 August" classes={{ label: classes.label }} />
            <Tab label="03 November" classes={{ label: classes.label }} />
            <Tab label="04 November" classes={{ label: classes.label }} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction} mobileSize={mobileSize}><SimpleTable members={this.props.membersTabOne} mobileSize={mobileSize} /></TabContainer>
          <TabContainer dir={theme.direction} mobileSize={mobileSize}><SimpleTable members={this.props.membersTabTwo} mobileSize={mobileSize} /></TabContainer>
          <TabContainer dir={theme.direction} mobileSize={mobileSize}><SimpleTable members={this.props.membersTabThree} mobileSize={mobileSize} /></TabContainer>
          <TabContainer dir={theme.direction} mobileSize={mobileSize}><SimpleTable members={this.props.membersTabFour} mobileSize={mobileSize} /></TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

MainContentTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MainContentTabs);