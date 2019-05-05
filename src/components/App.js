import React, { Component} from 'react';
import Header from './header';
import Formulario from './formulario';
import {obtenerDiferenciaAnio, calcularMarca, obtenerPlan} from '../helper';
import Resumen from './resumen';
import Resultado from './resultado';

class App extends Component {

  state =  {
    resultado: '',
    datos: {}
  }
  cotizarSeguro = (datos) =>{
    const {marca, plan, year} = datos;

    //Base del seguro: $2000.00
    let resultado = 2000;

    //Obtener diferencia de anios y restar 3% por cada anio
    const diferencia = obtenerDiferenciaAnio(year);
    
    resultado -= diferencia * 3 * resultado / 100;

    //Americano 15% mas Europeo 30% mas Asiatico 5%
    resultado *= calcularMarca(marca);

    let incrementoPlan = obtenerPlan(plan);

    resultado = parseFloat( incrementoPlan * resultado ).toFixed(2);
    console.log(resultado);

    const datosAuto = {
      marca : marca,
      plan : plan,
      year : year
    }

    this.setState({
      resultado : resultado,
      datos: datosAuto
    })
  }
  render() {
    
    return (
      <div className="contenedor">
        <Header
          titulo="Cotizador de Seguros de Auto"
        /> 
        <div className="contenedor-formulario">
          <Formulario 
            cotizarSeguro={this.cotizarSeguro}
          />

          <Resumen 
            datos={this.state.datos} 
            />  
          <Resultado 
            resultado={this.state.resultado}
          />

          
        </div>
        

        
      </div>
    );

  }
}

export default App;
