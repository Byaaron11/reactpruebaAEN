import React, { Component } from 'react'
import Global from '../Global';
import axios from 'axios';

export default class CargarDoctores extends Component {
    //En este componente debo cargar los doctores en la tabla 
    //debera recibir mediante props el Id de la especialidad
    //llamando este componente dentro del formulario

    

    state = {
        doctores: [],
        especialidad:[]
    }

    loadDoctores = (parametro) =>{
        var esp = this.props.especialidad;
        var request = "/api/Doctores/DoctoresEspecialidad/" + esp;
        var url = Global.urlApi + request;
        axios.get(url).then(res => {
            this.setState({
                doctores: res.data
            });
        });
    }

    componentDidMount = () => {
        this.loadDoctores();
    }

  render() {
    return (
      <div>
        <h1>Tabla Doctores {this.props.especialidad}</h1>
        <table border="1">
            <thead>
                <tr>
                    <th>Apellido</th>
                    <th>Especialidad</th>
                    <th>Salario</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.doctores.map((doc, index) =>{
                        return(
                            <tr key={doc.idDoctor}>
                                <td>{doc.apellido}</td>
                                <td>{doc.especialidad}</td>
                                <td>{doc.salario}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
      </div>
    )
  }
}
