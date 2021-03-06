import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Switch, { Case, Default } from 'react-switch-case';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import KpiGraph from '../graphs/KpiGraph';
import MapGraph from '../graphs/MapGraph';
import MultilineGraph from '../graphs/MultilineGraph';
import RegionStackedGraph from '../graphs/RegionStackedGraph';
import RegionTreemapGraph from '../graphs/RegionTreemapGraph';
import StackedGraph from '../graphs/StackedGraph';
import TotalStackedGraph from '../graphs/TotalStackedGraph';
import TreemapGraph from '../graphs/TreemapGraph';
import TimeSerie from '../graphs/TimeSerie';

class Details extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentItem: null,
      message: false,
    };

    this.goTo = this.goTo.bind(this);
  }

  componentDidMount(){
    const {
      match:{params:{graphId}},
      results
    } = this.props;
    const currentItem = results.find(row => row.id === parseInt(graphId, 10));
    if(currentItem)
      this.setState({currentItem})
    else
      this.goTo('/results')
  }

  goTo(path){this.props.history.push(path);}

  render(){
    /*
    const {
      match:{params:{graphId}},
    } = this.props;
    */
    const { currentItem } = this.state;
    console.log('currentItem: ', currentItem);
    const isAllYears = currentItem && [
      'Permisos_de_Edificacion',
      'Participacion_respecto_economia',
      'Indicador_mensual_de_Sustentabilidad_Comercial',
      'Indicador_mensual_de_Sustentabilidad_Publico',
      'Indicador_mensual_de_Sustentabilidad_Residencial',
      'Indicador_mensual_de_Sustentabilidad_Total',
      'INACOR_Variacion_Mensual',
      'CChC_INACOR_Variacion_Mensual',
      'INACOR_Variacion_Anual',
      'CChC_INACOR_Variacion_Anual',
      'Permisos_Edificacion_M2',
      'IMACON_Variacion_Mensual_2',
      'IMACON_Variacion_Anual',
      'CChC_IMACON_Variacion_Mensual',
      'CChC_IMACON_Variacion_Anual',
      'Permisos_Edificacion_Viviendas',
      'Ventas_Santiago',
      'CChC_Ventas_Santiago',
      'Indice_Real_Precios_Vivienda_Santiago',
      'CChC_Indice_Real_Precios_Vivienda_Santiago',
      'IMACON_Variacion_Mensual',
      'Vivienda_cantidad_y_m2_acumulados',
      'Ventas_de_viviendas',
      'CChC_materiales',
      'Accidentes_Tasa_acc',
      'Trabajadores_protegidos_Seguro_Ley_Actividad_Económica',
      'Permisos_Edificacion_Acumulados_m2'
    ].find(row => row === currentItem.file ) ? false : true;

    return(
      <section>
        <div className = "container pt-5">
          <div className ="details-page">
            <Paper
              elevation={1}
              className="paper-container"
            />
            <Button
              color="primary"
              variant="contained"
              className="mt-3"
              size="small"
              onClick={() => this.goTo('/results')}
              >
              Regresar
            </Button>
            <div className="row">
            {//en caso que haya el Item actual exista desplegará el gráfico dependiendo del atributo file y graph, este ultimo dirá que gráfico se mostrará
              currentItem &&
                <div className="my-5 col-12 col-md-6">
                  <Switch condition={currentItem.graph}>
                    <Case value="KpiGraph">
                      <KpiGraph kpi_name = {currentItem.file}></KpiGraph>
                    </Case>
                    <Case value="MapGraph">
                        <MapGraph kpi_name = {currentItem.file} ></MapGraph>
                    </Case>
                    <Case value="TimeSerie">
                        <TimeSerie kpi_name = {currentItem.file} isAllYears={isAllYears}></TimeSerie>
                    </Case>
                    <Case value="MultilineGraph">
                        <MultilineGraph kpi_name = {currentItem.file} isAllYears={true}></MultilineGraph>
                    </Case>
                    <Case value="RegionStackedGraph">
                        <RegionStackedGraph kpi_name = {currentItem.file} isAllYears={true}></RegionStackedGraph>
                    </Case>
                    <Case value="RegionTreemapGraph">
                        <RegionTreemapGraph kpi_name = {currentItem.file} isAllYears={true}></RegionTreemapGraph>
                    </Case>
                    <Case value="StackedGraph">
                        <StackedGraph kpi_name = {currentItem.file} isAllYears={isAllYears}></StackedGraph>
                    </Case>
                    <Case value="TotalStackedGraph">
                        <TotalStackedGraph kpi_name = {currentItem.file} ></TotalStackedGraph>
                    </Case>
                    <Case value="TreemapGraph">
                        <TreemapGraph kpi_name = {currentItem.file} ></TreemapGraph>
                    </Case>
                    <Default>
                        <p>Intentelo nuevamente.</p>
                    </Default>
                  </Switch>
                </div>
            }
            </div>
            <Button
              color="primary"
              variant="contained"
              className="mt-3"
              size="small"
              onClick={() => this.goTo('/results')}
              >
              Regresar
            </Button>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) =>({
  results: state.results,
});

export default withRouter(
  connect(mapStateToProps, null)(Details)
);
