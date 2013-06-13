<?php
$conn=mssql_connect("localhost","root","123456");   //建立与SQL Server数据库的连接
mssql_select_db("db_online",$conn);   //选择数据库
?>
