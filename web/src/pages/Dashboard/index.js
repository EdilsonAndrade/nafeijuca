import React from 'react';
import { MdDelete } from 'react-icons/md';
import GroupCard from '~/components/GroupCard';
import ProductCard from '~/components/ProductCard';
import {
  Container,
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

export default function Dashboard() {
  return (
    <Container>
      <SearchInput
        searchFor="products"
        placeHolder="Digite um nome de produto"
      />

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
    </Container>
  );
}
