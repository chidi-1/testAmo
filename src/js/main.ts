import '../style.css'
import {DealsPage} from "./deal";
import {AmoCrmApi} from "./AmoCrmApi";

document.addEventListener('DOMContentLoaded', async () => {
    const api = new AmoCrmApi('https://cors-anywhere.herokuapp.com/https://4649elaina.amocrm.ru', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjUwMDcxZWZhZDc2NmViZWZmM2YxZjEyOTAyNzM5ZTEzZjdmMTZkZTIxNzkxNzVkYzFlZTI2YTM2NzI3OTgwZDYyNDZlM2NhYzQ2YWI2YjJkIn0.eyJhdWQiOiI2YTFjMDk2YS1jMDc5LTRhNDItOTFlOS1mYTBhYjY2ODI1OTciLCJqdGkiOiI1MDA3MWVmYWQ3NjZlYmVmZjNmMWYxMjkwMjczOWUxM2Y3ZjE2ZGUyMTc5MTc1ZGMxZWUyNmEzNjcyNzk4MGQ2MjQ2ZTNjYWM0NmFiNmIyZCIsImlhdCI6MTcyNzYyNDU3NywibmJmIjoxNzI3NjI0NTc3LCJleHAiOjE3Mjc3NDA4MDAsInN1YiI6IjExNTgwNzYyIiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxOTc4NjUwLCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiOGZjOTczMDItMmNiZC00MGFlLTliNDQtNThmZjEyNWQwYzQyIiwiYXBpX2RvbWFpbiI6ImFwaS1iLmFtb2NybS5ydSJ9.f_7Zae5hYngRKLoeQ270zqhIwXq7bdeKxkPerMEm-e3zhu-jGarptKoyeNczlXVqmJPvn8u0wB5PBLCkGzHPLxe0rTt4yFccb66XSvDfosiHszUDykqe-DTB_RZ9xNbiUwV6TAWyW_h7XaqwvSsVGbKALIkj6zhUVLwOQwoEKiHCyNBMXoYjDmJRerMiD886FJ7fq5qaaTbwj35qVgEarb0DAxH8WJjPip8VPfPaPG-2YVieGsAARabVRlxxdnun1eULW5FBj9K-gSA3VV3qvOuDe8SSVnHpAGr7oH-5x9LpiF1MQc4GY4FtS4SAZuWXzED--0zpfZ67o1kDosm3Xg');
    const dealsPage = new DealsPage(api, 'deals-table-body');

    await dealsPage.loadDeals();
});


