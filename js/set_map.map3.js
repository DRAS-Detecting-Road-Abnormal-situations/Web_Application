var position = new naver.maps.LatLng(37.515105, 126.996357); //서울역 현재위치 default값
var position_car = new naver.maps.LatLng(37.498095, 127.027610) //강남역
var position1 = new naver.maps.LatLng(37.522583, 126.961311); // 반포대교남단
var position2 = new naver.maps.LatLng(37.515105, 126.996357); // 한강대교북단

var map = new naver.maps.Map('map', {
  center: position_car,
  zoom: 13,
  mapTypeId: naver.maps.MapTypeId.NORMAL
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

var markerOptions1 = {
  position: position1,
  map: map,
  icon: {
    url: './images/CCTV1.png',
    size: new naver.maps.Size(29, 29),
    origin: new naver.maps.Point(0, 0),
    anchor: new naver.maps.Point(11, 35)
  }
};
var markerOptions2 = {
  position: position2,
  map: map,
  icon: {
    url: './images/CCTV1.png',
    size: new naver.maps.Size(29, 29),
    origin: new naver.maps.Point(0, 0),
    anchor: new naver.maps.Point(11, 35)
  }
};
var marker_cctv1 = new naver.maps.Marker(markerOptions1);
var marker_cctv2 = new naver.maps.Marker(markerOptions2);
var car = new naver.maps.Marker(markerOptions_car);
var infowindow = new naver.maps.InfoWindow();