# documentation

## layout

REDIS
group-{groupid} => [userid,userid,userid]
user-{userid} => { groupid, userid, name, answers: { key: value } }

MYSQL
- groups:
    id
    users
    created
    updated
- users:
    id
    groupid
    created
    updated
- answers:
    userid
    key
    value
    timestamp
    created
    updated