import React, { Component } from "react";
import Day from "./Day";
import ColumnBreak from "./ColumnBreak";
import Calendar from "calendar";
import ColumnTitle from "./ColumnTitle";
import NonDay from "./NonDay";
import FlechaAtras from "./FlechaAtras";
import FlechaSiguiente from "./FlechaSiguiente";
import NavegadorMenu from "./NavCalendario";
import UserProfile from "./User";
import firebase from "firebase/app";
import "firebase/auth";

class Calendario extends Component {
  constructor(props) {
    super(props);

    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    let days = [];
    let cal = new Calendar.Calendar(1);
    let m = cal.monthDays(year, month);
    let nameDays = [
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
      "Domingo",
    ];
    days = days.concat(
      nameDays.map((title) => <ColumnTitle title={title} />)
    );
    days.push(<ColumnBreak />);
    for (let i = 0; i < m.length; i++) {
      let daysTemp = m[i].map((day) =>
        day !== 0 ? <Day day={day} /> : <NonDay />
      );
      daysTemp.push(<ColumnBreak />);
      days = days.concat(daysTemp);
    }

    this.state = {
      year: year,
      month: month,
      days: days
    };
    this.BackMonth = this.BackMonth.bind(this);
    this.ForwardMonth = this.ForwardMonth.bind(this);

  }

  BackMonth() {
    if (this.state.month === 0) {
      this.setState({
        year: this.state.year - 1,
        month: 11,
      });
    } else {
      this.setState({
        month: this.state.month - 1,
      });
    }
  }

  ForwardMonth() {
    if (this.state.month === 11) {
      this.setState({
        year: this.state.year + 1,
        month: 0,
      });
    } else {
      this.setState({
        month: this.state.month + 1,
      });
    }
  }

  render() {
    return (
      <div>
        <NavegadorMenu />
        <div className="row calendar">
          <div className="col-1 d-flex align-items-center justify-content-end">
            <FlechaAtras onClick={this.BackMonth} />
          </div>
          <div className="col-10 text-align-center">{this.state.days}</div>
          <div className="col-1 d-flex align-items-center">
            <FlechaSiguiente />
          </div>
        </div>
      </div>
    );
  }
}

export default Calendario;
