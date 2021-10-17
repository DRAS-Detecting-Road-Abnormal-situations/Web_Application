"""
pip install firebase-admin
pip install --user firebase-admin
"""
import firebase_admin
from firebase_admin import credentials, messaging

# cred = credentials.Certificate("serviceAccountKey.json")
#firebase_admin.initialize_app(cred)

def send_to_firebase_cloud_messaging():
    # This registration token comes from the client FCM SDKs.
    registration_token = 'dNIAUDd68Nk:APA91bHebtZ6Q0C97FuHY5J1_678aYQ4G_lEw2UTq9lvH8WvnGtJqR1NzO0lzfsKqAprKsa4hfcn1M9sbqqSLqNteq5IWzmGpbtGTAXoW6H6mf5Dk6E8_mxoBqTSeT_rOnA21guwGa_5' # App's token

    # See documentation on defining a message payload.
    message = messaging.Message(
    notification=messaging.Notification(
        title='안녕하세요 타이틀 입니다',
        body='안녕하세요 메세지 입니다',
    ),
    token=registration_token,
    )

    response = messaging.send(message)
    # Response is a message ID string.
    print('Successfully sent message:', response)

send_to_firebase_cloud_messaging()