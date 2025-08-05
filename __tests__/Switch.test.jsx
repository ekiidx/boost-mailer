import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from 'src/components/ui/switch'; // adjust path as needed

describe('Switch', () => {
  it('renders unchecked by default', () => {
    render(<Switch />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toHaveAttribute('aria-checked', 'false');
  });

  it('toggles when clicked', async () => {
    // Controlled component with state inside test
    function ControlledSwitch() {
      const [checked, setChecked] = React.useState(false);
      return (
        <Switch checked={checked} onCheckedChange={setChecked} />
      );
    }

    render(<ControlledSwitch />);
    const switchElement = screen.getByRole('switch');

    expect(switchElement).toHaveAttribute('aria-checked', 'false');

    await userEvent.click(switchElement);
    expect(switchElement).toHaveAttribute('aria-checked', 'true');

    await userEvent.click(switchElement);
    expect(switchElement).toHaveAttribute('aria-checked', 'false');
  });

  it('supports disabled state', () => {
    render(<Switch disabled />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeDisabled();
  });
});
