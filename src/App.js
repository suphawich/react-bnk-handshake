import React, { Component } from 'react'
import MainContentTabs from './components/MainContentTabs'
import SelectMembersTabs from './components/SelectMembersTabs'
import Option from './components/Option'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const liff = window.liff

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedMembers: [],
      members: [],
      schedule: {},
      checkedSBR: true,
      displayName: '',
      userId: '',
      pictureUrl: '',
      statusMessage: ''
    };
    this.initialize = this.initialize.bind(this)
    this.closeApp = this.closeApp.bind(this)
  }

  selectedMember = (nickname) => {
    let arr = this.state.selectedMembers
    if (arr.includes(nickname)) {
      // let index = arr.indexOf(nickname)
      // delete arr[index]
      arr = arr.filter(n => (n !== nickname))
    } else {
      arr.push(nickname)
    }
    this.setState({ selectedMembers: arr })
  }

  isSelected = (nickname) => {
    return this.state.selectedMembers.includes(nickname)
  }

  clearSelectedMembers = () => {
    // if (this.state.selectedMembers.length > 0 && !window.confirm('Do you want clear all selected members?')) return
    this.setState({selectedMembers: []})
  }

  selectedMembers = (date) => {
    let data = []
    this.state.selectedMembers.forEach(nickname => {
      let rounds = this.state.schedule[date][nickname]
      data.push({ nickname: nickname, rounds: rounds })
    })

    if (data.length < 2) return data

    if (this.state.checkedSBR) {
      let cal = (rounds, number) => {
        let total = 0
        let dataScore = [48,24,12,6,3,2,1]
        for (let i = 0, score = 0; i < number; i++, score++) {
          if (rounds[i]) total += dataScore[score]
        }
        return total
      }
  
      let swap = (indexBefore, indexCurrent, data) => {
        let beforemember = data[indexBefore]
        data[indexBefore] = data[indexCurrent]
        data[indexCurrent] = beforemember
        return data
      }
  
      for (let number = 1; number <= data.length; number++) {
        for (let r = 0; r < data.length; r++) {
          for (let i = 1; i < data.length; i++) {
            let beforemember = data[i-1]
            let currentmember = data[i]
            if (cal(beforemember.rounds, number) < cal(currentmember.rounds, number)) {
              data = swap(i-1, i, data)
            }
          }
        }
      }
    }
    return data
  }

  componentDidMount() {
    window.addEventListener('load', this.initialize)
    fetch('/api/members')
      .then(response => response.json())
      .then(json => {
        this.setState({ members: json })
      })

    // 3RD HANDSHAKE EVENTS
    fetch('/api/3rdhandshake/Aug-18-2018')
      .then(response => response.json())
      .then(json => {
        let schedule = this.state.schedule
        schedule['Aug-18-2018'] = json
        this.setState({ schedule: schedule })
      })
    fetch('/api/3rdhandshake/Aug-19-2018')
      .then(response => response.json())
      .then(json => {
        let schedule = this.state.schedule
        schedule['Aug-19-2018'] = json
        this.setState({ schedule: schedule })
      })

    // 4TH HANDSHAKE EVENTS
    fetch('/api/4thhandshake/Nov-03-2018')
      .then(response => response.json())
      .then(json => {
        let schedule = this.state.schedule
        schedule['Nov-03-2018'] = json
        this.setState({ schedule: schedule })
      })
    fetch('/api/4thhandshake/Nov-04-2018')
      .then(response => response.json())
      .then(json => {
        let schedule = this.state.schedule
        schedule['Nov-04-2018'] = json
        this.setState({ schedule: schedule })
      })
  }

  initialize() {
    liff.init(async (data) => {
      let profile = await liff.getProfile();
      this.setState({
        displayName: profile.displayName,
        userId: profile.userId,
        pictureUrl: profile.pictureUrl,
        statusMessage: profile.statusMessage
      });
    });
  }

  closeApp(event) {
    event.preventDefault();
    liff.sendMessages([{
      type: 'text',
      text: "Thank you, Bye!"
    }]).then(() => {
      liff.closeWindow();
    });
  }

  handleCheckedSBR = (status) => {
    this.setState({checkedSBR: status})
  }

  render() {
    return (
      <div className="App" style={{minHeight: "100vh", backgroundColor: "pink"}}>
        <Grid container spacing={24} justify="center" style={{paddingBottom: "3%"}}>
          <Grid item xs={12}>
            <Typography variant="headline" align="center" style={{marginTop: "2%", marginBottom: "3%" }}>
              BNK48 3rd Handshake Event 18 - 19 Aug
            </Typography>
          </Grid>
          <Grid container spacing={24} justify="center">
            <Grid item xs={6}>
              <Paper>
                <MainContentTabs
                  membersTabOne={this.selectedMembers('Aug-18-2018')}
                  membersTabTwo={this.selectedMembers('Aug-19-2018')}
                  membersTabThree={this.selectedMembers('Nov-03-2018')}
                  membersTabFour={this.selectedMembers('Nov-04-2018')}
                />
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Grid container spacing={24} justify="center">
                <Grid item xs={12}>
                  <Paper>
                    <SelectMembersTabs
                      callback={this.selectedMember}
                      isSelected={this.isSelected}
                      members={this.state.members}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper>
                    <Option
                      checkedSBR={this.state.checkedSBR}
                      handleCheckedSBR={this.handleCheckedSBR}
                      clearSelectedMembers={this.clearSelectedMembers}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;