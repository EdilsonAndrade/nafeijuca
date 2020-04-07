import React from 'react';
import PropTypes from 'prop-types';
import {
  MdKeyboardArrowLeft,
  MdCheck,
  MdAdd,
  MdRemoveCircle,
} from 'react-icons/md';
import ButtonContent from './styles';

export default function Button({
  handleClick,
  children,
  buttonType,
  saveButton,
  icon,
  background,
  width,
  borderRadius,
  marginTop,
  position,
  left,
}) {
  const getIconButton = () => {
    switch (icon) {
      case 'add': {
        return <MdAdd size={22} color="#eee" />;
      }
      case 'back': {
        return <MdKeyboardArrowLeft size={22} color="#eee" />;
      }
      case 'delete': {
        return <MdRemoveCircle size={22} color="#eee" />;
      }
      case 'none': {
        return '';
      }
      default: {
        return <MdCheck size={22} />;
      }
    }
  };
  return (
    <ButtonContent
      type={buttonType}
      saveButton={saveButton}
      onClick={handleClick}
      background={background}
      width={width}
      borderRadius={borderRadius}
      marginTop={marginTop}
      position={position}
      left={left}
    >
      {getIconButton()}
      {children}
    </ButtonContent>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.none),
    PropTypes.node,
  ]).isRequired,
  handleClick: PropTypes.func,
  buttonType: PropTypes.string.isRequired,
  saveButton: PropTypes.bool,
  icon: PropTypes.string,
  borderRadius: PropTypes.string,
  marginTop: PropTypes.string,
  position: PropTypes.string,
  left: PropTypes.string,
};

Button.defaultProps = {
  handleClick: () => {},
  saveButton: false,
  icon: '',
  borderRadius: '',
  marginTop: '',
  position: '',
  left: '',
};
