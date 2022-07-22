import { useState, useEffect } from 'react';
import { Searchbar } from 'components/Searchbar';
import fetchItems from '../api';
import { Notify } from 'notiflix';
import { ImageGallery } from 'components/ImageGallery';
import { startLoader, stopLoader } from 'components/Loader';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showMore, setShowMore] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    const fetchData = async () => {
      startLoader();
      try {
        const { data } = await fetchItems(searchQuery, page);

        if (!data.total) {
          Notify.failure('Sorry, no results matching your request', {
            clickToClose: true,
          });
          throw new Error();
        }

        setShowMore(true);
        setImages(prevImages => [...prevImages, ...data.hits]);
      } catch (error) {
        setShowMore(false);
      } finally {
        stopLoader();
      }
    };

    fetchData();
  }, [searchQuery, page]);

  const handleSubmit = query => {
    if (query !== searchQuery) {
      setSearchQuery(query);
      setPage(1);
      setImages([]);
    }
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const openModal = largeImageURL => setImageUrl(largeImageURL);
  const closeModal = () => setImageUrl(null);

  const isLastPage = Math.round(images.length / 12) < page;

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {showMore && !isLastPage && <Button onClick={handleLoadMore} />}
      {imageUrl && (
        <Modal onClose={closeModal}>
          <img src={imageUrl} alt={imageUrl} />
        </Modal>
      )}
    </div>
  );
};
