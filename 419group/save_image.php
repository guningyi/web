<?
$conn=mysql_connect("localhost","root","123456");
mysql_db_select("test",$conn);
?>
<?php
$id=$_POST['id'];
$check_sql="select * from image where id = 'id'";
$check_re=mysql_query($check_sql);
$num=mysql_num_rows($check_re);
if($num!=0){
  echo "<table width='100%' align=center><tr><td align=center>";
 echo "���û����Ѿ����ڣ���ѡ����һ��<br>";
    echo "<font color=red>�ϴ�ʧ�ܣ�</font><br><a href='javascript:history.back(-1)'>����</a>";
    echo "</td></tr></table>";
 exit();
}