import { render, screen } from '@testing-library/react';
import App from '../../app/App';

describe('App Component', () => {
  it('должен отображать заголовок MUI', () => {
    render(<App />);
    const heading = screen.getByRole('heading', {
      name: /mui \+ vite \+ react 18/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('должен содержать кнопку "Отправить"', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /отправить/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('MuiButton-contained'); // Проверка, что стили MUI подтянулись
  });
});
