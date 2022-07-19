import { Component } from 'react';
import { Searchbar } from 'components/Searchbar';
import fetchItems from '../api';
import { Notify } from 'notiflix';
import { ImageGallery } from 'components/ImageGallery';
import { startLoader, stopLoader } from 'components/Loader';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';

export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    showMore: false,
    imageUrl: null,
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (searchQuery !== prevState.searchQuery || page !== prevState.page) {
      startLoader();

      try {
        const { data } = await fetchItems(searchQuery, page);

        if (!data.total) {
          Notify.failure('Sorry, no results matching your request', {
            clickToClose: true,
          });
          throw new Error();
        }

        this.setState(prevState => ({
          showMore: true,
          images: [...prevState.images, ...data.hits],
        }));
      } catch (error) {
        this.setState({ showMore: false });
      } finally {
        stopLoader();
      }
    }
  }

  handleSubmit = query => {
    if (query !== this.state.searchQuery) {
      this.setState({ searchQuery: query, page: 1, images: [] });
    }
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = largeImageURL => this.setState({ imageUrl: largeImageURL });
  closeModal = () => this.setState({ imageUrl: null });

  render() {
    const { images, page, showMore, imageUrl, tags } = this.state;
    const { handleSubmit, handleLoadMore, openModal, closeModal } = this;
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
            <img src={imageUrl} alt={tags} />
          </Modal>
        )}
      </div>
    );
  }
}
