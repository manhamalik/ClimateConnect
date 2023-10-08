import React from 'react';
import './WeatherBox.css';

export default class WeatherBox extends React.Component {
  // returns weekday to a given Date value
  getDay = (date) => {
    let weekday = new Array(7);
    weekday[0] = 'Sunday';
    weekday[1] = 'Monday';
    weekday[2] = 'Tuesday';
    weekday[3] = 'Wednesday';
    weekday[4] = 'Thursday';
    weekday[5] = 'Friday';
    weekday[6] = 'Saturday';

    return weekday[new Date(date).getDay()];
  };

  async getImageSrc(icon) {
    try {
      // Use dynamic import to load the image based on the icon name
      const { default: image } = await import(`../images/${icon}.svg`);
      return image;
    } catch (error) {
      // Handle any errors, e.g., image not found
      console.error(error);
      return null; // Return a default image or null as needed
    }
  }

  async componentDidMount() {
    const { icon } = this.props;
    const iconSrc = await this.getImageSrc(icon);

    this.setState({ iconSrc });
  }

  render() {
    const { date, temp } = this.props;
    const { iconSrc } = this.state || {};

    return (
      <div className='weather-box'>
        <h1>{date ? this.getDay(date) : ''}</h1>
        {iconSrc && <img src={iconSrc} alt='sun' />}
        <span className='temp'>{Math.round(temp - 273.15)}°C</span>
      </div>
    );
  }
}
