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
      this.config = {
        dateConfig: [
          { value: 'day' , name: '自然日' },
          { value: 'week', name: '自然周' },
          { value: 'range', name: '自定义' }
        ],
        onChange: this.onChange,
        defaultValue: '2018-07-28'
      }
  }

  onChange = value => {
    console.log(value)
  }

  render() {
    const config = this.config; 
    return (
      <Datepicker {...config}/>
    );
  }
}
ReactDOM.render(<App />, mountNode)
```
