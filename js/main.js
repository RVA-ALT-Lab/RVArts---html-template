fetch(
  "https://rvarts.org/wp-json/tribe/events/v1/events?per_page=20"
)
  .then(function(response) {
  // Convert to JSON
  return response.json();
})
  .then(function(data) {
  // GOOD!
  data = data.events;
  for (i = 0; i < data.length; i++) {
   //console.log(data[i].title);
    writeEvents(data[i]);
  } 
}).then(function(){
  rotateRand();
  colorRand(); 
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
  console.log('Taking a break...');
  await sleep(2000);
  console.log('2 second later');
  stolenColors();
}

demo();


function writeEvents(data) {
var match =  classDate(data);
  var post = jQuery('#theContent').append(
    jQuery(
      '<div id="' +
      data.id +
      '" class="event '+classDate(data)+ '"' +
      '><div class="event-bg"><div class="card event-content text-center"><img src="'+featuredImg(data)+'"><a href="'+data.url+'"><h2 class="card-title event-title">' +
      data.title +
      '</h2></a><div class="date-holder">'+theDate(data)+'</div></div></div></div>' 
    ) 
  );
}


function theDate(data){
  var today = new Date();
  var thisMonth = today.getMonth()+1;
  var thisDay = today.getDate()+1;
  //get event date
  var year = data.start_date_details.year;
  var month = data.start_date_details.month;
  var day = data.start_date_details.day;
  var hour = data.start_date_details.hour;
  var minute = data.start_date_details.minutes;
  return '<div class="date">'+ month + '/' + day + '@' + hour + ':' +minute + "</div>";
}


function dayMatch(today,eventDate){
  if (today == eventDate){
    return 'today';
  }
}

function monthMatch(thisMonth, eventMonth){
  if (thisMonth == eventMonth){
    return 'month';
  }
}


function classDate(data){
  var today = new Date();
  var thisMonth = today.getMonth()+1;
  var thisDay = today.getDate()+1;
  //get event date
  var month = data.start_date_details.month;
  var day = data.start_date_details.day;
  if (thisMonth+thisDay == month+day ){
      return 'col-md-12'
      }
  if (thisMonth == month) {
    return 'col-md-6'
  } else {
    return 'col-md-4'
  }
  
}

function rotateRand(){
  var dates = document.querySelectorAll('.date'); 
  for (i = 0; i < dates.length; i++){
    var tilt = Math.floor(Math.random() * 14) + 2;
    tilt *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
    dates[i].style.transform = 'rotate('+tilt+'deg)';
  }
}

function colorRand(){
  var colors = ['#db3e2b','yellow','#315a9b','green','#25aec1'];
  var dates = document.querySelectorAll('.date-holder'); 
  for (i = 0; i < dates.length; i++){
     var color = colors[Math.floor(Math.random()*colors.length)];
     dates[i].style.backgroundColor = color;
  }
}

function featuredImg(data){
  if (data.image.url != null){   
    return data.image.url;
  } else {
    return 'https://c1.staticflickr.com/5/4535/26665820059_1d68b36a35_z.jpg';
  }
}

function stolenColors(img){
  var images = document.querySelectorAll('img');
  var colors = [];
  for (i = 0; i < images.length; i++){
    var img = images[i];
    img.crossOrigin = 'Anonymous';
    console.log(getColor(images[i]));
  }
  console.log(colors)
  return colors;
}

function getColor(img){
  img.crossOrigin = 'Anonymous';
  var colorThief = new ColorThief();
  try {
    var color = colorThief.getColor(img);
    return color;
  } catch(err) {
    console.log(err.message);
  }
}


