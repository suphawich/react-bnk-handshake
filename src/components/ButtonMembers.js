import React from 'react'
import Button from '@material-ui/core/Button'

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
    return (
      <div style={{textAlign: "center"}}>
        {this.props.members.map(member => (
          <Button variant="outlined" color={this.props.isSelected(member.nickname) ? 'primary' : 'secondary'} style={{fontSize: "10px", margin: "2px" }} key={member.nickname} onClick={(e) => this.toggleMember(member.nickname, this.props.callback, e)}>{member.nickname}</Button>
        ))}
      </div>
    );
  }
}

export default ButtonMembers