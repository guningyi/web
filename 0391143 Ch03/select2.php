<?php
$db = mysql_connect('localhost', 'bp6am', 'bp6ampass') or 
    die ('Unable to connect. Check your connection parameters.');
mysql_select_db('moviesite', $db) or die(mysql_error($db));

// select the movie titles and their genre after 1990
$query = 'SELECT
        movie_name, movietype_label
    FROM
        movie LEFT JOIN movietype ON movie_type = movietype_id
    WHERE
        movie.movie_type = movietype.movietype_id AND
        movie_year > 1990
    ORDER BY
        movie_type';
$result = mysql_query($query, $db) or die(mysql_error($db));

// show the results
echo '<table border="1">';
while ($row = mysql_fetch_assoc($result)) {
    echo '<tr>';
    foreach ($row as $value) {
        echo '<td>' . $value . '</td>';
    }
    echo '</tr>';
}
echo '</table>';
?>