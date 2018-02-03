$(document).ready(function () {
    var eventsServer;
    $.ajax({
        url: "http://localhost:3000/3dves/validate",
        type: "get",
        success: function (respuesta) {
            eventsServer = respuesta;
            init(respuesta);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
        }
    });

});

var init = function (events) {
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        events: events,
        dragRevertDuration: 0,
        editable: true,
        eventClick: function (event, element) {
            $('#calendar').fullCalendar('updateEvent', event);
        },
        eventDrop: function (event, delta, revertFunc) {
            if (!confirm(event.title + " was dropped on " + event.start.format() + "Are you sure about this change?")) {
                revertFunc();
            } else {
                $('#calendar').fullCalendar('updateEvent', event)
                console.log($('#calendar').fullCalendar('clientEvents'));
            }

        },
        eventDragStop: function (event, jsEvent, ui, view) {
            if (isEventOverDiv(jsEvent.clientX, jsEvent.clientY)) {
                $('#calendar').fullCalendar('removeEvents', event._id);
            }
        }

    });


    $("#addEvent").click(function () {
        var event = {
            id: 5,
            title: 'event5',
            start: '2018-02-02',
            end: '2018-02-06',
            textColor: 'black',
        }
        $('#calendar').fullCalendar('renderEvent', event, true)
        var array = $('#calendar').fullCalendar('clientEvents');
        $('#calendar').fullCalendar('changeView', viewName)
    });
}

var isEventOverDiv = function (x, y) {

    var trash = $('#trash');
    var offset = trash.offset();
    offset.right = trash.width() + offset.left;
    offset.bottom = trash.height() + offset.top;

    // Compare
    if (x >= offset.left
        && y >= offset.top
        && x <= offset.right
        && y <= offset.bottom) { return true; }
    return false;

}