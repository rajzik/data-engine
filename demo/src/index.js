import React from 'react';
import { render } from 'react-dom';

import App from './app';
import Data from './data';

render(<App data={Data} />, document.getElementById('main'));

