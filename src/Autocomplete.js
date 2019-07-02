import React from "react";

class Autocomplete extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
  }

  handleInputChange(e) {
    this.props.onChange(e);
  }

  handleInputKeyDown(e) {
    const currentActiveIndex = this.state.activeIndex;

    switch (e.keyCode) {
      case 38:
        if (currentActiveIndex >= 1) {
          console.log("Up");
          this.setState({
            activeIndex: currentActiveIndex - 1
          });

          e.preventDefault();
        }
        break;
      case 40:
        if (currentActiveIndex < this.props.options.length - 1) {
          console.log("Down");
          this.setState({
            activeIndex: currentActiveIndex + 1
          });

          e.preventDefault();
        }
        break;
      default:
        break;
    }

    console.log(e.keyCode);
  }

  render() {
    return (
      <div className="autocomplete">
        <div className="autocomplete-input">
          <input
            onChange={this.handleInputChange}
            onKeyDown={this.handleInputKeyDown}
            type="text"
          />
        </div>
        <div className="autocomplete-results">
          {this.props.options.length > 0 && (
            <ul>
              {this.props.options.map((option, index) => (
                <li
                  className={`${
                    this.state.activeIndex === index ? "active" : ""
                  }`}
                  key={option}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default Autocomplete;
