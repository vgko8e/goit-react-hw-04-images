import { useState } from 'react';
import styles from './Searchbar.module.css';
import Notiflix from 'notiflix';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSearchForm = e => {
    e.preventDefault();

    if (searchQuery.trim(' ') === '') {
      Notiflix.Notify.failure('Please, fill out the form');
      return;
    }

    onSubmit(searchQuery);
  };

  return (
    <header className={styles.searchbar}>
      <form className={styles.searchForm} onSubmit={handleSearchForm}>
        <button type="submit" className={styles.searchForm_button}>
          <ImSearch />
        </button>

        <input
          className={styles.searchForm_input}
          value={searchQuery}
          onChange={handleInputChange}
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
