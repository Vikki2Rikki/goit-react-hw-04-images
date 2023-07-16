import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';
import Modal from 'components/Modal/Modal';
import { useState } from 'react';
import React from 'react';

const ImageGallery = ({ images }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [imageModalURL, setImageModalURL] = useState('');

  const onOpenModal = imageId => {
    const findImg = images.filter(image => {
      return imageId === image.id;
    });
    setIsShowModal(true);
    setImageModalURL(findImg[0].largeImageURL);
  };

  const onCloseModal = () => {
    setIsShowModal(false);
    setImageModalURL('');
  };

  return (
    <>
      <Gallery>
        {images.map(img => (
          <ImageGalleryItem
            imageId={img.id}
            key={img.id}
            alt={img.tags}
            webformatURL={img.webformatURL}
            largeImageURL={img.largeImageURL}
            onOpenModal={onOpenModal}
          />
        ))}
      </Gallery>
      {isShowModal && (
        <Modal largeImageURL={imageModalURL} onCloseModal={onCloseModal} />
      )}
    </>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  isShowModal: PropTypes.bool,
  imageModalURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  onCloseModal: PropTypes.func,
};
