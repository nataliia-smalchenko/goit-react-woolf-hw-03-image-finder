import css from './App.module.css';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import { Component } from 'react';
import { getImagesApi } from '../../api/images';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

export class App extends Component {
  state = {
    images: [],
    search: '',
    page: 1,
    loading: false,
    error: false,
    openedImage: null,
    loadMore: false,
  };

  handleSubmitSearchForm = searchText => {
    this.setState({
      search: searchText.toLowerCase(),
      page: 1,
      images: [],
    });
  };

  handleLoadMoreClick = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  handleOpenImage = id => {
    const largeImageUrl = this.state.images.find(
      img => img.id === id
    ).largeImageURL;
    this.setState({ openedImage: largeImageUrl });
  };

  componentDidUpdate(_, prevState) {
    if (this.state.search === true) {
      this.setState({ error: false });
    }
    if (
      prevState.page !== this.state.page ||
      prevState.search !== this.state.search
    ) {
      this.getImages();
    }
  }

  getImages = async () => {
    if (this.state.search === '') {
      return;
    }
    try {
      this.setState({ loading: true });
      const data = await getImagesApi(this.state.search, this.state.page, 12);

      this.setState(prevState => {
        return {
          images:
            this.state.page !== 1
              ? [...prevState.images, ...data.hits]
              : data.hits,
          loadMore: this.state.page < Math.ceil(data.totalHits / 12),
        };
      });
    } catch (error) {
      this.setState({
        error: true,
        loadMore: false,
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading, images, loadMore, openedImage } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmitSearchForm} />
        {loading && <Loader />}
        {images.length > 0 && (
          <ImageGallery images={images} onClick={this.handleOpenImage} />
        )}
        {loadMore && <Button onClick={this.handleLoadMoreClick} />}
        {openedImage && (
          <Modal
            image={this.state.openedImage}
            close={() => {
              this.setState({ openedImage: null });
            }}
          />
        )}
      </div>
    );
  }
}
