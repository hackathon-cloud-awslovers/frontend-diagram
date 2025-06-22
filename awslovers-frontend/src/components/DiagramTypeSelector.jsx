export default function DiagramTypeSelector({ value, onChange }) {
  return (
    <select
      className="w-full p-2 border rounded"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      <option value="ER">Entidad-Relación</option>
      <option value="AWS">Arquitectura AWS</option>
      <option value="JSON">Estructura JSON</option>
    </select>
  );
}
