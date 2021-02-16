import './App.css';

import CustomColorPicker from './custom-color-picker';
import { Component } from 'react';

const inlineStyles = {
  colorPickerPopover: {
    position: 'absolute',
    zIndex: '2',
    top: '7px',
  }
}

const colorPickerColors = [
  { color: "rgb(0,0,0)", title: 'black' },
  { color: "rgb(0,0,255)", title: 'blue' },
  { color: "rgb(0,255,0)", title: 'green' },
  { color: "rgb(255,0,0)", title: 'red' },
  { color: "rgba(0,0,0,0)", title: 'no color' }
]

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { colorPickerOpen: true, color: '#aaa' };
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handlePageClick, false)
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handlePageClick, false)
  }
  
  handlePageClick = (e) => {
    if (this.node && this.node.contains(e.target)) {
      return
    }
    this.setState({ colorPickerOpen: false })
  };

  handleChange = (type, color) => {
    this.setState({color: color})
  }

 
  render() {
    return (
      <>
        <div
          onClick={() => this.setState({ colorPickerOpen: !this.state.colorPickerOpen }) }
        >
          {this.state.color}
        </div>
        <div style={{ position: 'relative' }}>
          {this.state.colorPickerOpen &&
            <div
              ref={node => this.node = node}
              style={inlineStyles.colorPickerPopover}
            >
              <CustomColorPicker
                hexCode={this.state.color || '#aaa'}
                colors={colorPickerColors}
                heading='Heading'
                onChange={(color) => {
                  this.handleChange('color', color.hex)
                }
                }
              />
            </div>
          }
        </div>
      </>
    )
  }
}

export default App;
