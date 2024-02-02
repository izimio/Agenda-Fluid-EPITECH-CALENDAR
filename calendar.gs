var SCHOOL_YEAR = 2024;

function getToken() {
  var url = "https://intra.epitech.eu/";
  var options = {
    method: "post",
    followRedirects: false,
    payload: {
      login: "YOUR_EMAIL_HERE",
      password: "YOUR_PARENTAL_CONNEXION_CODE_HERE",
    },
  };
  
  var response = UrlFetchApp.fetch(url, options);
  var cookie = response.getHeaders()["Set-Cookie"];
  
  return cookie.split(";").filter(function (header) {
    return header.indexOf("user=") !== -1;
  })[0].split("=")[1];
}


function getCalendar() {
  var token = getToken();
  var date = new Date();
  var start = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  
  date.setDate(date.getDate() + 800);
  
  var end = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  
  var url = "https://intra.epitech.eu/planning/load?format=json&start=" + start + "&end=" + end;
  var options = {
    method: "get",
    headers: {
      Cookie: "user=" + token,
    },
  };
  
  var response = UrlFetchApp.fetch(url, options);
  var data = JSON.parse(response.getContentText());
  
  return data;
}


function filterRegisteredEvents() {
  var events = getCalendar();
  var filteredEvents = events.filter(function (event) {
    return event.event_registered === "registered";
  });
  
  var parsedEvents = filteredEvents.map(function (event) {
    return {
      instance_location: event.instance_location,
      start: event.start,
      end: event.end,
      titlemodule: event.titlemodule,
      acti_title: event.acti_title,
      room: event.room,
      nb_hours: event.nb_hours,
    };
  });
  return parsedEvents;
}


function addEventToCalendar(title, startDate, endDate, room) {
  if (title == null || startDate == null || endDate == null)
    return;
  var calendarId = 'primary';
  var calendar = CalendarApp.getCalendarById(calendarId);
  var events = calendar.getEvents(startDate, endDate);
  let color = 7;
  var eventExists = false;
  let description = room?.code;

  for (var i = 0; i < events.length; i++) {
    if (events[i].getTitle() == title) {
      eventExists = true;
      break;
    }
  }
  if(title.indexOf("["))
    color = 1
  if (!eventExists) {

    if (title.includes(""))
    calendar.createEvent(title, startDate, endDate, {
      description: description || "",
      colorId: color
    });
  }
}

function addAllDayEventToCalendar(title, startDate, endDate) {
  if (title == null || startDate == null || endDate == null)
    return;
  var calendarId = 'primary';
  var calendar = CalendarApp.getCalendarById(calendarId);
  var events = calendar.getEvents(startDate, endDate);
  let color = 7;
  var eventExists = false;

  for (var i = 0; i < events.length; i++) {
    if (events[i].getTitle() == title) {
      eventExists = true;
      break;
    }
  }
  var reccurence = CalendarApp.newRecurrence().unti
  if(title.indexOf("["))
    color = 1
  if (!eventExists) {

    if (title.includes(""))
    calendar.createAllDayEvent(title, startDate, endDate, {
      colorId: color
    });
  }
}

function setCalendar() {
  var calendar = filterRegisteredEvents();
  var modules = filterRegisteredModules();
  for (elem in calendar) {
    Logger.log(calendar[elem]);
    let title = calendar[elem].acti_title + " |  [" + calendar[elem].titlemodule + "]" + " *TEK*";
      addEventToCalendar(title, new Date(calendar[elem].start), new Date(calendar[elem].end), calendar[elem].room);
  }

  // for (elem in modules) {
  //   let actual = modules[elem]
  //   Logger.log(actual);
  //   let title = actual.title + " *TEK*";
  //     addAllDayEventToCalendar(title, new Date(actual.start), new Date(actual.end));
  // }
}

function purgeCalendar() {
  Logger.log("=== START PURGING PREVIOUS AGENDA ===")
  var calendar = CalendarApp.getDefaultCalendar();
  var events = calendar.getEvents(new Date("1970-01-01"), new Date("2099-12-31"));
  for (var i = 0; i < events.length; i++) {
    if (events[i].getTitle().indexOf("*TEK*") != -1) {
      Logger.log(events[i].getTitle())
      events[i].deleteEvent();
    }
  }
  Logger.log(" =/=/= END OF PURGING PREVIOUS AGENDA =/=/=")
}

function getModules() {
  var token = getToken();
    const url = `https://intra.epitech.eu/course/filter?format=json`;
    const options = {
      method: "get",
      headers: {
        Cookie: `user=${token}`
      }
    };
    var response = UrlFetchApp.fetch(url, options)
    var data = JSON.parse(response.getContentText())
    return data;
}

function filterRegisteredModules() {
  var modules = getModules();
    const filteredModules = modules.filter(module => module.status === "ongoing"
    && module.scolaryear >= SCHOOL_YEAR
    && module.title.indexOf("PCP") == -1
    && module.title.indexOf("Diversity") == -1
    && module.title.indexOf("Promoting") == -1
    && module.title.indexOf("Roadblock") == -1
    && module.title.indexOf("Administrative") == -1
    && module.title.indexOf("Hub") == -1
    && module.title.indexOf("Free Coaching") == -1
    && module.title.indexOf("TEPitech") == -1
    && module.title.indexOf("Curricular") == -1
    && module.title.indexOf("Conferences") == -1
    
    )
    const parsedModules = filteredModules.map(module => ({
      title: module.title,
      start: module.begin,
      end: module.end,
    }));
    return parsedModules;
}


function run()
{
  purgeCalendar();
  setCalendar();

}

run()

