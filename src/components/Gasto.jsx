import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css"

import { formatearFecha } from "../helpers";

import IconoAhorro from '../img/icono_ahorro.svg'
import IconoCasa from '../img/icono_casa.svg'
import IconoComida from '../img/icono_comida.svg'
import IconoGastos from '../img/icono_gastos.svg'
import IconoOcio from '../img/icono_ocio.svg'
import IconoSalud from '../img/icono_salud.svg'
import IconoSuscripciones from '../img/icono_suscripciones.svg'

const diccionarioIconos = {
  ahorro: IconoAhorro,
  comida: IconoComida,
  casa: IconoCasa,
  gastos: IconoGastos,
  ocio: IconoOcio,
  salud: IconoSalud,
  suscripciones: IconoSuscripciones

}

export const Gasto = ({ gasto, setGastoEditar, eliminarGasto }) => {

  const { categoria, nombre, cantidad, id, fecha } = gasto;

  // leading es el movimiento hacia un lado de SwipeableList, en el proyecto se uso para editar
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction 
      onClick={ () => setGastoEditar(gasto) }
      destructive={true}
      >
        Editar
      </SwipeAction>
    </LeadingActions>
  )

    // leading es el movimiento hacia un lado de SwipeableList, en el proyecto se uso para eliminar
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={ () => eliminarGasto(id) }>
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    // Los siguientes componentes son necesarios para el efecto SwipeAction, asi como los props trailingActions y leadingActions
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className='gasto sombra'>
          <div className='contenido-gasto'>

            <img
              src={diccionarioIconos[categoria]}
              alt="Icono Gasto"
            />

            <div className='descripcion-gasto'>
              <p className='categoria'>
                {categoria}
              </p>
              <p className='nombre'>
                {nombre}
              </p>
              <p className="fecha-gastos">
                Agregado el: {' '}
                <span>{formatearFecha(fecha)}</span>
              </p>
            </div>
            <p className="cantidad-gasto">
              $ {cantidad}
            </p>
          </div>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}
