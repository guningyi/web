<?php
 
$db = mysql_connect('localhost', 'root', '123456' ) or 
die ('Unable to connect. check your connection parameters.');

//create the main database if it doesn't already exist
$query = 'CREATE DATABASE IF NOT EXISTS 419group';
mysql_query($query, $db) or die(mysql_error($db));


//make sure our recently created database is the active one
mysql_select_db('419group', $db) or die(mysql_error($db));


//create the user table
$query = 'CREATE TABLE user (
  `uid` mediumint(8) unsigned NOT NULL auto_increment,
  `username` char(15) NOT NULL default 0,
  `password` char(32) NOT NULL default 0,
  `email` varchar(40) NOT NULL default 0,
  `gender` char(4)    NOT NULL default 0,
  `telNum` char(20)   NOT NULL default 0,
  `city`   char(20)   NOT NULL default 0,
  `state`  char(20)   NOT NULL default 0,
  `qqNum`  char(20)   NOT NULL default 0,
  `regdate` int(10) unsigned NOT NULL default 0,
  PRIMARY KEY  (`uid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1';

mysql_query($query, $db) or die(mysql_errno($db));


?>