import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FC, useState } from 'react';
import * as Yup from 'yup';
import { ClientRequest } from '../api/request/types';
import { useCreateClientMutation } from '../api/productsApi';
import Notification from './Notification';

const RegisterClient: FC = () => {
  const initialValues: ClientRequest = {
    code: '',
    name: '',
    ciNit: '',
    documentType: '',
    email: ''
  };
  const [show, setShow] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [createCliente] = useCreateClientMutation();
  const validationSchema = Yup.object({
    code: Yup.string().required('Código es requerido'),
    name: Yup.string().required('Nombre es requerido'),
    ciNit: Yup.number().typeError('CI/NIT solo acepta numeros').required('CI/NIT es requerido'),
    documentType: Yup.string().required('Tp Doc es requerido'),
    email: Yup.string().email('Formato de email invalido').required('El email es requerido')
  });

  const onSubmit = (values: ClientRequest) => {
    try {
      createCliente({ request: values }).unwrap();
      setMessage('Guardado correctamente');
      setShow(true);
    } catch (error) {
      console.error('Failed to register product', error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Registrar Cliente</h2>
      <Notification message={message} show={show} setShow={setShow} type="success" />

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting, status }) => (
          <Form className="space-y-4">
            {status && status.success && <div className="text-green-500">{status.success}</div>}
            <div className="flex flex-col">
              <label htmlFor="code" className="mb-1 font-semibold">
                Código:
              </label>
              <Field id="code" name="code" type="text" className="p-2 border border-gray-300 rounded" />
              <ErrorMessage name="code" component="div" className="text-red-500" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-1 font-semibold">
                Nombre:
              </label>
              <Field id="name" name="name" type="text" className="p-2 border border-gray-300 rounded" />
              <ErrorMessage name="name" component="div" className="text-red-500" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="ciNit" className="mb-1 font-semibold">
                Nro. CI/NIT:
              </label>
              <Field id="ciNit" name="ciNit" type="text" className="p-2 border border-gray-300 rounded" />
              <ErrorMessage name="ciNit" component="div" className="text-red-500" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="documentType" className="mb-1 font-semibold">
                Tp Doc:
              </label>
              <Field id="documentType" name="documentType" type="text" className="p-2 border border-gray-300 rounded" />
              <ErrorMessage name="documentType" component="div" className="text-red-500" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 font-semibold">
                Email:
              </label>
              <Field id="email" name="email" className="p-2 border border-gray-300 rounded" />
              <ErrorMessage name="email" component="div" className="text-red-500" />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Cargando...' : 'Registrar Cliente'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterClient;