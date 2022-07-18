import { Component } from 'react';
import { Searchbar } from 'components/Searchbar';
import SearchApiService from '../api';
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
    status: 'idle',
    url: null,
    isModalShow: false,
  };

  searchImg = new SearchApiService();

  async componentDidUpdate(_, prevState) {
    const { page, searchQuery } = this.state;

    if (searchQuery !== prevState.searchQuery || page !== prevState.page) {
      this.setState({ status: 'pending' });

      try {
        const response = await this.searchImg.fetchItems(page, searchQuery);

        if (response.total === 0) {
          Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.',
            {
              clickToClose: true,
            }
          );
          this.setState({ images: [] });
          throw new Error();
        }

        this.setState(prevState => ({
          status: 'resolved',
          images: [...prevState.images, ...response.data.hits],
        }));
      } catch (error) {
        this.setState({ status: 'rejected' });
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

  toggleModal = () => {
    this.setState(prevState => ({
      isModalShow: !prevState.isModalShow,
    }));
  };

  handleImageClick = (largeImageURL, tags) => {
    this.setState({ largeImageURL, tags });
    this.toggleModal();
  };

  render() {
    const { images, page, status, largeImageURL, isModalShow, tags } =
      this.state;
    const isLastPage = Math.round(images.length / 12) < page;

    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        {images.length > 0 && (
          <ImageGallery images={images} onClick={this.handleImageClick} />
        )}
        {status === 'pending' && startLoader()}
        {(status === 'rejected' && <h1> Ups... something went wrong</h1>) ||
          stopLoader()}
        {status === 'resolved' && !isLastPage && (
          <Button onClick={this.handleLoadMore} status={status} />
        )}
        {isModalShow && largeImageURL && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </div>
    );
  }
}
