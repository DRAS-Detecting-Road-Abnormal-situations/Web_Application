var test_x = 37.5655;
var test_y = 126.97;
var cctv1_image = 1;
var cctv2_image = 1;
var state = false // CHECK true: 경로 입력 했을 때/ false: 경로 입력 안했을 때

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDFDD8X7EgY7Vh1ySVO8sAodI6dOAPRmKQ",
    authDomain: "dras-cc7ae.firebaseapp.com",
    projectId: "dras-cc7ae",
    storageBucket: "dras-cc7ae.appspot.com",
    messagingSenderId: "203359181923",
    appId: "1:203359181923:web:5160bc46d5f8704c152c56",
    measurementId: "G-60JQQGV270"
  };
firebase.initializeApp(config);

const messaging = firebase.messaging();

//token값 알아내기
messaging
    .requestPermission()
    .then(function () {
        console.log("Have permission");
        return messaging.getToken();
    })
    .then(function (token) {
        console.log(token);
    })
    .catch(function (arr) {
        console.log("Error Occured");
    });

messaging.onMessage(function (payload) {
    if (state == false){
        return 
    }

    // 알림창 설정
    if (payload.data.type == "acc") {
        document.getElementById("u73_text").innerHTML = payload.data.title;
        document.getElementById("u72_text").innerHTML = payload.data.body;
        cctv1_image = "http://chaeyoung.pythonanywhere.com/media/situation_image/" +
        payload.data.image_name +
        ".png";
        setTimeout(function () {
            document.getElementById("u75_image").src =
                "http://chaeyoung.pythonanywhere.com/media/situation_image/" +
                payload.data.image_name +
                ".png";
            //http://chaeyoung.pythonanywhere.com/media/situation_image/1212132115.png
            console.log("onMessage: acc ", payload);
            //cctv1_image = payload.data.image_name;
            check_range(
                payload.data.cctv_id_x,
                payload.data.cctv_id_y,
                payload.data.type,
                payload.data.image_name
            ); // cctv 범위 확인해주는 함수
        }, 3000);
    } else if (payload.data.type == "ob") {
        document.getElementById("u66_text").innerHTML = payload.data.title;
        document.getElementById("u65_text").innerHTML = payload.data.body;
        cctv2_image = "http://chaeyoung.pythonanywhere.com/media/situation_image/" +
        payload.data.image_name +
        ".png";
        setTimeout(function () {
            document.getElementById("u68_image").src =
                "http://chaeyoung.pythonanywhere.com/media/situation_image/" +
                payload.data.image_name +
                ".png";
            console.log("onMessage: ob ", payload);
            //cctv2_image = payload.data.image_name;
            check_range(
                payload.data.cctv_id_x,
                payload.data.cctv_id_y,
                payload.data.type,
                payload.data.image_name
            ); // cctv 범위 확인해주는 함수
        }, 3000);
    }
});

// start_x, start_y 출발지 위도 경도, end_x, end_y 도착지 위도 경도 인지 물어보기
//  point1-------point2
//   -             -
//   -             -
//  point3-------point3
function check_range(cctv_id_x, cctv_id_y, type, image_name) {
    console.log("범위 확인", cctv_id_x, cctv_id_y, type);
    cctv_id_x *= 1;
    cctv_id_y *= 1;
    var point1 = start_x;
    var point2 = end_x;
    var point3 = start_y;
    var point4 = end_y;
    console.log(point1, point2, point3, point4);
    var width = (end_x - start_x) / 2;
    if (width < 0) {
        width = width * -1;
        point1 = end_x;
        point2 = start_x;
    }
    var length = (end_y - start_y) / 2;
    if (length < 0) {
        length = length * -1;
        point3 = end_y;
        point4 = start_y;
    }
    console.log(point1, point2, point3, point4);
    if (point1 <= cctv_id_x && cctv_id_x <= point2) {
        if (point3 <= cctv_id_y && cctv_id_y <= point4) {
            raise_notification(type);
        }
    } 
}

