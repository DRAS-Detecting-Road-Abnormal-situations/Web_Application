var position_car = new naver.maps.LatLng(37.554646, 126.9690018); // 광화문? 서울역인거같음..
var position_cctv1 = new naver.maps.LatLng(37.522583, 126.961311); // 세종대로4거리 cctv
var position_cctv2 = new naver.maps.LatLng(37.515105, 126.996357); //청계2가
var cctv_list = [];
var start_point = 0;
var end_point = 0;
var start_x = 37.55301699999999; //출발지 위도
var start_y = 126.972646; //출발지 경도
var end_x = 37.570432; //도착지 위도
var end_y = 126.9690019; //도착지 경도
var cctv1_color = 'CCTV1.png'; //cctv 색 변수로 바꾸기
var cctv2_color = 'CCTV1.png'; //cctv 색 변수로 바꾸기
var cctc1_image = '';
var cctv2_image= '';

function change() {
  state = true;
  start_point = document.getElementById("u53_data").innerHTML; //출발지
  end_point = document.getElementById("u54_data").innerHTML; //도착지
  console.log(start_point, end_point);
  geocodeAddress(geocoder, map);
}

function initMap() {
  var map = new google.maps.Map(document.getElementById('map1'), {
    zoom: 10,
    center: {
      lat: 17.3700,
      lng: 78.4800
    }
  });

  var geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function () {
    geocodeAddress(geocoder, map);
  });
  document.getElementById('u47_text').addEventListener('click', function () {
    geocodeAddress(geocoder, map);
  });
  document.getElementById('u47').addEventListener('click', function () {
    geocodeAddress(geocoder, map);
  });
}

