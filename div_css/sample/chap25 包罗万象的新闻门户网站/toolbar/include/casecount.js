/**
 * �p�⭶���s�����Ƭ���
 */
var pageCount = {
    /**
     * �����N��
     */
    utmac : "UA-2798001-1"
    /**
     * �W�D�N��
     * index: ����
     * seek_view: �ץ�
     */
    , prj : {"jobCase":"001", "jobComp":"002", "joblistBank":"003", "jobMatch":"004", "jobMail":"005"}
    /**
     * �N�s������+1
     * @param prj �ӷ� 1�Gjoblist�̭���¾�� 2�Gjoblist�̭����t�� 3.joblist�U���������Ȧ� 4.�D��my104�t��u�@�C�� 5.joblist��email����
     * @param cat �������Ѽƺ���
     * @param adlist �ѼƥN��
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


