import React from "react";
import {Card, CardBody, CardHeader} from "@nextui-org/react";

interface PaymentBreakdownProps {
  paymentMethod: string;
  paymentData: string;
  shippingOption: string;
  shippingDate: string;
}

export default function OrderBreakdown({
  paymentMethod,
  paymentData,
  shippingOption,
  shippingDate,
}: PaymentBreakdownProps) {
  return (
    <Card className=" bg-transparent border-success border-1">
      <CardHeader className="flex flex-col">
        <h2 className="text-2xl font-bold">Orden confirmada</h2>
        <h2 className="text-lg font-bold">Detalles para el pago</h2>
      </CardHeader>
      <CardBody>
        <div className="space-y-2">
          <p>
            <strong>Método de Pago:</strong> {paymentMethod}
          </p>
          <p>
            <strong>Datos de Pago:</strong> {paymentData}
          </p>
          <p>
            <strong>Opción de Envío:</strong> {shippingOption}
          </p>
          <p>
            <strong>Fecha de Envío:</strong> {shippingDate}
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
