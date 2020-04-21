import styled from 'styled-components';
import AsyncSelect from 'react-select/async';

export const Container = styled.span``;
export const AsyncSelectField = styled(AsyncSelect)`
  width: 100%;
  margin: 15px 0;
  z-index: 1000;
  > div {
    > div {
      padding: 4px 8px;
    }
  }
`;
