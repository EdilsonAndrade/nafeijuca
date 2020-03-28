import styled from 'styled-components';

export const Container = styled.div`
  width: 86%;
  margin: 10px auto;
  padding: 20px;
  border-radius: 6px;
  background: #fff;
  height: 100%;
  label {
    color: #251c1f;
  }
`;

export const ContainerColumn = styled.div`
  display: flex;
  margin: 0 auto;
  width: 67%;
  flex-direction: column;
  > div {
    display: flex;
    > div {
      & + div {
        margin-left: 20px;
      }
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }
  }
`;

export const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0;
  margin: 0 !important;
`;
