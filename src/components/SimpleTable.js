import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    width: "100%",
    fontSize: "12px",
    // height: theme.spacing.unit * 38,
  },
  norow: {
    textAlign: "center",
    height: theme.spacing.unit * 34,
  },
  tableCell: {
    // maxHeight: "8px"
  }
});

class SimpleTable extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <Paper className={classes.root}>
        <table className={classes.table}>
          <thead>
            <tr>
              <th >Name</th>
              <th >9:00-10:30</th>
              <th >9:00-10:30</th>
              <th >9:00-10:30</th>
              <th >9:00-10:30</th>
              <th >9:00-10:30</th>
              <th >9:00-10:30</th>
              <th >9:00-10:30</th>
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