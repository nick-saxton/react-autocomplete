import React from "react";
import Autocomplete from "./Autocomplete";

const options = [
  "Apple",
  "Banana",
  "Orange",
  "Pear",
  "Grape",
  "Raspberry",
  "Strawberry",
  "Kiwi"
].sort((a, b) => a.localeCompare(b));

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fruitOptions: []
    };

    this.handleAutocompleteChange = this.handleAutocompleteChange.bind(this);
  }

  handleAutocompleteChange(e) {
    const searchValue = e.target.value;

    this.setState({
      fruitOptions: searchValue.length
        ? options.filter(
            option =>
              option
                .toLocaleLowerCase()
                .indexOf(searchValue.toLocaleLowerCase()) >= 0
          )
        : []
    });
  }

  render() {
    return (
      <div className="container">
        <h1>React Autocomplete Demo</h1>
        <Autocomplete
          onChange={this.handleAutocompleteChange}
          options={this.state.fruitOptions}
        />
      </div>
    );
  }
}

export default App;
