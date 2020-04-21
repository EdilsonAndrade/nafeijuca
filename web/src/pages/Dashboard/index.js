import React, { useState } from 'react';
import { MdDelete, MdAccountCircle } from 'react-icons/md';
import GroupCard from '~/components/GroupCard';
import ProductCard from '~/components/ProductCard';
import CustomerModal from '~/pages/CustomerModal';
import {
  Container,
  SubBarContent,
  Content,
  ProductCards,
  ClientOrder,
  ProductOrderTable,
  OrderTotal,
  ProductSubtTotal,
  ProductDeliveryTax,
  ProductTotal,
} from './styles';
import SearchInput from '~/components/SearchComponent';
import Button from '~/components/Button';

export default function Dashboard() {
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <SubBarContent id="subBar">
        <SearchInput
          searchFor="products"
          placeHolder="Digite um nome de produto"
        />
        <Button
          icon="none"
          naked
          buttonType="button"
          handleClick={() => {
            setOpen(true);
          }}
        >
          <MdAccountCircle size={52} color="#fff" />
        </Button>
      </SubBarContent>
      <Content className="container">
        <ProductCards>
          <GroupCard groupName="Feijoada Light">
            <ProductCard />
          </GroupCard>
          <GroupCard groupName="Caseirinho">
            <ProductCard />
          </GroupCard>
        </ProductCards>
        <ClientOrder>
          <div className="produto">
            <ProductOrderTable>
              <thead>
                <tr>
                  <th>Qtd</th>
                  <th>Produto</th>
                  <th>Preço</th>
                  <th>Sub Total</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2</td>
                  <td>Feijoada Completa 1 Pessoa</td>
                  <td>60,00</td>
                  <td>120,00</td>
                  <td>
                    <MdDelete size={22} color="#f5871e" />
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Feijoada Completa 1 Pessoa</td>
                  <td>60,00</td>
                  <td>120,00</td>
                  <td>
                    <MdDelete size={22} color="#f5871e" />
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Feijoada Completa 1 Pessoa</td>
                  <td>60,00</td>
                  <td>120,00</td>
                  <td>
                    <MdDelete size={22} color="#f5871e" />
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Feijoada Completa 1 Pessoa</td>
                  <td>60,00</td>
                  <td>120,00</td>
                  <td>
                    <MdDelete size={22} color="#f5871e" />
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Feijoada Completa 1 Pessoa</td>
                  <td>60,00</td>
                  <td>120,00</td>
                  <td>
                    <MdDelete size={22} color="#f5871e" />
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Feijoada Completa 1 Pessoa</td>
                  <td>60,00</td>
                  <td>120,00</td>
                  <td>
                    <MdDelete size={22} color="#f5871e" />
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Feijoada Completa 1 Pessoa</td>
                  <td>60,00</td>
                  <td>120,00</td>
                  <td>
                    <MdDelete size={22} color="#f5871e" />
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Feijoada Completa 1 Pessoa</td>
                  <td>60,00</td>
                  <td>120,00</td>
                  <td>
                    <MdDelete size={22} color="#f5871e" />
                  </td>
                </tr>
              </tbody>
            </ProductOrderTable>
          </div>
          <OrderTotal>
            <span>Sub Total:</span>
            <ProductSubtTotal>R$150,00</ProductSubtTotal>
            <span>Entrega:</span>
            <ProductDeliveryTax>R$17,00</ProductDeliveryTax>
            <span>Total:</span>
            <ProductTotal>R$167,00</ProductTotal>
          </OrderTotal>
        </ClientOrder>
      </Content>
      <CustomerModal open={open} handleClose={() => setOpen(false)} />
    </Container>
  );
}
