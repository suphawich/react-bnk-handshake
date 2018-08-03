import React from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

class Option extends React.Component {

  handleCheckedSBR = (e) => {
    this.props.handleCheckedSBR(e.target.checked)
  }

  render() {
    return (
      <Grid style={{display: "flex", padding: "10px"}}>
        <FormControl>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={this.props.checkedSBR}
                  onChange={(e) => this.props.handleCheckedSBR(e.target.checked)}
                  value="checkedB"
                  color="primary"
                />
              }
              label="Sort by round"
            />
          </FormGroup>
        </FormControl>
        <FormControl>
            <Button variant="outlined" color="primary" onClick={(e) => this.props.clearSelectedMembers()} justify="center">
              {/* <DeleteIcon /> */}
              CLEAR
            </Button>
          </FormControl>
      </Grid>
    )
  }
}

export default Option