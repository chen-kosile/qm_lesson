// document.write('hello from index.ts');
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppRouter} from './router'

ReactDOM.render(
  <AppRouter/>,
  document.getElementById('root')
);

