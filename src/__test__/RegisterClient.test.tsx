import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import RegisterClient from '../components/RegisterClient';
import { Provider } from 'react-redux';
import { store } from '../api/store';

describe('App tests', () => {
  it('renders the form with all required fields', () => {
    render(
      <Provider store={store}>
        <RegisterClient />
      </Provider>
    );

    expect(screen.getByLabelText(/Código:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nombre:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nro. CI\/NIT:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tp Doc:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Registrar Cliente/i })).toBeInTheDocument();
  });
  it('shows an error if the email format is invalid', async () => {
    render(
      <Provider store={store}>
        <RegisterClient />
      </Provider>
    );
    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'invalid-email' } });
    fireEvent.click(screen.getByRole('button', { name: /Registrar Cliente/i }));
    // Expect an error message
    screen.debug();
    expect(await screen.findByText(/Formato de email invalido/i)).toBeInTheDocument();
  });
  it('shows an error if CI/NIT is not numeric', async () => {
    render(
      <Provider store={store}>
        <RegisterClient />
      </Provider>
    );
    fireEvent.change(screen.getByLabelText(/Nro. CI\/NIT:/i), { target: { value: 'non-numeric' } });
    fireEvent.click(screen.getByRole('button', { name: /Registrar Cliente/i }));
    // Expect an error message
    expect(await screen.findByText(/CI\/NIT solo acepta numeros/i)).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    render(
      <Provider store={store}>
        <RegisterClient />
      </Provider>
    );
    // Input valid values
    fireEvent.change(screen.getByLabelText(/Código:/i), { target: { value: '001' } });
    fireEvent.change(screen.getByLabelText(/Nombre:/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Nro. CI\/NIT:/i), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText(/Tp Doc:/i), { target: { value: 'Passport' } });
    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'john@example.com' } });
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Registrar Cliente/i }));
    // Expect a success message after submitting
    expect(await screen.findByText(/Cargando.../i)).toBeInTheDocument();
  });
});
