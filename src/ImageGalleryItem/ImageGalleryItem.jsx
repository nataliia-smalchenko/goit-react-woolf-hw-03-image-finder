import { Component } from 'react';

import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  render() {
    return (
      <li className={css.ImageGalleryItem}>
        <img
          className={css['ImageGalleryItem-image']}
          src={this.props.src}
          alt={this.props.alt}
          onClick={this.props.onClick}
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
