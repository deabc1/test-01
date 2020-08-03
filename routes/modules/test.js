const _=require('../../utils/_');
const _com=require('./common');

exports.query=query;

function query(req,res){

    let body=req.body || {};

    let para=body.para || {};

    let pagination=body.paginationObj || {currentPage: 1, pageSize: 20, totals: 1000, maxSize: 5};

    console.log('body',body,pagination);
    
    let wherecl = '';
    let _searchcri = [ 
        {searchfield:'stock_id',fieldname:'stock_id',caption:'',cmptype:'=',fieldtype:'text',optiondata:''},
        {searchfield:'stock_name',fieldname:'stock_name',caption:'',cmptype:'like',fieldtype:'text',optiondata:''}
    ]; 

    if(para!==undefined && para!==null && para!==''){
        let obj={'searchobj':para,'searchcri':_searchcri};
        wherecl=_com.whereclnew(obj);
    }

    console.log('wherecl',wherecl);

    let sql=' SELECT stock_id,stock_name,ROE,Net_profit,profit_margin,net_asset_per,core_growth,NP_growth,rating FROM ( '
        +' SELECT temp.*,t2.rating FROM ( '
        +' select * from t_finance_guide as b where not exists(select 1 from t_finance_guide where stock_id= b.stock_id '
        +' and b.Report_year<Report_year ) '
        +' ) AS temp LEFT OUTER JOIN  t_score_rating_test  t2 ON temp.stock_id=t2.stock_id '
        +' ) result where 1=1 '+wherecl;

    let sqlObject=_com.getPaginationSql(sql,pagination);
    
    console.log('sqlObject',sqlObject);

    // _.db.query(sql,[],(err,doc)=>{
    //     console.log(doc);
    //     res.json(doc);
    // });
    
    _.db.query(sqlObject.dataSql, [], function(dataErr, dataDoc){
        _.db.query(sqlObject.cntSql, [], function(cntErr, cntdoc){
            console.log(dataDoc.length);
            console.log(cntdoc);
            if(dataErr||cntErr){
                res.json('查询出错')
            }
            let serviceReturn={};
            serviceReturn.data = dataDoc;
            serviceReturn.pagination = pagination;
            serviceReturn.pagination.totals = cntdoc[0]['CNT'];
            res.json(serviceReturn);
            //return _com.commonAfterQueryHandler(dataDoc,dataErr,cntdoc,cntErr,pagination,fn);
        });
    });
}


