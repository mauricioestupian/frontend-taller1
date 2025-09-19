import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import FormularioEmpleado from "./FormularioEmpleado";

describe("FormularioEmpleado", () => {
  test("muestra mensaje de error si nombre está vacío", async () => {
    const mockSubmit = vi.fn();

    render(<FormularioEmpleado modo="crear" onSubmit={mockSubmit} />);

    // Simula clic en el botón de guardar sin llenar campos
    fireEvent.click(screen.getByText(/guardar/i));

    // Espera que aparezca el mensaje de validación
    expect(
      await screen.findByText(/el nombre es obligatorio/i)
    ).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });
});

test("envía datos correctamente cuando el formulario está completo", async () => {
  const mockSubmit = vi.fn();

  render(<FormularioEmpleado modo="crear" onSubmit={mockSubmit} />);

  fireEvent.change(screen.getByLabelText(/nombre/i), {
    target: { value: "Mauricio" },
  });

  fireEvent.change(screen.getByLabelText(/apellido/i), {
    target: { value: "Gómez" },
  });

  // Simula selección de cargo y oficina si están en un <select>
  fireEvent.change(screen.getByLabelText(/cargo/i), {
    target: { value: "2" },
  });

  fireEvent.change(screen.getByLabelText(/oficina/i), {
    target: { value: "5" },
  });

  fireEvent.click(screen.getByText(/guardar/i));

  expect(mockSubmit).toHaveBeenCalledWith({
    Nombres: "Mauricio",
    Apellidos: "Gómez",
    idCargo: "2",
    idOficina: "5",
  });
});
