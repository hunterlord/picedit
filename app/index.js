import React from 'react';
import ReactDom from 'react-dom';
import 'styles/style.css';

const Demo = <div>Simple Components</div>;
const App = () => <div className="big"> Hello world , {Demo}</div>;

ReactDom.render(<App />, document.getElementById('app'));
