"use client";

import React, {useState} from "react";
import {
  Input,
  Select,
  SelectItem,
  Button,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
import PaymentBreakdown from "./OrderBreakDown";

const METHODS = ["CBU", "ALIAS", "QR"] as const;
type PaymentMethod = (typeof METHODS)[number];

const SHIPPING_OPTIONS = ["Standard", "Express", "Same Day"] as const;
type ShippingOption = (typeof SHIPPING_OPTIONS)[number];

const dummyData: Record<any, any> = {
  CBU: "1234567890123456789012",
  ALIAS: "DRUNK.INTHE.HOUSE",
  QR: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=DummyQRCode",
};

export default function Payment() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | "">("");
  const [copied, setCopied] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | "">(
    ""
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [showBreakdown, setShowBreakdown] = useState(false);

  const handleCopy = () => {
    if (selectedMethod) {
      navigator.clipboard.writeText(dummyData[selectedMethod]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleConfirm = () => {
    setShowBreakdown(true);
  };

  return (
    <div className="dark text-foreground bg-background min-h-screen ">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <Card className="flex-grow bg-transparent border-white border-1">
          <CardHeader>
            <h2 className="text-2xl font-bold">Selecciona tu método de pago</h2>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Select
              placeholder="Selecciona un método de pago"
              onChange={(e) =>
                setSelectedMethod(e.target.value as PaymentMethod)
              }
            >
              {METHODS.map((method) => (
                <SelectItem key={method} value={method} className="text-black">
                  {method}
                </SelectItem>
              ))}
            </Select>
            {selectedMethod && (
              <div className="flex items-center gap-2">
                <Input
                  value={
                    selectedMethod === "QR"
                      ? "QR Code generado"
                      : dummyData[selectedMethod]
                  }
                  readOnly
                  className="flex-grow"
                />
                <Button
                  isIconOnly
                  color="primary"
                  aria-label={copied ? "Copiado" : "Copiar"}
                  onClick={handleCopy}
                >
                  {copied ? "✓" : "📋"}
                </Button>
              </div>
            )}
            {selectedMethod === "QR" && (
              <img
                src={dummyData.QR}
                alt="QR Code"
                className="w-40 h-40 mx-auto"
              />
            )}
          </CardBody>
        </Card>

        <Card className="flex-grow bg-transparent border-white border-1 h-fit">
          <CardHeader>
            <h2 className="text-2xl font-bold">Opciones de envío</h2>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Select
              placeholder="Selecciona una opción de envío"
              onChange={(e) =>
                setSelectedShipping(e.target.value as ShippingOption)
              }
            >
              {SHIPPING_OPTIONS.map((option) => (
                <SelectItem key={option} value={option} className="text-black">
                  {option}
                </SelectItem>
              ))}
            </Select>
            <Input
              type="date"
              label="Fecha de envío"
              placeholder="Selecciona una fecha"
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </CardBody>
        </Card>
      </div>
      <Button
        color="primary"
        size="lg"
        className="w-full"
        onClick={handleConfirm}
        disabled={!selectedMethod || !selectedShipping || !selectedDate}
      >
        Confirmar
      </Button>

      {showBreakdown && (
        <PaymentBreakdown
          paymentMethod={selectedMethod}
          paymentData={
            selectedMethod === "QR"
              ? "QR Code generado"
              : dummyData[selectedMethod]
          }
          shippingOption={selectedShipping}
          shippingDate={selectedDate}
        />
      )}
    </div>
  );
}
