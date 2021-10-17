from pyfcm import FCMNotification
 
APIKEY = "AAAAL1km3GM:APA91bFAKxvgGbO_2j7UTIHvqLzrBzGTthWuZHkD_HffLEhQgjLPfkt_tJHL4W7A5niwt0gPcmYKCgFUNnROkoqB8xZI52_xTbCy8kFoRuSl-qaUygx7rrBHV00CZNnpx3ZI2NkXZOi8"
TOKEN = "dNIAUDd68Nk:APA91bHebtZ6Q0C97FuHY5J1_678aYQ4G_lEw2UTq9lvH8WvnGtJqR1NzO0lzfsKqAprKsa4hfcn1M9sbqqSLqNteq5IWzmGpbtGTAXoW6H6mf5Dk6E8_mxoBqTSeT_rOnA21guwGa_5"
 
# 파이어베이스 콘솔에서 얻어 온 서버 키를 넣어 줌
push_service = FCMNotification(APIKEY)
 
def sendMessage(body, title):
    # 메시지 (data 타입)
    data_message = {
        "body": body,
        "title": title
    }
 
    # 토큰값을 이용해 1명에게 푸시알림을 전송함
    result = push_service.single_device_data_message(registration_id=TOKEN, data_message=data_message)
 
    # 전송 결과 출력
    print(result)
 
sendMessage("배달의 민족", "치킨 8000원 쿠폰 도착!")