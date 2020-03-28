import styled from 'styled-components';
import Input from '~/components/Input';
import InputMask from '~/components/InputMask';

export const Container = styled.div`
  width: 66%;
  margin: 10px auto;
  padding: 20px;
  background: #ffff;
  border-radius: 6px;
  height: 100%;
  label {
    color: #251c1f;
  }
`;

export const InputName = styled(Input)``;

export const InputAddress = styled(Input)`
  width: 300px;
`;
export const InputAddressLineTwo = styled(Input)`
  width: 300px;
`;
export const InputZipCode = styled(InputMask)``;
export const InputCnpj = styled(InputMask)``;

export const ContainerColumn = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin: 0 auto;
`;

export const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: start;
  padding: 0;
  margin: 0 !important;
`;
