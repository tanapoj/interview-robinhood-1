## Start

```
docker-compose up
```

then open link:

```
localhost:3000
```

## Migrate Database

```
npx prisma migrate dev
npx prisma generate
```

## Endpoint

### List All Users

```
GET /users

response:
[
    {
        "id": 1,
        "name": "admin",
        "email": "admin@interview.com"
    },
    {
        "id": 2,
        "name": "user2",
        "email": "user2@mail.com"
    }
]
```

### Create User

```
POST /users
body:
{
    "name": "user1",
    "email": "user1@mail.com"
}

response:
{
    "id": 1,
    "name": "user1",
    "email": "user1@mail.com"
}
```

### Update User

```
PUT /users/:id
body:
{
    "name": "user1",
    "email": "user1@mail.com"
}

response:
{
    "id": 1,
    "name": "user1",
    "email": "user1@mail.com"
}
```

### List Interviews

```
GET /interviews?status=Todo

query string:
- status = [Todo, Inprogress, Done]

response:
[
    {
        "id": 1,
        "description": "รายละเอียดงานหนึ่ง",
        "status": "Todo",
        "userId": 1,
        "createdAt": "2023-09-18T16:51:50.000Z",
        "archivedAt": null
    }
]
```

### Get Interview

```
GET /interviews/:id

response:
{
    "id": 1,
    "description": "รายละเอียดงานหนึ่ง",
    "status": "Todo",
    "userId": 1,
    "createdAt": "2023-09-18T16:51:50.000Z",
    "archivedAt": null,
    "user": {
        "id": 1,
        "name": "admin",
        "email": "admin@interview.com"
    },
    "comments": [
        {
            "id": 2,
            "comment": "ทดสอบคอมเมนท์",
            "userId": 1,
            "interviewId": 1,
            "createdAt": "2023-09-19T04:39:10.000Z"
        }
    ]
}
```

### Create Interview

```
POST /interviews
body: 
{
    "description": "รายละเอียดงานหนึ่ง",
    "status": "Todo", //'Todo' | 'InProgress' | 'Done'
    "userId": 1
}

response:
{
    "id": 1,
    "description": "รายละเอียดงานหนึ่ง",
    "status": "Todo",
    "userId": 1,
    "createdAt": "2023-09-18T16:51:50.000Z",
    "archivedAt": null
}
```

### Post Comment

```
POST /interviews/:id/comment
body: 
{
    "userId": 1,
    "interviewId": 1,
    "comment": "ทดสอบคอมเมนท์2"
}

response:
{
    "id": 3,
    "comment": "ทดสอบคอมเมนท์3",
    "userId": 1,
    "interviewId": 1,
    "createdAt": "2023-09-18T08:52:50.392Z"
}
```

### Archived Interview

```
PUT /interviews/:id/archived

response:
{
    "id": 1,
    "description": "รายละเอียดงานหนึ่ง",
    "status": "Todo",
    "userId": 1,
    "createdAt": "2023-09-18T16:51:50.000Z",
    "archivedAt": "2023-09-19T08:57:17.730Z"
}
```