import { screen, render } from '@testing-library/react';
import App from '../App';
import { Provider } from 'react-redux';
import { store } from '../api/store';

describe('App tests', () => {
  it('should render the title', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByText(/Registrar Producto/i)).toBeInTheDocument();
  });
});
