/**
 * Datos de la estación de trabajo (sucursal, caja y aviso del día) que comparten
 * el login y el panel principal. Todavía no existe un endpoint que los entregue;
 * cuando exista, basta con reemplazar este objeto por la respuesta del backend.
 */
export const WORKSTATION = {
  branchName: 'Sucursal Centro',
  registerName: '01',
  notice: 'Recuerda hacer el corte de caja antes de cerrar tu turno.',
} as const;
