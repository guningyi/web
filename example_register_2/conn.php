<?php
/*****************************
*���ݿ�����
*****************************/
$conn = @mysql_connect("localhost","root","123456");
if (!$conn){
    die("�������ݿ�ʧ�ܣ�" . mysql_error());
}
mysql_select_db('UserExample', $conn);
//�ַ�ת��������
mysql_query("set character set 'gbk'");
//д��
mysql_query("set names 'gbk'");
?>