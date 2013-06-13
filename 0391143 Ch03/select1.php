<?php
$db = mysql_connect('localhost', 'bp6am', 'bp6ampass') or 
    die ('Unable to connect. Check your connection parameters.');
mysql_select_db('moviesite', $db) or die(mysql_error($db));

// select the movie titles and their genre after 1990
$query = 'SELECT
        movie_name, movie_type
    FROM
        movie
    WHERE
        movie_year > 1990
    ORDER BY
        movie_type';
$result = mysql_query($query, $db) or die(mysql_error($db));

// show the results
while ($row = mysql_fetch_assoc($result)) {
    foreach ($row as $value) {
        echo $value . ' ';
    }
    echo '<br/>';
}
?>