import React from 'react';
import ReactDom from 'react-dom';

const Demo = <div>Simple Components</div>;
const App = () => <div> Hello world , {Demo}</div>;

ReactDom.render(<App />, document.getElementById('app'));
