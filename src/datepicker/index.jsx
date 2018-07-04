import React from 'react'

import './style/index.scss'

export default class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.state = { seconds: 0 }
  }

  tick() {
    this.setState(prevState => ({
      seconds: prevState.seconds + 1
    }))
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return <div>Seconds: <span className='time'>{this.state.seconds}</span></div>
  }
}
