// dataset here
var headerTitleTH = [
  "เวลาถึง",
  "เลขสาย",
  "ทะเบียน",
  "ชานชาลา",
  "ปลายทาง",
  "สถานะ",
];

var headerTitleEN = [
  "Time",
  "Number",
  "Plate",
  "Platform",
  "Destination",
  "Status",
];


// var url = 'https://test.cnx.sbt.transcode.co.th'
var url = 'https://api.dev.sbt.transcodeglobal.com/'
var parameter = getUrlParameter('id');
var list_route = [];
var list_route1 = [];
var listnew = [];
var object = null;
function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;
  for (i = 0; i < 4; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};


var data2 = {
  "ref_no": parameter
}


// post data
// var dt2 = $.ajax({
//   // url: url + '/boards/in',
//   url: url + 'boards/in?ref_no=' + parameter,
//   method: 'POST',
//   dataType: 'json',
//   contentType: "application/json; charset=utf-8",
//   data: JSON.stringify(data2),
//   async: false,
//   success: function (data) {
//     list_route = data.data //data in here
//     list_route1 = data
//     console.log(data)
//     console.log('///////////////////////////////////////')



//     // // console.log(data);
//   }
// });

// add object
function test007() {
  var dt2 = $.ajax({
    // url: url + '/boards/in',
    url: url + 'boards/in?ref_no=' + parameter,
    method: 'POST',
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(data2),
    async: false,
    success: function (data) {
      list_route = data.data //data in here
      list_route1 = data
      console.log(data);
    }
  });

  // cleaning data
  function set_data() {
    var dt1 = [];
    var data = list_route;
    var data1 = list_route1;
    // console.log(data1)
    listnew = data1.news;
    changeText();
    // console.log(data1)
    // console.log(list_route)
    for (i = 0; i < list_route.length; i++) {
      var eta = convertToTime(data[i].eta_local);
      var status = check_status(data[i].time_in, data[i].time);
      // console.log(data[0]);
      dt1.push({
        DueTime: eta,
        Number: data[i].line_number,
        license: data[i].province_name_short +' '+ data[i].license_plate_no,
        station: data[i].platform,
        destination: data[i].point_name,
        status: status,
        destination_eng: data[i].point_name_eng,
        staNameTH: data1.name,
        staNameEN: data1.name_eng
      }
      )
      // console.log(status)
    };
    // console.log(dt1)
    // var dt2=[];
    // dt2.push('['+dt1+']');
    // dt1.push('['+dt1+']')
    // console.log(dt1)
    return dt1
  }
  var obj = set_data(dt2);
  // console.log(obj);
  return obj;
}





//check status
function check_status(time_in, time) {
  // var today = new Date();
  // var Ttime = today.getHours() + ":" + today.getMinutes();
  // var date_t = Ttime.split(":");
  var date_c = time.split(":");
  var date_m = time_in.split(":");
  date_current = (parseInt(date_c[0], 10) * 60 * 60) + (parseInt(date_c[1], 10) * 60)
  date_maria = (parseInt(date_m[0], 10) * 60 * 60) + (parseInt(date_m[1], 10) * 60)
  // date_today= (parseInt(date_t[0], 10) * 60 * 60) + (parseInt(date_t[1], 10) * 60)
  // console.log(date_current,date_today)
  // console.log(date_t,date_c,date_m,time)
  var status = "";
  if (date_today="-") {
    status = 'On Time'
  } else {
    status = (date_current > date_maria) ? 'On Time' : 'delay'
  }
  return status
}
//convertTime
function convertToTime(dateTimeString) {
  var timeString = dateTimeString.split('T')[1]; // Split at 'T' and get the second part

  // Extract the time components
  var hours = timeString.split(':')[0];
  var minutes = timeString.split(':')[1];
  var seconds = timeString.split(':')[2];

  // Create the time format "HH:MM:SS"
  var timeFormat = hours + ':' + minutes;

  return timeFormat;
}
//changText
function changeText() {
  var element = document.getElementById('news');
  var texts = listnew; // Array of texts to cycle through
  var text_show = listnew[0];
  // console.log(texts)
  for (i = 1; i < listnew.length; i++) {
    text_show = text_show + listnew[i];
  }
  if (text_show == undefined) {
    text_show = '';
  }
  // console.log(text_show)
  // Update the text
  element.append(text_show)
}




