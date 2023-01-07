import Mock from 'mockjs'

Mock.mock('/menu', 'get', function () {
    const menu_data = [
        {
            name: '用户管理',
            icon: 'el-icon-user',
            path: '/userList',
            component: 'user/UserList'
        },
        {
            name: '二级菜单',
            icon: 'el-icon-document',
            path: '/menu2',
            component: 'Main2'
        },
        {
            name: '系统设置',
            icon: 'el-icon-setting',
            path: '/system',
            component: 'Main3'
        }
    ]
    return {
        menu_data
    }
});

const userList = [
    {
        date: '2022-05-02',
        name: '明世隐3号',
        address: '江西省南昌市XXXXXX路1号',
        tag: '家'
    },
    {
        date: '2022-05-04',
        name: '明世隐4号',
        address: '江西省南昌市XXXXXX路2号',
        tag: '工作'
    },
    {
        date: '2022-05-01',
        name: '明世隐1号',
        address: '江西省南昌市XXXXXX路4号',
        tag: '工作'
    },
    {
        date: '2022-05-03',
        name: '明世隐2号',
        address: '江西省南昌市XXXXXX路3号',
        tag: '家'
    }
]
Mock.mock('/userList', 'get', function () {
    return {
        userList
    }
})

Mock.mock(RegExp('/search' + '.*'), 'get', option => {
    const url = option.url
    const params = getParam(url)
    const name = params.name
    const pageSize = params.pageSize
    const index = params.index
    let pager = {}
    pager.totalPage = Math.ceil(userList.length / pageSize)
    let newUserData = []

    let start, end = 0
    start = (index - 1) * pageSize
    end = index * pageSize - 1
    if (name) {
        newUserData = userList.filter(item => {
            return item.name.indexOf(name) > -1
        })
    } else {
        newUserData = userList
    }
    let newUserList = []
    newUserData.forEach((item, index) => {
        if (index >= start && index <= end) {
            newUserList.push(item)
        }
    })
    return {
        userList: newUserList,
        pager: pager
    }
})

Mock.mock('/user', 'post', function (param) {
    let body = JSON.parse(param.body)
    let newData = userList;
    newData.push(body)
    return {
        userList: newData
    }
})

Mock.mock('/user', 'put', function (param) {
    let body = JSON.parse(param.body)
    let name = body.name;
    userList.forEach((item) => {
        if (item.name === name) {
            item.address = body.address;
            item.tag = body.tag;
            item.date = body.date;
        }
    })
    return {
        userList: userList
    }
})

Mock.mock(RegExp('/user' + '.*'), 'delete', option => {
    const url = option.url
    let str = url.split('/')
    let name = str[str.length - 1];
    // 根据name来删除元素
    userList.splice(userList.findIndex(item => item.name === name), 1)
    return {
        userList: userList
    }
})

Mock.mock('/login', 'post', function(param) {
    let body = JSON.parse(param.body)
    let name = body.name
    let password = body.password
    let state = 0
    let data

    if (name==='admin' && password==='123456') {
        state = 1;
        data = Mock.mock({
            'token': '@guid()',
            'name': '@cname'
        })
    }

    return {
        'state': state,
        'vData': data
    }
})

Mock.mock('/logout', 'post', function() {
    return {
        state: 1
    }
})

function getParam(url) {
    let str = url.split('?')[1].split('&')
    const obj = {}
    for (let i = 0; i < str.length; i++) {
        let params = str[i].split('=')
        obj[params[0]] = params[1]
    }
    return obj
}

