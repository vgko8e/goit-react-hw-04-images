import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';
import { ImageGalleryItem } from './ImageGalleryItem';

export const ImageGallery = ({ images, onclick }) => {
  return (
    <ul className={styles.imageGallery}>
      {images.map(image => {
        return (
          <ImageGalleryItem key={image.id} image={image} onclick={onclick} />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
};
