import { fireEvent, screen } from '@testing-library/react';
import { render,act } from '@testing-library/react';
import RegisterInvoice from '../components/RegisterInvoice';
import { Provider } from 'react-redux';
import { store } from '../api/store';

describe('App test Register Invoice', () => {
    beforeEach(()=>{
        render(
            <Provider store={store}>
              <RegisterInvoice />
            </Provider>
          );
    })


    it('renders invoice header the form with all fields', () => {      
      expect(screen.getByLabelText(/Código Cliente:/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Nombre Cliente:/i)).toBeInTheDocument();      
      expect(screen.getByLabelText(/Condición Pago:/i)).toBeInTheDocument();
    //   expect(screen.getByRole('button', { name: /Registrar Cliente/i })).toBeInTheDocument();
    });

    it('shows an error if the code and name client is required', async () => {
      
      fireEvent.change(screen.getByLabelText(/Código Cliente:/i), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(/Nombre Cliente:/i), { target: { value: '' } });
      fireEvent.click(screen.getByRole('button', { name: /Registrar Factura/i }));
      // Expect an error message
      screen.debug();
      expect(await screen.findByText(/Código de Cliente es requerido/i)).toBeInTheDocument();
      // expect(await screen.findByText(/Nombre de Cliente es requerido/i)).toBeInTheDocument();
    });


    it('display modal press button Agregar Producto', async () => {
      fireEvent.click(screen.getByRole('button', { name: /Agregar Producto/i }));
      // Expect an error message
      expect(await screen.findByText(/Lista de Productos/i)).toBeInTheDocument();
    });

    // it('add product with code 1 from modal to Detalle', async () => {
      
    //   fireEvent.click(screen.getByRole('button', { name: /Agregar Producto/i }));
    //   fireEvent.click(screen.getByTestId('btnGetProduct-1'));
    //   // Expect an error message
    //   expect(await screen.findByText(/Lista de Productos/i)).toBeInTheDocument();
    // });

    // it('button plus minus quantity product', async () => {
      
    //   fireEvent.click(screen.getByRole('button', { name: /Agregar Producto/i }));
    //   fireEvent.click(screen.getByTestId('btnGetProduct-1'));
    //   // Expect an error message
    //   // expect(await screen.findByText(/Lista de Productos/i)).toBeInTheDocument();
    // });

    it('add repeated product to Detalle', async () => {
      
      // Display modal Products
      fireEvent.click(screen.getByRole('button', { name: /Agregar Producto/i }));
      await  act ( async () => { 
        await  new  Promise ( ( resolve ) =>  setTimeout (resolve, 300 )); 
      });
      // Select Product Code 1
      fireEvent.click(screen.getByTestId('btnGetProduct-1'));
      await  act ( async () => { 
        await  new  Promise ( ( resolve ) =>  setTimeout (resolve, 300 )); 
      });
      fireEvent.click(screen.getByRole('button', { name: /Agregar Producto/i }));
      await  act ( async () => { 
        await  new  Promise ( ( resolve ) =>  setTimeout (resolve, 300 )); 
      });
      // Select Product Code 1
      fireEvent.click(screen.getByTestId('btnGetProduct-1'));
      expect(await screen.findByText(/El producto ya ha sido seleccionado/i)).toBeInTheDocument();

    });

    it('register invoice without detalle', async () => {      
      // Input valid values
      fireEvent.change(screen.getByLabelText(/Código Cliente:/i), { target: { value: '3' } });
      fireEvent.change(screen.getByLabelText(/Nombre Cliente:/i), { target: { value: 'Juan Pérez' } });
      fireEvent.change(screen.getByLabelText(/Condición Pago:/i), { target: { value: 'Tarjeta' } });
     
      // Submit the form
      fireEvent.click(screen.getByRole('button', { name: /Registrar Factura/i }));
      // Expect a success message after submitting
      expect(await screen.findByText(/Debe agregar productos/i)).toBeInTheDocument();
    });
  
    it('submits the form with valid data', async () => {

      // Input valid values
      fireEvent.change(screen.getByLabelText(/Código Cliente:/i), { target: { value: '3' } });
      fireEvent.change(screen.getByLabelText(/Nombre Cliente:/i), { target: { value: 'Juan Pérez' } });
      fireEvent.change(screen.getByLabelText(/Condición Pago:/i), { target: { value: 'Tarjeta' } });
      // Display modal Products
      fireEvent.click(screen.getByRole('button', { name: /Agregar Producto/i }));
      await  act ( async () => { 
        await  new  Promise ( ( resolve ) =>  setTimeout (resolve, 300 )); 
      });
      // Select Product Code 1
      fireEvent.click(screen.getByTestId('btnGetProduct-1'));
      // Submit the form
      await  act ( async () => { 
        await  new  Promise ( ( resolve ) =>  setTimeout (resolve, 300 )); 
      });
      fireEvent.click(screen.getByRole('button', { name: /Registrar Factura/i }));
      // Expect a success message after submitting
      expect(await screen.findByText(/Cargando.../i)).toBeInTheDocument();
    });
  });
