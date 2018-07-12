---
order: 0
title:
    zh-CN: 基础使用
    en-US: Basic
---

## zh-CN

DEMO 介绍

```jsx
import { Datepicker } from 'antd-demo'
class App extends React.Component {

  onChange = value => {
    console.log(value)
  }

  render() {
    return (
      <Datepicker onChange={this.onChange} defaultValue='2018-07-28'/>
    );
  }
}
ReactDOM.render(<App />, mountNode)
```
