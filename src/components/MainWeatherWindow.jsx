import React from 'react';
import './MainWeatherWindow.css';
import { createRoot } from 'react-dom';
import sunImage from '../images/01d.svg'; // Import the image using import

export default class MainWeatherWindow extends React.Component {
  componentDidMount() {
    // Create a root and render the component within it
    const root = createRoot(document.getElementById('root'));
    root.render(<MainWeatherWindowInternal {...this.props} />);
  }

  render() {
    // Placeholder element to be replaced by the root
    return <div id='root'></div>;
  }
}

function titleCase(str) {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function MainWeatherWindowInternal(props) {
  const Title = props.city ? null : <h1 className='title'>ClimateConnect</h1>;

  // Display weather information only if data is available
  const weatherInfo = props.data ? (
    <div className='today'>
      <span>Today</span>
      <h1>{props.city}</h1>
      <p>
        Temperature: {Math.round(props.data.temp - 273.15)}°C
      </p>
      <p>Condition: {titleCase(props.data.weather_desc)}</p>
    </div>
  ) : null;

  return (
    <div className='main'>
      <div className='inner-main'>
        {Title}
        <img
          src={props.data ? sunImage : ''}
          alt='sun'
          style={{
            visibility: props.city ? 'visible' : 'hidden',
            opacity: props.city ? '1' : '0',
          }}
        />
        {weatherInfo} {/* Display weather information */}
      </div>
      {props.children}
    </div>
  );
}
