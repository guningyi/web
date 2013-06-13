<?php
//connect to MySQL
$db = mysql_connect('localhost', 'root', '123456') or 
    die ('Unable to connect. Check your connection parameters.');

//create the main database if it doesn't already exist
$query = 'CREATE DATABASE IF NOT EXISTS User';
mysql_query($query, $db) or die(mysql_error($db));

//make sure our recently created database is the active one
mysql_select_db('user', $db) or die(mysql_error($db));

//create the user table
$query = 'CREATE TABLE user (
        userLevel       INTEGER UNSIGNED  NOT NULL AUTO_INCREMENT,
        accountNo       INTEGER UNSIGNED  NOT NULL AUTO_INCREMENT,
        goldNum         INTEGER UNSIGNED  NOT NULL, 
        silverNum       INTEGER UNSIGNED  NOT NULL,
        userName        VARCHR(255)       NOT NULL,
        nickName        TEXT              NOT NULL,
        friendNum       INTEGER UNSIGNED  NOT NULL,
        qqNum           INTEGER UNSIGNED  NOT NULL,
        msnNum          VARCHR(255)       NOT NULL,
        mobileNum       INTEGER UNSIGNED  NOT NULL,
        areaStr         VARCHR(255)       NOT NULL,
        locationStr     VARCHR(255)       NOT NULL,
        userAge         INTEGER UNSIGNED  NOT NULL,
        userMarried     VARCHR(2)         NOT NULL,
        userJob         TEXT              NOT NULL,
        userIncome      INTEGER UNSIGNED  NOT NULL,
        userHeight      INTEGER UNSIGNED  NOT NULL,
        userWeight      INTEGER UNSIGNED  NOT NULL,
        userEb          TEXT              NOT NULL,
        userBirthDay    DATE              NOT NULL,
        userHobby       TEXT              NOT NULL,
        userCharacter   TEXT              NOT NULL,
        PRIMARY KEY (accountNo),
        KEY userName (accountNo, userName) 
    ) 
    ENGINE=MyISAM';
mysql_query($query, $db) or die (mysql_error($db));

//create the photo table
$query = 'CREATE TABLE photo ( 
        photoName    VARCHR(255)       NOT NULL, 
        photoSize    INTEGER UNSIGNED  NOT NULL, 
        photoOwner   INTEGER UNSIGNED  NOT NULL AUTO_INCREMENT,
        photoTime    DATE              NOT NULL,
        PRIMARY KEY (photoOwner) 
    ) 
    ENGINE=MyISAM';
mysql_query($query, $db) or die(mysql_error($db));

//create the gift  table
$query = 'CREATE TABLE gift  ( 
        giftName         VARCHAR(255)    NOT NULL, 
        giftPrice        INTEGER UNSIGNED  NOT NULL,  
        giftOwner        INTEGER UNSIGNED  NOT NULL,, 
        PRIMARY KEY (giftName)
    ) 
    ENGINE=MyISAM';
mysql_query($query, $db) or die(mysql_error($db));

echo 'User database successfully created!';
?>