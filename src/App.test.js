import { render, screen } from '@testing-library/react';
import ToDoListMaker from './ToDoListMaker';

test('renders learn react link', () => {
  render(<ToDoListMaker />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
