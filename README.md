# test
test接口
1. npm install
2. 在utils下的config.json配置mysql的地址、端口、帐号、密码、数据库
3. post方法调用 http://127.0.0.1:3000/api/callFun/test/query
4. post参数：
    para 查询对象
    paginationObj 分页对象 
    {
        "para": {"stock_id":"xxx","stock_name":"xxx"} //对象为空则查所有 可以只传一个参数或者同时传两个参数
        "paginationObj": {
            "currentPage": 1, //当前页码
            "pageSize": 20, //页数据条数
            "totals": 100, //查询结果数据总数
            "maxSize": 5  //最大显示页码
        }
    }
