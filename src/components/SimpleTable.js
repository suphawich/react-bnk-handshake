import React from 'react'
import Media from 'react-media'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    width: "100%",
    fontSize: "8px",
    // height: theme.spacing.unit * 38,
  },
  norow: {
    textAlign: "center",
    height: theme.spacing.unit * 34,
  },
  norowMobile: {
    textAlign: "center",
    height: theme.spacing.unit * 14,
  },
  tableCell: {
    fontSize: "7px"
  }
});

class SimpleTable extends React.Component {
  render() {
    const { classes } = this.props
    let mobileSize = this.props.mobileSize || 320

    return (
      <Paper className={classes.root}>
        <table className={classes.table}>
          <thead>
            <tr>
              <th className={classes.tableCell}>Name</th>
              <th className={classes.tableCell}>9:00-10:30</th>
              <th className={classes.tableCell}>10:30-12:00</th>
              <th className={classes.tableCell}>12:00-13:30</th>
              <th className={classes.tableCell}>13:30-15:00</th>
              <th className={classes.tableCell}>15:00-16:30</th>
              <th className={classes.tableCell}>16:30-18:00</th>
              <th className={classes.tableCell}>18:30-21:30</th>
            </tr>
          </thead>
          {this.props.members.length === 0 ? (
            <Media query={{ maxWidth: mobileSize }}>
            {matches =>
              matches ? (
                <tbody>
                  <tr className={classes.norowMobile}>
                    <td colSpan={8}>Please, select member first step.</td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  <tr className={classes.norow}>
                    <td colSpan={8}>Please, select member first step.</td>
                  </tr>
                </tbody>
              )}
            </Media>
          ) : (
            <tbody>
              {this.props.members.map(member => (
                <tr key={member.nickname} style={{textAlign: "center"}}>
                  <td className={classes.tableCell}>{member.nickname}</td>
                  <td className={classes.tableCell}>{member.rounds[0] ? 'O' : '-'}</td>
                  <td className={classes.tableCell}>{member.rounds[1] ? 'O' : '-'}</td>
                  <td className={classes.tableCell}>{member.rounds[2] ? 'O' : '-'}</td>
                  <td className={classes.tableCell}>{member.rounds[3] ? 'O' : '-'}</td>
                  <td className={classes.tableCell}>{member.rounds[4] ? 'O' : '-'}</td>
                  <td className={classes.tableCell}>{member.rounds[5] ? 'O' : '-'}</td>
                  <td className={classes.tableCell}>{member.rounds[6] ? 'O' : '-'}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </Paper>
    )
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);