// var object = [
//   {
//     DueTime: "13:00",
//     Number: "1",
//     license: "123",
//     station: "cnx",
//     destination: "กรุงเทพ",
//     destination_eng: "bangkok",
//     status: "on time",
//     staNameTH: "สถานีขนส่งผู้โดยสารจังหวัดนครราชสีมา แห่งที่ 1",
//     staNameEN: "Nakornratchasema 1",
//   },
//   {
//     DueTime: "12:00",
//     Number: "2",
//     license: "234",
//     station: "bkk",
//     destination: "cnx",
//     destination_eng: "chiang-mai",
//     status: "delay",
//     staNameTH: "สถานีขนส่งผู้โดยสารจังหวัดนครราชสีมา แห่งที่ 1",
//     staNameEN: "Nakornratchasema 1",
//   },
//   {
//     DueTime: "13:00",
//     Number: "3",
//     license: "123",
//     station: "cnx",
//     destination: "12:00",
//     status: "on time",
//     destination_eng: "chiang-rai",
//     staNameTH: "สถานีขนส่งผู้โดยสารจังหวัดนครราชสีมา แห่งที่ 1",
//     staNameEN: "Nakornratchasema 1",
//   },
//   {
//     DueTime: "13:00",
//     Number: "4",
//     license: "123",
//     station: "cnx",
//     destination: "12:00",
//     status: "on time",
//     destination_eng: "chiangmai",
//     staNameTH: "สถานีขนส่งผู้โดยสารจังหวัดนครราชสีมา แห่งที่ 1",
//     staNameEN: "Nakornratchasema 1",
//   },
//   {
//     DueTime: "13:00",
//     Number: "5",
//     license: "123",
//     station: "cnx",
//     destination: "12:00",
//     status: "on time",
//     destination_eng: "chiangmai",
//     staNameTH: "สถานีขนส่งผู้โดยสารจังหวัดนครราชสีมา แห่งที่ 1",
//     staNameEN: "Nakornratchasema 1",
//   },
//   {
//     DueTime: "13:00",
//     Number: "6",
//     license: "123",
//     station: "cnx",
//     destination: "12:00",
//     status: "on time",
//     destination_eng: "chiangmai",
//     staNameTH: "สถานีขนส่งผู้โดยสารจังหวัดนครราชสีมา แห่งที่ 1",
//     staNameEN: "Nakornratchasema 1",
//   },
//   {
//     DueTime: "13:00",
//     Number: "7",
//     license: "123",
//     station: "cnx",
//     destination: "12:00",
//     status: "on time",
//     destination_eng: "chiangmai",
//     staNameTH: "สถานีขนส่งผู้โดยสารจังหวัดนครราชสีมา แห่งที่ 1",
//     staNameEN: "Nakornratchasema 1",
//   },
//   {
//     DueTime: "13:00",
//     Number: "8",
//     license: "123",
//     station: "cnx",
//     destination: "12:00",
//     status: "on time",
//     destination_eng: "chiangmai",
//     staNameTH: "สถานีขนส่งผู้โดยสารจังหวัดนครราชสีมา แห่งที่ 1",
//     staNameEN: "Nakornratchasema 1",
//   },
//   {
//     DueTime: "13:00",
//     Number: "9",
//     license: "123",
//     station: "cnx",
//     destination: "12:00",
//     status: "on time",
//     destination_eng: "chiangmai",
//     staNameTH: "สถานีขนส่งผู้โดยสารจังหวัดนครราชสีมา แห่งที่ 1",
//     staNameEN: "Nakornratchasema 1",
//   },
// ];

var isThai = true;
var dataRow = UpdateScerrnSize();

var header = document.querySelector("#tableHead");
var tableData = document.querySelector("#tableData");
var txtTitle = document.querySelector("#boardIn");
var staName = document.querySelector("#station_name");

var headLength = headerTitleTH.length;

var interval = 20000;

document.documentElement.style.setProperty("--headLenght", headLength);
document.documentElement.style.setProperty("--dataLenght", headLength);
document.documentElement.style.setProperty("--dataRow", dataRow);

// time function

function updateClock() {
  var clock = document.getElementById("clock");
  var currentTime = new Date();

  var options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    // second: "numeric",
    hour12: false,
  };


  if (isThai) {
    var formattedDateTime = currentTime.toLocaleString("th-TH", options);
  } else {
    var formattedDateTime = currentTime.toLocaleString("en-GB", options);
  }
  clock.textContent = formattedDateTime;
  // clock2.textContent = formattedDateTime;

  // Schedule the next update
  setTimeout(updateClock, 1000);
}
updateClock();


