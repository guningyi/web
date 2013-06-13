/**
 * 計算頁面瀏覽次數相關
 */
var pageCount = {
    /**
     * 網站代號
     */
    utmac : "UA-2798001-1"
    /**
     * 頻道代號
     * index: 首頁
     * seek_view: 案件頁
     */
    , prj : {"jobCase":"001", "jobComp":"002", "joblistBank":"003", "jobMatch":"004", "jobMail":"005"}
    /**
     * 將瀏覽次數+1
     * @param prj 來源 1：joblist裡面的職缺 2：joblist裡面的廠商 3.joblist下面的分眾銀行 4.主網my104配對工作列表 5.joblist的email此頁
     * @param cat 紀錄的參數種類
     * @param adlist 參數代號
     */
    , add : function(prj, cat, adlist){
        var parameter = "?utmad=1";
        parameter += "&utmac="+pageCount.utmac;
        parameter += "&prj="+prj;
        parameter += "&cat="+cat;
        parameter += "&adlist="+adlist;
        (new Image).src = "https://payment.104.com.tw/screw/analytics/app/app.CacheData.php"+parameter;

    }
}


