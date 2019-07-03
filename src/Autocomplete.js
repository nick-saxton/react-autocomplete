import React from "react";

class Autocomplete extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      valueSelected: false
    };

    this.inputRef = React.createRef();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
  }

  handleInputChange(e) {
    this.props.onChange(e);
  }

  handleInputKeyDown(e) {
    const { activeIndex, valueSelected } = this.state;

    switch (e.keyCode) {
      case 8: // Backspace
        if (valueSelected) {
          e.target.value = "";
          this.props.onChange(e);
          this.setState({
            valueSelected: false
          });
        }
        break;

      case 13: // Enter key
        this.handleSelection(activeIndex);
        break;

      case 38: // Up arrow
        if (activeIndex >= 1) {
          this.setState({
            activeIndex: activeIndex - 1
          });

          e.preventDefault();
        }
        break;

      case 40: // Down arrow
        if (activeIndex < this.props.options.length - 1) {
          this.setState({
            activeIndex: activeIndex + 1
          });

          e.preventDefault();
        }
        break;

      default:
        if (valueSelected) {
          e.preventDefault();
        }
        break;
    }
  }

  handleSelection(index) {
    if (this.props.options[index]) {
      this.setState({
        valueSelected: true
      });

      this.inputRef.current.value = this.props.options[index];
    }
  }

  render() {
    return (
      <div className="autocomplete">
        <div className="autocomplete-input">
          <input
            onChange={this.handleInputChange}
            onKeyDown={this.handleInputKeyDown}
            type="text"
            ref={this.inputRef}
          />
        </div>
        <div className="autocomplete-results">
          {this.props.options.length > 0 && !this.state.valueSelected && (
            <ul>
              {this.props.options.map((option, index) => (
                <li
                  className={`${
                    this.state.activeIndex === index ? "active" : ""
                  }`}
                  key={option}
                  onClick={() => this.handleSelection(index)}
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
