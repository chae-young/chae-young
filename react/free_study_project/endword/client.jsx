const React = require('react');
const ReactDom = require('react-dom');

//wordrealy.jsx 가져오기
const WordRelay = require('./WordRealy')

ReactDom.render(<WordRelay/>,document.querySelector('#root'))