function UpdateScerrnSize() {
  // let h = window.innerHeight;
  let h = screen.height;
  let call = (0.0055 * h) - 1.4063;
  return Math.ceil(call);
}

var allLength = 0;
var tmpObject = [];
var setObject = [];
const nullArray = {
  DueTime: "",
  Number: "",
  license: "",
  station: "",
  destination: "",
  status: "",
  destination_eng: "",
  staNameTH: "",
  staNameEN: "",
}

function updateObject() {
  // to row data format
  setObject = [];
  object = test007();
  // console.log(object.length)
  do {
    object.push(nullArray);
  } while (object.length % dataRow != 0);
  allLength = object.length;
  for (let j = 0; j < Math.floor(allLength / dataRow); j++) {
    for (let i = 0; i < dataRow; i++) {
      tmpObject.push(object.shift());
    }
    setObject.push(tmpObject);
    tmpObject = [];
  }
  // console.log(object)
}
updateObject();
// console.log(setObject);

var counter = 0;

function ShowData() {
  header.innerHTML = "";
  tableData.innerHTML = "";

  console.log(counter, setObject.length,setObject)
  if (counter >= setObject.length) {
    // for update data
    counter = 0;
    setObject = [];
    updateObject();
    // console.log(object)
  }
  if (isThai) {
    txtTitle.innerHTML = 'ขาเข้า';
    staName.innerHTML = setObject[counter][0].staNameTH;
    for (let i = 0; i < headerTitleTH.length; i++) {
      header.innerHTML += '<div class="title">' + headerTitleTH[i] + "</div>";
    }

    for (let j = 0; j < setObject[counter].length; j++) {
      tableData.innerHTML +=
        '<div class="data yl">' + setObject[counter][j].DueTime + "</div>";
      tableData.innerHTML +=
        '<div class="data yl">' + setObject[counter][j].Number + "</div>";
      tableData.innerHTML +=
        '<div class="data">' + setObject[counter][j].license + "</div>";
      tableData.innerHTML +=
        '<div class="data">' + setObject[counter][j].station + "</div>";
      tableData.innerHTML +=
        '<div class="data yl">' + setObject[counter][j].destination + "</div>";
      if (setObject[counter][j].status == "delay") {
        tableData.innerHTML +=
          '<div class="data rd">' + 'ล่าช้า' + "</div>";
      } else if(setObject[counter][j].status == "On Time") {
        tableData.innerHTML +=
          '<div class="data gn">' + 'ตามเวลา' + "</div>";
      } else {
        tableData.innerHTML +=
          '<div class="data gn">' + '' + "</div>";
      }
    }
  } else {
    txtTitle.innerHTML = 'Arrivals';
    staName.innerHTML = setObject[counter][0].staNameEN;
    for (let i = 0; i < headerTitleTH.length; i++) {
      header.innerHTML += '<div class="title">' + headerTitleEN[i] + "</div>";
    }
    for (let j = 0; j < setObject[counter].length; j++) {
      tableData.innerHTML +=
        '<div class="data yl">' + setObject[counter][j].DueTime + "</div>";
      tableData.innerHTML +=
        '<div class="data yl">' + setObject[counter][j].Number + "</div>";
      tableData.innerHTML +=
        '<div class="data">' + setObject[counter][j].license + "</div>";
      tableData.innerHTML +=
        '<div class="data">' + setObject[counter][j].station + "</div>";
      tableData.innerHTML +=
        '<div class="data yl">' + setObject[counter][j].destination_eng + "</div>";
      if (setObject[counter][j].status == "delay") {
        tableData.innerHTML +=
          '<div class="data rd">' + "Delay" + "</div>";
      } else if(setObject[counter][j].status == "On Time") {
        tableData.innerHTML +=
          '<div class="data gn">' + 'On Time' + "</div>";
      } else {
        tableData.innerHTML +=
          '<div class="data gn">' + '' + "</div>";
      }
    }
  }
}

// call display function
setInterval(function () {
  ShowData();
  counter++;
}, interval * 2);

// change language here
setInterval(function () {
  isThai = !isThai;
  ShowData();
}, interval);

ShowData();