import React, { Component } from 'react';
import styles from './Searchbar.module.css';
import Notiflix from 'notiflix';
import { ImSearch } from 'react-icons/im';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleInputChange = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  handleSearchForm = e => {
    e.preventDefault();

    if (this.state.searchQuery.trim(' ') === '') {
      Notiflix.Notify.failure('Please, fill out the form');
      return;
    }

    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className={styles.searchbar}>
        <form className={styles.searchForm} onSubmit={this.handleSearchForm}>
          <button type="submit" className={styles.searchForm_button}>
            <ImSearch />
          </button>

          <input
            className={styles.searchForm_input}
            value={this.state.searchQuery}
            onChange={this.handleInputChange}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
