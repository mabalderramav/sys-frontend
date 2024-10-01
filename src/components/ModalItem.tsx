import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  ShoppingCartIcon,
  ArchiveBoxArrowDownIcon,
} from "@heroicons/react/24/outline";

interface ModalItemProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getProduct: any;
}

const ModalItem: React.FC<ModalItemProps> = ({ open, setOpen, getProduct }) => {
  const [products, setProducts] = useState([
    { codeProduct: "1", nameProduct: "Producto1", price: 5 },
    { codeProduct: "2", nameProduct: "Producto2", price: 10 },
  ]);

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="flex">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ShoppingCartIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-green-600"
                  />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-2xl font-semibold leading-6 text-gray-900"
                  >
                    Lista de Productos
                  </DialogTitle>

                  {products.length === 0 ? (
                    <p>No hay productos registrados.</p>
                  ) : (
                    <table data-testid='tableProducts' className="mt-5 mb-2 overflow-auto" width="100%">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="px-4 py-2 text-left">Código</th>
                          <th className="px-4 py-2 text-left">Producto</th>
                          <th className="px-4 py-2 text-left">Precio</th>
                          <th className="px-4 py-2 text-left"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product, index: number) => (
                          <tr key={index} className="border-t">
                            <td className="px-4 py-2">{product.codeProduct}</td>
                            <td className="px-4 py-2">{product.nameProduct}</td>
                            <td className="px-4 py-2">{product.price}</td>
                            <td>
                              <button
                                data-testid={"btnGetProduct-"+product.codeProduct }
                                type="button"
                                className="px-4 py-2 bg-blue-100 text-white rounded hover:bg-blue-300"
                                onClick={() => {
                                  getProduct(
                                    product.codeProduct,
                                    product.nameProduct,
                                    product.price
                                  );
                                  setOpen(false);
                                }}
                              >
                                <ArchiveBoxArrowDownIcon className="h-5 w-5 text-blue-500" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalItem;
