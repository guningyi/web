<?php

if(!isset($_POST['submit'])){
    exit('�Ƿ�����!');
}
$username = $_POST['username'];
$password = $_POST['password'];
$email = $_POST['email'];
//add by Ivan
$gender = $_POST['gender'];
$telNum = $_POST['telNum'];
$city = $_POST['city'];
$state = $_POST['state'];
$qqNum = $_POST['qqNum'];





//ע����Ϣ�ж�
if(!preg_match('/^[\w\x80-\xff]{3,15}$/', $username)){
    exit('�����û��������Ϲ涨��<a href="javascript:history.back(-1);">����</a>');
}
if(strlen($password) < 6){
    exit('�������볤�Ȳ����Ϲ涨��<a href="javascript:history.back(-1);">����</a>');
}

if(!preg_match('/^[^@]*@[^@]*\.[^@]*$/', $email)){
    exit('���󣺵��������ʽ����<a href="javascript:history.back(-1);">����</a>');
}
//if(!preg_match('/^w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*$/', $email)){
//    exit('���󣺵��������ʽ����<a href="javascript:history.back(-1);">����</a>');
//}

//�������ݿ������ļ�
include('conn.php');
//����û����Ƿ��Ѿ�����
$check_query = mysql_query("select uid from user where username='$username' limit 1");
if(mysql_fetch_array($check_query)){
    echo '�����û��� ',$username,' �Ѵ��ڡ�<a href="javascript:history.back(-1);">����</a>';
    exit;
}


//д������
$password = MD5($password);
$regdate = time();
$sql="INSERT INTO user(username,password,email,gender,telNum,city,state,qqNum,regdate) VALUES ('$username','$password','$email','$gender','$telNum','$city','$state','$qqNum',$regdate)";
if(mysql_query($sql,$conn))
{
    exit('�û�ע��ɹ�������˴� <a href="login.html">��¼</a>');
} 
else 
{
    echo '��Ǹ����������ʧ�ܣ�',mysql_error(),'<br />';
    echo '����˴� <a href="javascript:history.back(-1);">����</a> ����';
}



?>