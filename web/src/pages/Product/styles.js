import styled from 'styled-components';

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
    font-weight: 18px;
  }
  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 23%;
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
`;

export const Products = styled.div`
  padding: 10px;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #666;
  > div {
    width: 29.5%;
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  > span {
    font-weight: 18px;
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
      font-size: 16px;
      & + span {
        margin-left: 20px;
      }
    }
  }
`;
