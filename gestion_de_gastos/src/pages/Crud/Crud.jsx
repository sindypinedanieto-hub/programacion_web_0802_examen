import React, { useState } from 'react'

const styles = {
  page: {
    padding: 20,
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  pageTitle: {
    margin: 0,
    fontSize: 28,
    color: '#1f2937',
  },
  actionGroup: {
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap',
  },
  actionButton: {
    padding: '10px 16px',
    border: '1px solid #cbd5e1',
    borderRadius: 8,
    background: '#f8fafc',
    color: '#111827',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  actionButtonActive: {
    background: '#2563eb',
    color: '#ffffff',
    borderColor: '#1d4ed8',
  },
  workspaceWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  workspaceHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  workspaceStatus: {
    color: '#475569',
    fontSize: 14,
    minWidth: 160,
  },
  workspaceBody: {
    display: 'flex',
    gap: 20,
    flexWrap: 'wrap',
  },
  leftPanel: {
    width: '100%',
    maxWidth: 440,
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    padding: 16,
    border: '1px solid #e2e8f0',
    borderRadius: 12,
    background: '#ffffff',
  },
  inputLabel: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 14,
    color: '#111827',
    gap: 6,
  },
  inputField: {
    padding: '10px 12px',
    border: '1px solid #cbd5e1',
    borderRadius: 8,
    outline: 'none',
    fontSize: 14,
  },
  acceptRow: {
    marginTop: 8,
    display: 'flex',
    justifyContent: 'flex-start',
  },
  acceptBtn: {
    padding: '10px 18px',
    background: '#16a34a',
    color: '#ffffff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
  },
  rightPanel: {
    flex: 1,
    minWidth: 320,
    padding: 16,
    border: '1px solid #e2e8f0',
    borderRadius: 12,
    background: '#ffffff',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: 14,
  },
  th: {
    padding: '12px 10px',
    border: '1px solid #e2e8f0',
    textAlign: 'left',
    background: '#f8fafc',
  },
  td: {
    padding: '12px 10px',
    border: '1px solid #e2e8f0',
  },
  editBtn: {
    padding: '6px 10px',
    border: '1px solid #cbd5e1',
    borderRadius: 6,
    background: '#ffffff',
    cursor: 'pointer',
  },
  submenuContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  dropdown: {
    position: 'relative',
  },
  dropdownToggle: {
    padding: '10px 14px',
    border: '1px solid #cbd5e1',
    borderRadius: 8,
    background: '#ffffff',
    cursor: 'pointer',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 'calc(100% + 6px)',
    left: 0,
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: 10,
    boxShadow: '0 12px 20px rgba(15, 23, 42, 0.08)',
    zIndex: 10,
    minWidth: 180,
    padding: 8,
  },
  dropdownItemWrapper: {
    listStyle: 'none',
  },
  dropdownItem: {
    width: '100%',
    padding: '10px 12px',
    border: 'none',
    background: 'transparent',
    textAlign: 'left',
    cursor: 'pointer',
    borderRadius: 8,
  },
  submenuButtons: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
  submenuBtn: {
    padding: '10px 14px',
    border: '1px solid #cbd5e1',
    borderRadius: 8,
    background: '#f8fafc',
    cursor: 'pointer',
  },
  activeButton: {
    background: '#e0f2fe',
    borderColor: '#38bdf8',
  },
}

const actions = ['Crear', 'Leer', 'Actualizar', 'Eliminar']

function CrudHeader({ operation, onChange }) {
  return (
    <div style={styles.headerContainer}>
      <h2 style={styles.pageTitle}>CRUD - Programación Web</h2>
      <div style={styles.actionGroup}>
        {actions.map(action => (
          <button
            key={action}
            style={action === operation ? { ...styles.actionButton, ...styles.actionButtonActive } : styles.actionButton}
            onClick={() => onChange(action)}
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  )
}

function SubMenu({ items = [], active, onSelect, dropdownOnly = true }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={styles.submenuContainer}>
      <div style={styles.dropdown}>
        <button style={styles.dropdownToggle} onClick={() => setOpen(!open)}>
          {active} ▾
        </button>
        {open && (
          <ul style={styles.dropdownMenu}>
            {items.map(it => (
              <li key={it} style={styles.dropdownItemWrapper}>
                <button
                  style={it === active ? { ...styles.dropdownItem, ...styles.activeButton } : styles.dropdownItem}
                  onClick={() => { onSelect(it); setOpen(false) }}
                >
                  {it}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {!dropdownOnly && (
        <div style={styles.submenuButtons}>
          {items.map(it => (
            <button
              key={it}
              style={it === active ? { ...styles.submenuBtn, ...styles.activeButton } : styles.submenuBtn}
              onClick={() => onSelect(it)}
            >
              {it}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Workspace({ section, operation, onSectionChange }) {
  const empty = { nombre: '', descripcion: '', sku: '', precio: '', cantidad: '' }
  const [form, setForm] = useState(empty)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const handleAccept = () => {
    alert(`${operation} ${section} registrado:\n` + JSON.stringify(form, null, 2))
    setForm(empty)
  }

  return (
    <div style={styles.workspaceWrapper}>
      <div style={styles.workspaceHeader}>
        <SubMenu
          items={["Productos", "Categorías", "Proveedores"]}
          active={section}
          onSelect={onSectionChange}
        />
        <span style={styles.workspaceStatus}>Operación actual: {operation}</span>
      </div>

      <div style={styles.workspaceBody}>
        <div style={styles.leftPanel}>
          <h3>{section} - Nuevo</h3>
          <label style={styles.inputLabel}>Nombre
            <input style={styles.inputField} name="nombre" value={form.nombre} onChange={handleChange} />
          </label>

          <label style={styles.inputLabel}>Descripción
            <input style={styles.inputField} name="descripcion" value={form.descripcion} onChange={handleChange} />
          </label>

          <label style={styles.inputLabel}>SKU
            <input style={styles.inputField} name="sku" value={form.sku} onChange={handleChange} />
          </label>

          <label style={styles.inputLabel}>Precio
            <input style={styles.inputField} name="precio" value={form.precio} onChange={handleChange} />
          </label>

          <label style={styles.inputLabel}>Cantidad
            <input style={styles.inputField} name="cantidad" value={form.cantidad} onChange={handleChange} />
          </label>

          <div style={styles.acceptRow}>
            <button style={styles.acceptBtn} onClick={handleAccept}>Aceptar</button>
          </div>
        </div>

        <div style={styles.rightPanel}>
          <h3>{section} - Lista simulada</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Nombre</th>
                <th style={styles.th}>SKU</th>
                <th style={styles.th}>Precio</th>
                <th style={styles.th}>Cantidad</th>
                <th style={styles.th}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>Ejemplo A</td>
                <td style={styles.td}>SKU-001</td>
                <td style={styles.td}>$10.00</td>
                <td style={styles.td}>5</td>
                <td style={styles.td}><button style={styles.editBtn}>Editar</button><button style={styles.editBtn}>Eliminar</button></td>
              </tr>
              <tr>
                <td style={styles.td}>Ejemplo B</td>
                <td style={styles.td}>SKU-002</td>
                <td style={styles.td}>$25.00</td>
                <td style={styles.td}>12</td>
                <td style={styles.td}><button style={styles.editBtn}>Editar</button><button style={styles.editBtn}>Eliminar</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default function Crud() {
  const [operation, setOperation] = useState('Crear')
  const [section, setSection] = useState('Productos')

  return (
    <div style={styles.page}>
      <CrudHeader operation={operation} onChange={setOperation} />
      <Workspace
        section={section}
        operation={operation}
        onSectionChange={setSection}
      />
    </div>
  )
}
