import { currency, formatAddress } from "@/formatting";
import { Order } from "../../models";
import { formatPhone } from "@/formatting/phone";
import { deliveryTypeMap, paymentMethodsMap } from "../../enums";

interface ModalOrderContentProps {
  order: Order;
}

function TitleSession({ title }: { title: string }) {
  return (
    <div className="w-80">
      <span className="text-gray-100 text-lg underline font-semibold">
        {title}
      </span>
    </div>
  );
}

export function ModalOrderContent({ order }: ModalOrderContentProps) {
  return (
    <div className="space-y-3">
      <div>
        <TitleSession title="Cliente" />
        <div className="space-y-2 text-gray-200">
          <strong className="text-sm">Nome:</strong> {order.userName}
          <div>
            <strong className="text-sm">Endereço de entrega:</strong>{" "}
            {formatAddress(order.userAddress)}
          </div>
          <div>
            <strong className="text-sm">Telefone para contato:</strong>{" "}
            {formatPhone(order.phone)}
          </div>
          <div>
            <strong className="text-sm">Tipo de entrega:</strong>{" "}
            {deliveryTypeMap[order.deliveryType]}
          </div>
        </div>
      </div>
      <hr className="border-dashed border-gray-700" />{" "}
      <div>
        <TitleSession title="Produtos" />

        {order.products.map((product) => {
          return (
            <div key={product.id} className="space-y-2 text-gray-200">
              <div>
                <strong className="text-sm">Nome:</strong> {product.name}
              </div>
              <div>
                <strong className="text-sm">Preço original: </strong>
                {currency(product.price.original)}
              </div>
              <div>
                <strong className="text-sm">Preço promocional: </strong>
                {currency(product.price.original)}
              </div>

              <div>
                <strong className="text-sm">Quantidade:</strong>{" "}
                {product.quantity}
              </div>

              <div className="ml-2">
                <div className="space-y-2">
                  {product.variations.map((variation) => {
                    return (
                      <div key={variation.id + Date.now()}>
                        <TitleSession title={variation.name} />
                        <div>
                          {variation.options && (
                            <div className="space-y-2">
                              {variation.options.map((option) => {
                                return (
                                  <div key={option.id + Date.now()}>
                                    <strong className="text-sm">Nome:</strong>{" "}
                                    {option.name}
                                    <div>
                                      <strong className="text-sm">
                                        Preço:
                                      </strong>{" "}
                                      {currency(option.price)}
                                    </div>
                                    <div>
                                      <strong className="text-sm">
                                        Quantidade:
                                      </strong>{" "}
                                      {option.quantity}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <hr className="border-dashed border-gray-700" />
      <div className="mb-10">
        <TitleSession title="Informações do pedido" />
        <div className="space-y-2 text-gray-200">
          <div>
            <strong className="text-sm">Tempo de entrega:</strong>{" "}
            {order.deliveryTime} minutos
          </div>
          <div>
            <strong className="text-sm">Tipo de pagamento:</strong>{" "}
            {paymentMethodsMap[order.paymentType]}
          </div>

          <div className="text-green-default">
            <strong className="text-sm ">Observação:</strong>{" "}
            {order.observation || "-"}
          </div>

          <div>
            <strong className="text-sm">Preço da entrega:</strong>{" "}
            {currency(Number(order.deliveryPrice))}
          </div>

          <div>
            <strong className="text-sm">Preço total:</strong>{" "}
            {currency(order.totalPrice + Number(order.deliveryPrice))}
          </div>
        </div>
      </div>
    </div>
  );
}
