import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { currency, formatAddress } from "@/formatting";
import { Order } from "../../models";
import { formatPhone } from "@/formatting/phone";
import { deliveryTypeMap, paymentMethodsMap } from "../../enums";

const styles = StyleSheet.create({
  page: { padding: 20 },
  section: { marginBottom: 10 },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  text: { fontSize: 12, marginBottom: 3 },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 10,
    borderStyle: "dashed",
  },
});

interface OrderPDFProps {
  order: Order;
}

export function OrderPDF({ order }: OrderPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Cliente</Text>
          <Text style={styles.text}>Nome: {order.userName}</Text>
          <Text style={styles.text}>
            Endereço: {formatAddress(order.userAddress)}
          </Text>
          <Text style={styles.text}>Telefone: {formatPhone(order.phone)}</Text>
          <Text style={styles.text}>
            Entrega: {deliveryTypeMap[order.deliveryType]}
          </Text>
        </View>

        <View style={styles.divider} />
        <View style={styles.section}>
          <Text style={styles.title}>Produtos</Text>
          {order.products.map((product) => (
            <View key={product.id}>
              <Text style={styles.text}>Nome: {product.name}</Text>
              <Text style={styles.text}>
                Preço: {currency(product.price.original)}
              </Text>
              <Text style={styles.text}>Quantidade: {product.quantity}</Text>
              {product.variations.map((variation) => (
                <View key={variation.id}>
                  <Text style={styles.title}>{variation.name}</Text>
                  {variation.options.map((option) => (
                    <View key={option.id}>
                      <Text style={styles.text}>Nome: {option.name}</Text>
                      <Text style={styles.text}>
                        Preço: {currency(option.price)}
                      </Text>
                      <Text style={styles.text}>
                        Quantidade: {option.quantity}
                      </Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.divider} />
        <View style={styles.section}>
          <Text style={styles.title}>Informações do Pedido</Text>
          <Text style={styles.text}>
            Tempo de entrega: {order.deliveryTime} min
          </Text>
          <Text style={styles.text}>
            Pagamento: {paymentMethodsMap[order.paymentType]}
          </Text>
          <Text style={styles.text}>
            Frete: {currency(Number(order.deliveryPrice))}
          </Text>
          <Text style={styles.text}>
            Total: {currency(order.totalPrice + Number(order.deliveryPrice))}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
