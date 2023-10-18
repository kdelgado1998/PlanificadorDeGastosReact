import { Gasto } from "../components/Gasto"

export const ListadoGastos = ({ gastos,
  setGastoEditar,
  eliminarGasto,
  gastosFiltrados,
  filtro
}) => {
  return (
    <div className='listado-gastos contenedor'>

      {
        filtro ? (
          <>
            <h2>{gastosFiltrados.length ? 'Gastos' : 'No hay Gastos'}</h2>
            {gastosFiltrados.map((gasto) => (
              <Gasto
                key={gasto.id}
                gasto={gasto}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
              />
            ))
            }
          </>
        ) : (
          <>
            <h2>{gastos.length ? 'Gastos' : 'No hay Gastos'}</h2>
            {gastos.map((gasto) => (
              <Gasto
                key={gasto.id}
                gasto={gasto}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
              />
            ))}
          </>
        )
      }

    </div>
  )
}
