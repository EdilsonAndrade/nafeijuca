import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin: 10px 0;
  div.barMenu {
    background: #fff;
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }
`;
export const Content = styled.div`
  display: flex;
`;

export const ProductCards = styled.div`
  margin-top: 20px;
  max-height: 700px;
  width: 72%;
  overflow-y: auto;
  overflow-x: hidden;
  div.search {
    margin: 5px 0;
    width: 100%;
    text-align: right;
    input {
      padding: 5px;
      border-radius: 6px;
      background: #fff;
      width: 220px;
      color: #444;
      ::placeholder {
        color: #ccc;
      }
    }
  }
  ::-webkit-scrollbar {
    width: 10px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: rgba(246, 186, 16, 0.5);
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgba(245, 135, 30, 0.2);
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(245, 135, 30, 0.6);
  }
`;

export const ClientOrder = styled.div`
  div.produto {
    height: 89%;
  }
  width: 27%;
  margin-top: 22px;
  background: rgba(255, 255, 255, 1);
  border-radius: 6px;
`;

export const ProductOrderTable = styled.table`
  width: 100%;
  padding: 10px;
  font-size: 14px;

  thead tr th {
    color: #f5871e;
    text-align: left;
    font-size: 12px;
  }
  tbody {
    img {
      max-width: 100px;
    }
    td {
      padding: 10px;
      > span {
        display: block;
        font-weight: bold;
        font-size: 12px;
      }
      > div {
        display: flex;
        align-items: center;
        svg {
          border: none;
          color: #3c64ad;
          font-size: 15px;
          margin: 0 2px;
          cursor: pointer;
        }
        input {
          background: #fff;
          border: 1px solid #eee;
          padding: 3px;
          max-width: 50px;
        }
      }
    }
    td > svg {
      color: #3c64ad;
      cursor: pointer;
    }
  }
`;
export const OrderTotal = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  span {
    margin-left: 5px;
  }
  strong {
    font-size: 16px;
  }
`;
export const ProductSubtTotal = styled.strong``;
export const ProductDeliveryTax = styled.strong``;
export const ProductTotal = styled.strong``;
