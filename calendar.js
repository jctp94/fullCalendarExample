$(document).ready(function () {

    $('#calendar').fullCalendar({
        events: [
            {
                title: 'event1',
                start: '2018-02-02'
            }
        ],
        defaultView: 'timeline',
        editable: false, // don't allow event dragging
        eventResourceEditable: true
    });
    //$("#addEvent").
});