function raise_notification(type) {
    console.log("알림확인", type);
    if (type == "acc") {
        document.getElementById("u74_text").style.visibility = "visible";
        document.getElementById("u74_text").style.display = "block";
        document.getElementById("u73_text").style.visibility = "visible";
        document.getElementById("u73_text").style.display = "block";
        document.getElementById("u72_text").style.visibility = "visible";
        document.getElementById("u72_text").style.display = "block";
        document.getElementById("u75_image").style.visibility = "visible";
        document.getElementById("u75_image").style.display = "block";
        document.getElementById("u71_div").style.visibility = "visible";
        document.getElementById("u71_div").style.display = "block";
        document.getElementById("u70_div").style.visibility = "visible";
        document.getElementById("u70_div").style.display = "block";
        setTimeout(function () {
            document.getElementById("u74_text").style.visibility = "hidden";
            document.getElementById("u74_text").style.display = "none";
            document.getElementById("u73_text").style.visibility = "hidden";
            document.getElementById("u73_text").style.display = "none";
            document.getElementById("u72_text").style.visibility = "hidden";
            document.getElementById("u72_text").style.display = "none";
            document.getElementById("u75_image").style.visibility = "hidden";
            document.getElementById("u75_image").style.display = "none";
            document.getElementById("u71_div").style.visibility = "hidden";
            document.getElementById("u71_div").style.display = "none";
            document.getElementById("u70_div").style.visibility = "hidden";
            document.getElementById("u70_div").style.display = "none";
        }, 4000);
        cctv1_color = "CCTV3.png";
        reset();
        markerOptions1 = {
            position: position_cctv1,
            map: map,
            icon: {
                url: "./images/CCTV3.png",
                size: new naver.maps.Size(29, 29),
                origin: new naver.maps.Point(0, 0),
                anchor: new naver.maps.Point(11, 35),
            },
        };
        var marker = new naver.maps.Marker(markerOptions1);
        var contentString_cctv1 = [
            '<div class="iw_inner">',
            "   <h3>세종대로 사거리 CCTV</h3>",
            '   <p><img src="http://chaeyoung.pythonanywhere.com/media/situation_image/121213710.png" width="200" height="113" alt="" class="thumb" /></p>',
            "</div>",
        ].join("");
        var infowindow = new naver.maps.InfoWindow({
            content: contentString_cctv1,
        });

        naver.maps.Event.addListener(marker, "click", function (e) {
            if (infowindow.getMap()) {
                infowindow.close();
            } else {
                infowindow.open(map, marker);
            }
        }); //cctv 클릭시 사고사진 출력
        
        //색 바꿔주기
    } else if (type == "ob") {
        document.getElementById("u67_text").style.visibility = "visible";
        document.getElementById("u67_text").style.display = "block";
        document.getElementById("u66_text").style.visibility = "visible";
        document.getElementById("u66_text").style.display = "block";
        document.getElementById("u65_text").style.visibility = "visible";
        document.getElementById("u65_text").style.display = "block";
        document.getElementById("u68_image").style.visibility = "visible";
        document.getElementById("u68_image").style.display = "block";
        document.getElementById("u64_div").style.visibility = "visible";
        document.getElementById("u64_div").style.display = "block";
        document.getElementById("u63_div").style.visibility = "visible";
        document.getElementById("u63_div").style.display = "block";
        setTimeout(function () {
            document.getElementById("u67_text").style.visibility = "hidden";
            document.getElementById("u67_text").style.display = "none";
            document.getElementById("u66_text").style.visibility = "hidden";
            document.getElementById("u66_text").style.display = "none";
            document.getElementById("u65_text").style.visibility = "hidden";
            document.getElementById("u65_text").style.display = "none";
            document.getElementById("u68_image").style.visibility = "hidden";
            document.getElementById("u68_image").style.display = "none";
            document.getElementById("u64_div").style.visibility = "hidden";
            document.getElementById("u64_div").style.display = "none";
            document.getElementById("u63_div").style.visibility = "hidden";
            document.getElementById("u63_div").style.display = "none";
        }, 3000);
        cctv2_color = "CCTV3.png";
        reset();
        markerOptions3 = {
            position: position_cctv2,
            map: map,
            icon: {
                url: "./images/CCTV3.png",
                size: new naver.maps.Size(29, 29),
                origin: new naver.maps.Point(0, 0),
                anchor: new naver.maps.Point(11, 35),
            },
        };
        var marker = new naver.maps.Marker(markerOptions3);
    } // cctv 색 바꿔주기
    var contentString_cctv2 = [
        '<div class="iw_inner">',
        "   <h3>세종대로 사거리 CCTV</h3>",
        '   <p><img src="http://chaeyoung.pythonanywhere.com/media/situation_image/121213710.png" width="200" height="113" alt="" class="thumb" /></p>', ,
        "</div>",
    ].join("");
    var infowindow = new naver.maps.InfoWindow({
        content: contentString_cctv2,
    });
    naver.maps.Event.addListener(marker, "click", function (e) {
        if (infowindow.getMap()) {
            infowindow.close();
        } else {
            infowindow.open(map, marker);
        }
    }); //cctv클릭시 사고사진 출력
    
}

function cancel_route(){
    state = false;
}