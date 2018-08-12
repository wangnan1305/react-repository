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
  
  constructor(props) {
      super(props);
      this.dateConfig = [
        { value: 'day' , name: '按日查询' },
        { value: 'week', name: '按周查询' }
      ]
  }

  onChange = value => {
    console.log(value)
  }

  render() {
    return (
      <Datepicker onChange={this.onChange} defaultValue='2018-07-28' dateConfig={this.dateConfig} />
    );
  }
}
ReactDOM.render(<App />, mountNode)
```
