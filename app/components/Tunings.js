var React = require('react');

class Tunings extends React.Component {
  constructor(props) {
    super(props);

    console.log(props.tunings);
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
                  min='0'
                  max='1'
                  step='.05'
                  type="range"
                  name={key}
                  id={key}
                  value={this.props.tunings[key]}
                  onChange={this.props.handleTuningAdjustment}
                />
                <span>{this.props.tunings[key]}</span>
              </li>
            )
          })}
        </ul>

      </div>
    )
  }
}

module.exports = Tunings;