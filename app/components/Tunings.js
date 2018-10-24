var React = require('react');

class Tunings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='tunings'>
        <h2>Tunings</h2>
        <ul>
          {Object.keys(this.props.tunings).map((key, index) => {
            return (
              <li key={index}>
                <label htmlFor={key}>{key}</label>
                <input
                  min={this.props.tunings[key].min}
                  max={this.props.tunings[key].max}
                  step={this.props.tunings[key].step}
                  type="range"
                  name={key}
                  id={key}
                  value={this.props.tunings[key].value}
                  onChange={this.props.handleTuningAdjustment}
                />
                <span>{this.props.tunings[key].value}</span>
              </li>
            )
          })}
        </ul>

      </div>
    )
  }
}

module.exports = Tunings;