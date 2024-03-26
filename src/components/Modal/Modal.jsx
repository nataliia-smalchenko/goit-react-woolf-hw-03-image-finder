import { Component } from 'react';

import css from './Modal.module.css';

class Modal extends Component {
  closeByEscape = evt => {
    if (evt.code === 'Escape') {
      this.props.close();
    }
  };
  componentDidMount() {
    document.addEventListener('keydown', this.closeByEscape);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeByEscape);
  }
  render() {
    return (
      <div
        className={css.Overlay}
        onClick={evt => {
          if (evt.target === evt.currentTarget) {
            this.props.close();
          }
        }}
      >
        <div className={css.Modal}>
          <img src={this.props.image} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
