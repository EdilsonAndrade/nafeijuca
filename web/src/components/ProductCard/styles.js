import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const ContentGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  list-style: none;
`;
export const Product = styled.li`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
`;

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  margin-right: 10px;
`;

export const ProductContentText = styled.div`
  height: 120px;
`;

export const ProductName = styled.strong`
  font-size: 16px;
  max-lines: 2;
`;

export const ProductDescription = styled.p`
  font-size: 12px;
  color: #444;
  max-lines: 2;
  margin-top: 10px;
  overflow: hidden;
  line-height: 14px;
  text-overflow: ellipsis;
  height: 43px;
`;

export const PriceContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const ProductPrice = styled.p`
  font-size: 14px;
  color: #444;
  font-weight: bold;
`;
export const ContentButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    border-radius: 4px;
    background: none;
    border: none;
  }
`;

export const QuantityInput = styled.input`
  width: 50px;
  margin: 0 5px;
  padding: 2px;
  border-radius: 4px;
  color: #666;
`;

export const ButtonRemove = styled.button``;

export const ImageProduct = styled.img`
  max-width: 150px;
  border-radius: 4px;
`;
