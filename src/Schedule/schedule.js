import moment from 'moment';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import React, { Component } from 'react'
import { Calendar } from 'react-big-calendar';
import { momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import './style.css';
import jsonData from "./data.json";

const localize = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export default class schedule extends Component {
  state = 
   {
    events: jsonData.map(eleman =>
    (
      {
        start: moment(eleman.start).toDate(),
        end: moment(eleman.end).toDate(),
        title: eleman.title
      }
    ),
    )
  };

  handleSelectSlot = (event) => {
    const { start, end } = event
    const title = window.prompt('New Event name')
    if (title) {
      const cloneEvents = [...this.state.events];
      cloneEvents.push({ start, end, title })
      this.setState({ events: cloneEvents })
      console.log(this.state.events)
    }
  }

  handleSelectEvent = (event) => {
   const { title } = event;
   alert(title);
  }

  render() {
    return (
      <div>
        <h1 className='h1_baslik'>MY PLANNER</h1>
        <DnDCalendar
          selectable
          resizable
          defaultView="month"
          defaultDate={moment().toDate()}
          onSelectEvent={this.handleSelectEvent}
          onSelectSlot={this.handleSelectSlot}
          events={this.state.events}
          localizer={localize}
        />
      </div>
    );
  }
}
