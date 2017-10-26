import React,{Component} from 'react';
import { Affix, Button } from 'antd';
import ReactDOM from 'react-dom';
ReactDOM.render(
  <div>
    <Affix>
      <Button type="primary">Affix top</Button>
    </Affix>
    <br />
    <Affix offsetBottom={0}>
      <Button type="primary">Affix bottom</Button>
    </Affix>
  </div>,
  app
);