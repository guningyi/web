<html>
<head></head>
<body>
<?php
  $conn = mysql_connect("localhost", "root", "123456");
  if(!$conn){
  	die("连接数据库失败：" . mysql_error());
  }
  mysql_select_db('419group', $conn) or die(mysql_error($conn));
  mysql_query("set character set 'gbk'");
  //写库
  mysql_query("set names 'gbk'");

  $query = 'SELECT
        picCode, name, description
    FROM
        showGirl
    ORDER BY
        girlId ASC';
 $result = mysql_query($query, $conn)or die(mysql_error($conn));

 $odd = true;
 $counter = 0;
 echo '<table border="0" cellspacing="10">';
 while ($row = mysql_fetch_array($result))
 {
    extract($row);
    if (($counter == 0) || ($counter == 3) || ($counter == 6))
    {
      echo '<tr>';
    }
    if ($counter < 3)
    {
       
        echo '<td >
        <img src="../girlPic/' .$picCode .'.jpg" style="width:100px;height:100px;"/> </td>';         
        if ($counter == 2)
        {
            echo '</tr>';
        }
        $counter++;
    }  
    else if(($counter < 6) && ($counter >= 3))
    {
        echo '<td> 
        <img src="../girlPic/' .$picCode .'.jpg" style="width:100px;height:100px; "/> </td>';         
        if ($counter == 5)
        {
            echo '</tr>';
        }
        $counter++;
    }
    
    else if(($counter < 9) && ($counter >= 6))
    {
        echo '<td>
        <img src="../girlPic/' .$picCode .'.jpg" style=" width:100px;height:100px;"/> </td>';         
        if ($counter == 8)
        {
            echo '</tr>';
        }
        $counter++;
    }
        
 }
echo '</table>';
?>
</body>
</html>


