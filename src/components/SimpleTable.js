import React from 'react'
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
    textAlign: "center",
    fontSize: "12px",
    [theme.breakpoints.down(500)]: {
      fontSize: "7px"
    },
    color: theme.palette.primary.main
  },
  norow: {
    textAlign: "center",
    height: theme.spacing.unit * 26,
    [theme.breakpoints.down(320)]: {
      height: theme.spacing.unit * 6,
    }
  },
  cellName: {
    backgroundColor: '',
  },
  cellRound: {
    backgroundColor: theme.palette.secondary.main,
  },
})

class SimpleTable extends React.Component {
  render() {
    const { classes } = this.props

    return (
      <Paper className={classes.root}>
        <table className={classes.table} cellSpacing="0" botder="1">
          <thead>
            <tr className={classes.tableRow}>
              <th >Name</th>
              <th>9:00-10:30</th>
              <th>10:30-12:00</th>
              <th>12:00-13:30</th>
              <th>13:30-15:00</th>
              <th>15:00-16:30</th>
              <th>16:30-18:00</th>
              <th>18:30-21:30</th>
            </tr>
          </thead>
          {this.props.members.length === 0 ? (
            <tbody>
              <tr className={classes.norow}>
                <td colSpan={8}>Please, select member first step.</td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {this.props.members.map(member => (
                <tr key={member.nickname}>
                  <td className={classes.cellName}>{member.nickname}</td>
                  <td className={member.rounds[0] ? classes.cellRound : ''}>{member.rounds[0] ? 'O' : '-'}</td>
                  <td className={member.rounds[1] ? classes.cellRound : ''}>{member.rounds[1] ? 'O' : '-'}</td>
                  <td className={member.rounds[2] ? classes.cellRound : ''}>{member.rounds[2] ? 'O' : '-'}</td>
                  <td className={member.rounds[3] ? classes.cellRound : ''}>{member.rounds[3] ? 'O' : '-'}</td>
                  <td className={member.rounds[4] ? classes.cellRound : ''}>{member.rounds[4] ? 'O' : '-'}</td>
                  <td className={member.rounds[5] ? classes.cellRound : ''}>{member.rounds[5] ? 'O' : '-'}</td>
                  <td className={member.rounds[6] ? classes.cellRound : ''}>{member.rounds[6] ? 'O' : '-'}</td>
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
}

export default withStyles(styles)(SimpleTable);