import { Component } from 'react';

import css from './ImageGallery.module.css';

import ImageGalleryItem from 'ImageGalleryItem/ImageGalleryItem';

class ImageGallery extends Component {
  render() {
    return (
      <ul className={css.ImageGallery}>
        {this.props.images.map(image => (
          <ImageGalleryItem
            key={image.id}
            src={image.webformatURL}
            onClick={() => {
              this.props.onClick(image.id);
            }}
            alt=""
          />
        ))}
      </ul>
    );
  }
}

export default ImageGallery;
