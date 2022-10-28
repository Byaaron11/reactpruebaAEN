import React, { Component } from "react";
import Global from "../Global";
import axios from "axios";
import CargarDoctores from "./CargarDoctores";

export default class FormularioDoctores extends Component {
  //Aqui tengo que mostrar en el select las especialidades (get)
  //y el incremento salarial con put

  //primero guardo el select en una referencia para capturarlo y mandarlo al hijo
  cajaSelectRef = React.createRef();
  cajaInputRef = React.createRef();

  //Creo la variable state para dibujar el contenido en el html

  state = {
    status: false,
    especialidades: [],
    espec: []
  };

  //Metodo que cargue las especialidades al cargar la página

  loadEsp = () => {
    var request = "/api/Doctores/Especialidades";
    var url = Global.urlApi + request;
    axios.get(url).then(response => {
        this.setState({
            especialidades: response.data
        });
    });
  };

  enviarDatos = () => { 
    var esp = this.cajaSelectRef.current.value;
    this.setState({
        espec: esp
    });
  }

  incrementarSalario = (e) => {
    e.preventDefault();
    var incremento = parseInt(this.cajaInputRef.current.value);
    var esp = this.cajaSelectRef.current.value;
    var request = "/api/Doctores/"+esp+"/"+ incremento;
    console.log(request)
    var url = Global.urlApi + request;
    axios.put(url).then(res =>{
        this.setState({
            status:true
        });
    });
  }

  componentDidMount = () =>{
    this.loadEsp();
  }

  render() {
    return (
      <div>
        <h1>Incremento salarial doctores</h1>
        <form>
          <label>Seleccione una especialidad</label>
          <select onChange={this.enviarDatos} ref={this.cajaSelectRef}>
            {
                this.state.especialidades.map((esp, index)=>{
                    return(<option key={index} value={esp}>{esp}</option>)
                })
            }
          </select>
          <br/>
          <label>Incremento salarial:</label>
          <input type="text" ref={this.cajaInputRef}/>
          <button onClick={this.incrementarSalario}>
            Incrementar Salarios
          </button>
        </form>
        {/* Aqui voy a llamar a la tabla que estará en CargarDoctores.js mandandole el nombre de la esp
        ya que la api busca por el nombre*/}
       <CargarDoctores especialidades={this.enviarDatos}/>
      </div>
    );
  }
}
