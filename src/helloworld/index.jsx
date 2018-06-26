import React from 'react'

import './style/index.scss'
import sampleImg from './assets/imgs/smile-dog.png'

export default class Helloworld extends React.Component {
  render() {
    return (
      <div>
        <img src={sampleImg} alt="" />
        <span>
          Hello <span className="name">{this.props.name}</span>
        </span>
        <span className="bg-img" />
      </div>
    )
  }
}
