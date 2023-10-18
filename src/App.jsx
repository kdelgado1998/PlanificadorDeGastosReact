import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { Modal } from './components/Modal';
import { Filtros } from './components/Filtros';
import { ListadoGastos } from './assets/ListadoGastos';

import { generarId } from './helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {
  const [presupuesto, setPresupuesto] = useState(
    localStorage.getItem('presupuesto' ?? 0)
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  //Estados para el modal
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  //Estados para gastos
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  );

  //Estados para los filtros
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  const [gastoEditar, setGastoEditar] = useState({});

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
    }
  }, [gastoEditar])

  useEffect(() => {
    Number(localStorage.setItem('presupuesto', presupuesto ?? 0));
  }, [presupuesto])

  useEffect(() => {
    Number(localStorage.setItem('gastos', JSON.stringify(gastos) ?? []));
  }, [gastos])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }
  }, []);

  useEffect(() => {
    if (filtro) {
      //Filtrar gastos por categoria
      const gastosFiltrados = gastos.filter(gasto => gasto.gategoria === filtro);

    }
  }, [filtro])




  const handleNuevoGasto = () => {
    setModal(true)

    //Se setea gasto editar como objeto vacio para que no alcamene la informacion al editar uno exixtente
    setGastoEditar('');

    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  const guardarGasto = gasto => {
    console.log(gasto);

    if (gasto.id) {
      //Actualizar
      //Recorremos el arreglo en el state de gasto, tosos los que ya tenemos agregamos, va a ver cual es igual al que queremo actualizar y va a modificar y retornar ese gasto actualizado al nuevo arreglo, si no esta ahi no retorna nada
      const gastosActualizados = gastos.map(gastoState =>
        gastoState.id === gasto.id ? gasto : gastoState);
      setGastos(gastosActualizados);

      //Reseteamos el state para que no guarde info que no queremos
      setGastoEditar({});
    } else {
      //Generar nuevo gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }

    setAnimarModal(false);

    setTimeout(() => {
      setModal(false);
    }, 500);
  }

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id);

    setGastos(gastosActualizados);
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {/* El && permite agregar solo una condicion a un termario */}

      {isValidPresupuesto && (
        <>
          <main>

            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />

            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className='nuevo-gasto'>
            <img
              src={IconoNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && <Modal
        setModal={setModal}
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}
        guardarGasto={guardarGasto}
        gastoEditar={gastoEditar}
        setGastoEditar={setGastoEditar}
      />}

    </div>
  )
}

export default App