function geocodeAddress(geocoder, resultsMap) {
  geocoder.geocode({
    'address': start_point
  }, function (results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      console.log(start_point);
      console.log(results[0].geometry.viewport);
      console.log(results[0].geometry.viewport.Hb.g);
      start_y = (results[0].geometry.viewport.Hb.g + results[0].geometry.viewport.Hb.i) / 2; //위도
      start_x = (results[0].geometry.viewport.tc.g + results[0].geometry.viewport.tc.i) / 2; //경도
      console.log(start_x, start_y);
      reset()
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });

  geocoder.geocode({
    'address': end_point
  }, function (results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      console.log(end_point);
      end_y = (results[0].geometry.viewport.Hb.g + results[0].geometry.viewport.Hb.i) / 2; //위도
      end_x = (results[0].geometry.viewport.tc.g + results[0].geometry.viewport.tc.i) / 2; //경도
      console.log(end_x, end_y)
      reset()
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function set_zoom() {
  var width = end_x - start_x
  var length = end_y - start_y

  var center_x = start_x + width / 2;
  var center_y = start_y + length / 2;
  if (width < 0) {
    width = width * (-1);
    center_x = end_x + width / 2;
  }
  if (length < 0) {
    length = length * (-1);
    center_y = end_y + length / 2;
  }
  console.log(center_x, center_y);
  console.log('확인', width, length);
  max_num = Math.max(width, length);
  console.log(max_num);
  position_car = new naver.maps.LatLng(center_x, center_y);
  if (max_num > 0.08) {
    console.log('in1');
    return 12
  } else if (max_num > 0.05){
    console.log('in2');
    return 13
  } else{
    console.log('in3');
    return 15
  }
}

function reset() {

  var HOME_PATH = window.HOME_PATH || '.';

  var map = new naver.maps.Map('map', {
    center: position_car,
    mapTypeControl: true,
    zoom: set_zoom(),
    mapTypeControlOptions: {
      style: naver.maps.MapTypeControlStyle.DROPDOWN
    }
  });

  var trafficLayer = new naver.maps.TrafficLayer({
    interval: 300000 // 5분마다 새로고침 (최소값 5분)
  });

  var btn = $('#traffic');

  naver.maps.Event.addListener(map, 'trafficLayer_changed', function (trafficLayer) {
    if (trafficLayer) {
      btn.addClass('control-on');
      $("#autorefresh").parent().show();
      $("#autorefresh")[0].checked = true;
    } else {
      btn.removeClass('control-on');
      $("#autorefresh").parent().hide();
    }
  });

  btn.on("click", function (e) {
    e.preventDefault();

    if (trafficLayer.getMap()) {
      trafficLayer.setMap(null);
    } else {
      trafficLayer.setMap(map);
    }
  });

  $("#autorefresh").on("click", function (e) {
    var btn = $(this),
      checked = btn.is(":checked");

    if (checked) {
      trafficLayer.startAutoRefresh();
    } else {
      trafficLayer.endAutoRefresh();
    }
  });

  naver.maps.Event.once(map, 'init_stylemap', function () {
    trafficLayer.setMap(map);
  });

  var markerOptions_car = {
    position: position_car,
    map: map,
    icon: {
      url: './images/CAR1.png',
      size: new naver.maps.Size(21, 38),
      origin: new naver.maps.Point(0, 0),
      anchor: new naver.maps.Point(11, 35)
    }
  };
  console.log(cctv1_color, cctv2_color);
  var markerOptions_cctv1 = {
    position: position_cctv1,
    map: map,
    icon: {
      url: './images/' + cctv1_color,
      size: new naver.maps.Size(29, 29),
      origin: new naver.maps.Point(0, 0),
      anchor: new naver.maps.Point(11, 35)
    }
  };
  var markerOptions_cctv2 = {
    position: position_cctv2,
    map: map,
    icon: {
      url: './images/' + cctv2_color,
      size: new naver.maps.Size(29, 29),
      origin: new naver.maps.Point(0, 0),
      anchor: new naver.maps.Point(11, 35)
    }
  };
  var markerOptions_start = {
    position: new naver.maps.LatLng(start_x, start_y),
    map: map,
    icon: {
      url: './images/start_mark.png',
      size: new naver.maps.Size(20, 28),
      origin: new naver.maps.Point(0, 0),
      anchor: new naver.maps.Point(11, 35)
    }
  };

  var markerOptions_end = {
    position: new naver.maps.LatLng(end_x, end_y),
    map: map,
    icon: {
      url: './images/end_mark.png',
      size: new naver.maps.Size(20, 28),
      origin: new naver.maps.Point(0, 0),
      anchor: new naver.maps.Point(11, 35)
    }
  };

  var marker_car = new naver.maps.Marker(markerOptions_car);
  var marker_cctv1 = new naver.maps.Marker(markerOptions_cctv1);
  var marker_cctv2 = new naver.maps.Marker(markerOptions_cctv2);
  var marker_start = new naver.maps.Marker(markerOptions_start);
  var marker_end = new naver.maps.Marker(markerOptions_end);

  naver.maps.Event.addListener(marker_cctv1, 'click', getClickHandler('1'));
  naver.maps.Event.addListener(marker_cctv2, 'click', getClickHandler('2'));

    function getClickHandler(seq) {
        return function (e) {
            console.log(seq);
            if(seq == '1'){
              var contentString_cctv1 = [
                '<div class="iw_inner">',
                "   <h3>한강대교 북단 CCTV</h3>",
                '   <p><img src="http://chaeyoung.pythonanywhere.com/media/situation_image/1010112418.png" width="200" height="113" alt="" class="thumb" /></p>', ,
                "</div>",
            ].join("");
            var infowindow = new naver.maps.InfoWindow({
                content: contentString_cctv1,
            });
            naver.maps.Event.addListener(marker_cctv1, "click", function (e) {
                if (infowindow.getMap()) {
                    infowindow.close();
                } else {
                    infowindow.open(map, marker_cctv1);
                }
            }); //cctv클릭시 사고사진 출력

            }else if(seq == '2'){
              var contentString_cctv2 = [
                '<div class="iw_inner">',
                "   <h3>반포대교 남단 CCTV</h3>",
                '   <p><img src="http://chaeyoung.pythonanywhere.com/media/situation_image/1010112418.png" width="200" height="113" alt="" class="thumb" /></p>', ,
                "</div>",
            ].join("");
            var infowindow = new naver.maps.InfoWindow({
                content: contentString_cctv2,
            });
            naver.maps.Event.addListener(marker_cctv2, "click", function (e) {
                if (infowindow.getMap()) {
                    infowindow.close();
                } else {
                    infowindow.open(map, marker_cctv2);
                }
            }); //cctv클릭시 사고사진 출력
            }

            

        }
    }
}
