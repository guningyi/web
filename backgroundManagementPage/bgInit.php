<?php 
    require 'db.inc.php';
    $db = mysql_connect(MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD) or 
    die ('Unable to connect. Check your connection parameters.');
mysql_select_db(MYSQL_DB, $db) or die(mysql_error($db));

// create the user table
$query = 'CREATE TABLE IF NOT EXISTS admin(
        user_id     INTEGER     NOT NULL AUTO_INCREMENT,
        username    VARCHAR(20) NOT NULL,
        password    CHAR(41)    NOT NULL,

        PRIMARY KEY (user_id)
    )
    ENGINE=MyISAM';
mysql_query($query, $db) or die (mysql_error($db));

// create the user information table
$query = 'CREATE TABLE IF NOT EXISTS admin_info (
        user_id     INTEGER     NOT NULL,
        name        VARCHAR(20) NOT NULL,
        card_no   VARCHAR(20) NOT NULL,
        email       VARCHAR(50) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES site_user(user_id)
    )
    ENGINE=MyISAM';
mysql_query($query, $db) or die (mysql_error($db));

// populate the user table
$query = 'INSERT IGNORE INTO admin
        (user_id, username, password) 
    VALUES
        (1, "Ivan", PASSWORD("orc123456")),
        (2, "Jolly", PASSWORD("orc123456"))';
mysql_query($query, $db) or die (mysql_error($db));

// populate the user information table
$query = 'INSERT IGNORE INTO admin_info
        (user_id, name, card_no, email) 
    VALUES
        (1, "顾宁一", "00001", "ningyigu@gmail.com"),
        (2, "邓静", "00002", "xixiguaguagua@126.com")';
mysql_query($query, $db) or die (mysql_error($db));

echo 'Success!';

?>