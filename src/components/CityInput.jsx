import React from 'react';
import './CityInput.css';

export default class CityInput extends React.Component {
  // Define the async function outside of the render method
  async handleKeyPress(e) {
    e.persist();
    const eventKey = e.which ? e.which : e.keyCode;
    const city = e.target.value;

    if (eventKey === 13) {
      if (/^[a-zA-ZäöüÄÖÜß ]+$/.test(city)) {
        e.target.classList.add('loading');
        if (await this.props.makeApiCall(city)) {
          e.target.placeholder = 'Enter a City...';
        } else {
          e.target.placeholder = 'City was not found, try again...';
        }
        e.target.classList.remove('loading');
        e.target.value = '';
      } else {
        e.target.placeholder = 'Please enter a valid city name...';
      }
    }
  }

  render() {
    const style = {
      top: this.props.city ? '-380px' : '-20px',
      width: '600px',
      display: 'inline-block',
      padding: '10px 0px 10px 30px',
      lineHeight: '120%',
      position: 'relative',
      borderRadius: '20px',
      outline: 'none',
      fontSize: '20px',
      transition: 'all 0.5s ease-out',
    };

    return (
      <input
        className='city-input'
        style={style}
        type='text'
        placeholder='Enter a City...'
        onKeyPress={(e) => this.handleKeyPress(e)} // Use an arrow function to bind 'this'
      />
    );
  }
}
