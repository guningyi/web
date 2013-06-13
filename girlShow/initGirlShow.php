<?php 
    require 'db.inc.php';
    
    $db = mysql_connect(MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD) or
        die ('Unable to connect. Check your connection parameters.');
    mysql_select_db(MYSQL_DB, $db) or die(mysql_error($db));


    $query = 'CREATE TABLE IF NOT EXISTS showGirl (
        girlId        CHAR(5)      NOT NULL,
        name          MEDIUMTEXT  NOT NULL,
        description   MEDIUMTEXT,
        picCode       CHAR(5)          NOT NULL,

        PRIMARY KEY(girlId)
    ) 	
    ENGINE=MyISAM';
mysql_query($query, $db) or die(mysql_error($db));
mysql_query("set names 'utf8'");

$query = 'INSERT INTO showGirl
        (girlId, name, description, picCode)
    VALUES
        ("00001",
        "郭美美",
        "寻找有缘人",
         001),
         ("00002",
         "王美美", 
         "寻另一半",
         002),
         ("00003",
         "李莫愁",
         "古墓派弟子",
         003),
         ("00004",
         "小龙女",
         "单身16年",
         004),
         ("00005",
         "赵敏",
         "郡主，白富美",
         005),
         ("00006",
         "周芷若", 
         "峨眉派新掌门",
         006)';
mysql_query($query, $db) or die(mysql_error($db));
?>