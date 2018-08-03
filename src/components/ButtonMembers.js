import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'


const styles = theme => ({
  selected: {
    fontSize: "10px",
    margin: "2px",
  },
  noSelected: {
    fontSize: "10px",
    margin: "2px",
  }
})

class ButtonMembers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      members: this.props.members
    }
  }

  toggleMember = (nickname, callback, e) => {
    e.preventDefault()
    callback(nickname)
  }

  render() {
    const { classes } = this.props
    return (
      <div style={{textAlign: "center"}}>
        {this.props.members.map(member => (
          <Button
            variant="outlined"
            color={this.props.isSelected(member.nickname) ? 'secondary' : 'primary'}
            className={this.props.isSelected(member.nickname) ? classes.selected : classes.noSelected}
            key={member.nickname}
            onClick={(e) => this.toggleMember(member.nickname, this.props.callback, e)}
          >
            {member.nickname}
          </Button>
        ))}
      </div>
    );
  }
}

ButtonMembers.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ButtonMembers)