/********************************************************
 * Function :[common] getPaginationSql for Angle {currentPage,prePage} .
 * In
 *    sql :  executable SQL 4 pagination.
 *    paginationObj : {currentPage: 1, prePage: 20, orderby : ''}
 *
 * Return Object { dataSql: '查询数据的SQL' , cntSql : '计算数据总数的SQL' }
 *
 ********************************************************/
exports.getPaginationSql = function(sql, paginationObj) {

    paginationObj = paginationObj === undefined ? {} : paginationObj;
  
    if (paginationObj.pageSize > 100) {
      paginationObj.pageSize = 100;
    }
  
    console.info(paginationObj, (paginationObj.currentPage - 1) * paginationObj.pageSize);
  
    /*  Step 1 Handle paginationObj parameter */
    var _skip = paginationObj.currentPage === undefined ? 0 : (paginationObj.currentPage - 1) * paginationObj.pageSize;
    var _limit = paginationObj.prePage === undefined ? 20 : paginationObj.pageSize;
  
    var dataSql;
    var cntSql;
    var sqlObject;
  
    dataSql = `${sql} limit ${_limit} offset ${_skip} `;

  
    cntSql = ' SELECT COUNT(1) AS CNT FROM (' + sql + ')  AS tt';
  
    sqlObject = { dataSql: dataSql, cntSql: cntSql };
  
    return (sqlObject);
  
  };


exports.whereclnew = function(obj){
    var searobj=obj.searchobj;  
    var searchcri=obj.searchcri; 
    var wherecl = ' and 1=1 ';
    if(searobj===undefined||searobj===null){
      return wherecl;
    }
    console.log(searobj);
    var a=0;
    console.log(searchcri);
    for(var item in searobj)
    {
      
      //console.log(item);
      //console.log("+",searobj[item]);
      if (!(searobj[item] === '')&&!(searobj[item]===null)){ 
        for(var it in searchcri)
        {
          //console.log('定义');
          //console.log(item); 
          // console.log(searchcri[it]);
          //console.log(searobj[item],item,searchcri[it].searchfield);
          if(item===searchcri[it].searchfield)
          {
            console.log('!!!');
            console.log(item);
            console.log(searchcri[it].fieldtype);
            if(searchcri[it].fieldtype=='text')
            {
              if (searchcri[it].cmptype ==='like')
                wherecl= wherecl + ' and ' + searchcri[it].fieldname +' ' + searchcri[it].cmptype +' "%'+searobj[item]+'%"';
              else
                wherecl= wherecl + ' and ' + searchcri[it].fieldname +' ' + searchcri[it].cmptype +' "'+searobj[item]+'"';
            }
            else if(searchcri[it].fieldtype=='datepicker')
            {
              
              //       console.log(a++);
              wherecl= wherecl + ' and ' +searchcri[it].fieldname +' '+ searchcri[it].cmptype +' "'+searobj[item]+'"';
            }
            
          }
        }
        //wherecl = wherecl + ' and ' +item +' like "%'+searobj[item]+'%" ';
      }
      //console.log(searobj[item]);
      //console.log("+",wherecl);
      
    }
    return wherecl;
  };