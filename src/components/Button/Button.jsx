import PropTypes from 'prop-types';
import { Btn } from './Button.styled';
import React from 'react';

const Button = ({ onPagination }) => {
  const handlePagination = () => {
    onPagination();
  };

  return (
    <>
      <Btn onClick={handlePagination} type="button">
        Load more
      </Btn>
    </>
  );
};

export default Button;

Button.propTypes = { handlePagination: PropTypes.func };
