import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';

export const ImageGalleryItem = ({ image, onOpenImage }) => {
  const { id, webformatURL, tags, largeImageURL } = image;
  return (
    <li className={styles.imageGalleryItem}>
      <img
        key={id}
        className={styles.imageGalleryItem_image}
        src={webformatURL}
        alt={tags}
        onClick={() => onOpenImage(largeImageURL)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  onOpenImage: PropTypes.func.isRequired,
};
