import { Formik, Form, Field, ErrorMessage } from "formik";
import { FC, useState, useEffect, act } from "react";
import * as Yup from "yup";
import {
  InvoiceItemRequest,
  InvoiceRequest,
  ClientRequest,
} from "../api/request/types";
import { useCreateInvoiceMutation } from "../api/productsApi";
import Notification from "./Notification";
import { NotificationType } from "./Notification";
import ModalItem from "./ModalItem";
import { PlusIcon, MinusIcon, TrashIcon } from "@heroicons/react/24/outline";

const RegisterInvoice: FC = () => {
  const initialValues: any = {
    code: "",
    name: "",
    paymentCondition: "",
  };

  const [total, setTotal] = useState(0);
  const [codeClient, setCodeClient] = useState<string>("");
  const [nameClient, setNameClient] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [typeNotif, setTypeNotif] = useState<NotificationType>("success");
  const [createInvoice] = useCreateInvoiceMutation();

  const [products, setProducts] = useState<InvoiceItemRequest[]>([]);

  const clients = [
    {
      code: "3",
      name: "Juan Pérez",
      ciNit: "12345678",
      documentType: "CI",
      email: "juanperez@mail.com",
    },
    {
      code: "4",
      name: "prueba",
      ciNit: "1111111",
      documentType: "CI",
      email: "enunez.dev@gmail.com",
    },
  ];

  const getProduct = (codeProduct: any, nameProduct: any, price: any) => {
    console.log(codeProduct + "  " + nameProduct);
    const productExist = products.some((item) => item.code === codeProduct);
    if (productExist) {
      setTypeNotif("warning");
      setMessage("El producto ya ha sido seleccionado");
      setShow(true);
    } else {
      setProducts([
        ...products,
        {
          code: codeProduct,
          name: nameProduct,
          amount: 1,
          price: price,
          subTotal: price * 1,
        },
      ]);
    }
  };

  const deleteProduct = (codeProduct: any) => {
    console.log(codeProduct);
    const data = products.filter((item) => item.code !== codeProduct);
    setProducts(data);
  };

  const paymentConditions = [
    { value: "Efectivo", label: "Efectivo" },
    { value: "Tarjeta", label: "Tarjeta" },
  ];

  const changeAmount = (code: any, value: any) => {
    console.log(code, value);
    const data: any = products.map((item) => {
      if (item.code == code) {
        let amount = item.amount + value;
        if (amount > 0 && amount <= 10) {
          item.amount = amount;
          item.subTotal = item.amount * item.price;
        }
      }
      return item;
    });
    setProducts(data);
  };

  const searchClient = (value: any) => {
    console.log(value);
    const name = clients.find((x) => x.code === value)?.name;
    setNameClient(name === undefined ? "" : name);
    setCodeClient(value);
  };

  useEffect(() => {
    let total1 = 0;
    products.forEach((item) => {
      total1 = total1 + item.subTotal;
    });
    setTotal(total1);
  }, [products]);

  const validationSchema = Yup.object({
    code: Yup.string().required("Código de Cliente es requerido"),
    name: Yup.string().required("Nombre de Cliente es requerido"),
    // paymentCondition: Yup.string().required("Condición de Pago es requerido"),
  });

  const onSubmit = (values: InvoiceRequest, actions: any) => {
    console.log(values);
    console.log(products);
    if (products.length > 0) {
      try {
        values.productsItem = products;
        values.total = total;
        console.log("BODY REQUEST: " + JSON.stringify(values));
        createInvoice({ request: values }).unwrap();
      } catch (error) {
        console.error("Failed to register invoice", error);
      }
    } else {
      actions.setSubmitting(false);
      setTypeNotif("warning");
      setMessage("Debe agregar productos");
      setShow(true);
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Registrar Factura</h2>

      <Notification
        message={message}
        show={show}
        setShow={setShow}
        type={typeNotif}
      />
      <ModalItem
        open={open}
        setOpen={setOpen}
        getProduct={getProduct}
      ></ModalItem>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form className="space-y-4">
            {status && status.success && (
              <div className="text-green-500">{status.success}</div>
            )}
            <div className="flex">
              <div className="flex flex-col px-4 w-1/3">
                <label htmlFor="code" className="mb-1 font-semibold">
                  Código Cliente:
                </label>
                <Field
                  id="code"
                  name="code"
                  type="text"
                  className="p-2 border border-gray-300 rounded"
                  //   onChange={(e: any) => searchClient(e.target.value)}
                  //   value={codeClient}
                />
                <ErrorMessage
                  name="code"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="flex flex-col px-4 w-1/3">
                <label htmlFor="name" className="mb-1 font-semibold">
                  Nombre Cliente:
                </label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  className="p-2 border border-gray-300 rounded"
                  //   value={nameClient}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="flex flex-col px-4 w-1/3">
                <label
                  htmlFor="paymentCondition"
                  className="mb-1 font-semibold"
                >
                  Condición Pago:
                </label>
                {/* <Field
                  id="paymentCondition"
                  name="paymentCondition"
                  type="text"
                  className="p-2 border border-gray-300 rounded"
                /> */}
                <Field
                  as="select"
                  name="paymentCondition"
                  id="paymentCondition"
                  className="p-2 border border-gray-300 rounded"
                >
                  {paymentConditions.map((item, key: number) => (
                    <option key={key} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="paymentCondition"
                  component="div"
                  className="text-red-500"
                />
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-4">Detalle</h3>

            <div className="flex">
              <div className="flex flex-col px-4 w-1/5">
                <button
                  type="button"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Agregar Producto
                </button>
              </div>
            </div>
            {products.length === 0 ? (
              <div
                className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
                role="alert"
              >
                <p>No existe productos agregados.</p>
              </div>
            ) : (
              <table width="100%" className="mb-2 overflow-auto">
                <thead>
                  <tr className="bg-gray-100 p-1">
                    <td className="font-bold">Código</td>
                    <td className="font-bold">Nombre</td>
                    <td className="font-bold">Cantidad</td>
                    <td className="font-bold">Precio</td>
                    <td className="font-bold">Subtotal</td>
                    <td className="font-bold"></td>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index: number) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">{product.code}</td>
                      <td className="px-4 py-2">{product.name}</td>
                      <td className="px-4 py-2">
                        <div className="flex">
                          <button
                            type="button"
                            className="px-1 py-1 bg-orange-100 text-white rounded hover:bg-orange-300"
                            onClick={() => {
                              changeAmount(product.code, -1);
                            }}
                          >
                            <MinusIcon className="h-5 w-5 text-orange-500" />
                          </button>
                          <span className="mx-2">{product.amount}</span>
                          <button
                            type="button"
                            className="px-1 py-1 bg-blue-100 text-white rounded hover:bg-blue-300"
                            onClick={() => {
                              changeAmount(product.code, +1);
                            }}
                          >
                            <PlusIcon className="h-5 w-5 text-blue-500" />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-2">{product.price}</td>
                      <td className="px-4 py-2">{product.subTotal}</td>
                      <td className="px-4 py-2">
                        <button
                          type="button"
                          className="px-1 py-1 bg-red-100 text-white rounded hover:bg-red-300"
                          onClick={() => {
                            deleteProduct(product.code);
                          }}
                        >
                          <TrashIcon className="h-5 w-5 text-red-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="flex">
              <div className="flex flex-col px-4 w-1/3">
                <label htmlFor="total" className="text-3xl mb-1 font-semibold ">
                  Total: {total}
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Cargando..." : "Registrar Factura"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterInvoice;
