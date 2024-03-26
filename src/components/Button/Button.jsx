import { Component } from 'react';

import css from './Button.module.css';

class Button extends Component {
  render() {
    return (
      <button type="submit" className={css.Button} onClick={this.props.onClick}>
        Load more
      </button>
    );
  }
}

export default Button;
