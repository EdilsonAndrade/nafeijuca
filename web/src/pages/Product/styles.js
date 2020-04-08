import styled from 'styled-components';
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowLeft,
  MdPauseCircleFilled,
} from 'react-icons/md';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  background: #fff;
  padding: 50px;
  color: #444;
  border-radius: 8px;
  margin: 10px auto;
  > strong {
    font-size: 42px;
  }
  h2 {
    color: #4444;
  }
`;
export const CategoryContainer = styled.span`
  margin-top: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
    > span {
      margin-left: 30px;
      font-size: 20px;
    }
  }
`;
export const ProductGroup = styled.div`
  margin-top: 40px;
  padding: 20px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  width: 100%;
  background: #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #666;
  border-left: 1px solid #666;
  border-right: 1px solid #666;
  > strong {
    font-weight: bold;
    font-size: 20px;
  }
  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 22.5%;
    margin-right: 10px;
    > span {
      display: flex;
      align-items: center;
      margin-left: 10px;
      font-weight: bold;
      color: #666;
      svg {
        color: ${props => (props.active ? '#444' : 'rgb(255,76,0)')};
      }
      > span {
        margin-left: 2px;
        font-size: 16px;
      }
    }
    > div {
      > span {
        font-weight: bold;
        font-size: 16px;
        & + span {
          margin-left: 20px;
        }
      }
    }
  }
  @media (min-width: 2000px) {
    > div {
      width: 24.1%;
    }
  }
`;

export const Products = styled.div`
  padding: 10px 20px;
  width: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;

  border: 1px solid #666;
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div {
      width: 29.5%;
      > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    > span {
      font-size: 14px;
      color: #666;
    }
    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;

      input {
        padding: 5px;
        width: 110px;
        border: 1px solid #eee;
        border-radius: 6px;
        text-align: right;
      }

      svg {
        color: ${props => (props.active ? '#fff' : 'rgb(255,76,0)')};
      }
      margin: 0 10px;
      span {
        & + span {
          margin-left: 20px;
        }
      }
    }
  }

  @media (min-width: 2000px) {
    > div {
      width: 100%;
    }
  }
`;

export const ArrowDown = styled(MdKeyboardArrowDown)`
  cursor: pointer;
  color: rgb(255, 76, 0);
  font-size: 35px;
`;

export const ArrowLeft = styled(MdKeyboardArrowLeft)`
  cursor: pointer;
  color: rgb(255, 76, 0);
  font-size: 35px;
`;
export const ProductChildren = styled.ul`
  display: ${props => (!props.active ? 'none' : 'flex')};
  -webkit-transition: 200ms ease;
  -moz-transition: 200ms ease;
  -o-transition: 200ms ease;
  transition: 2s linear all;
  margin-top: 20px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  strong {
    font-size: 12px;
  }
  > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > div {
      display: flex;
      align-items: center;
      width: 30%;
      input {
        padding: 5px;
        width: 110px;
        border: 1px solid #eee;
        border-radius: 6px;
        text-align: right;
      }
    }
  }
`;
export const PauseComponent = styled(MdPauseCircleFilled)`
  svg {
    color: ${props => (props.active ? '#444' : 'rgb(255,76,0)')};
  }
`;
