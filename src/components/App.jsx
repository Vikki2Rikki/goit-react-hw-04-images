import { useEffect, useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { Contaner } from './App.styled';
import { getImages, PER_PAGE } from 'servises/api';
import { Loader } from './Loader/Loader';
import { toast, Toaster } from 'react-hot-toast';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import React from 'react';

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!searchText) {
      return;
    }
    setIsLoading(true);
    setError('');

    getImages(searchText, page)
      .then(resp => {
        if (!resp.totalHits) {
          toast.error(
            `Sorry, there are no images matching your search query: ${searchText}. Please try again. `
          );
        } else {
          setImages(images => [...images, ...resp.hits]);
          setTotalHits(resp.totalHits);
        }
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.response.data);
        toast.error(`Ooops! Something went wrong: "${err.response.data}"`);
      });
  }, [searchText, page]);

  const handleSearch = searchText => {
    setSearchText(searchText);
    setImages([]);
    setPage(1);
    setTotalHits(0);
  };

  const onPagination = () => {
    setPage(prev => prev + 1);
  };

  return (
    <Contaner>
      <Searchbar handleSearch={handleSearch} />
      {isLoading && <Loader />}
      {error ? <p>... </p> : <ImageGallery images={images} />}

      {page < Math.ceil(totalHits / PER_PAGE) && (
        <Button onPagination={onPagination} />
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </Contaner>
  );
};

export default App;
