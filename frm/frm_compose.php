<?php
require_once 'frm_header.inc.php';

$subject = '';
if (isset($_GET['topicid'])) {
    $topicid = $_GET['topicid'];
} else {
    $topicid = '';
}
if (isset($_GET['forumid'])) {
    $forumid = $_GET['forumid'];
} else {
    $forumid = '';
}
if (isset($_GET['reid'])) {
    $reid = $_GET['reid'];
}
$body = '';
$post = '';
$authorid = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;
$edit_mode = FALSE;

if (isset($_GET['a']) && $_GET['a'] == 'edit' && isset($_GET['post']) && 
    $_GET['post']) {
    $edit_mode = TRUE;
}

if (!isset($_SESSION['user_id'])) {
    echo '<p><strong>You must be logged in to post.  Please ' .
        '<a href="frm_login.php">Log in</a> before posting a message.</strong>' .
        '</p>';
} else if ($edit_mode && $_SESSION['user_id'] != $authorid) {
    echo '<p><strong>You are not authorized to edit this post. Please contact ' .
        'your administrator.</strong></p>';
} else {
    if ($edit_mode) {
        $sql = 'SELECT
                topic_id, forum_id, author_id, subject, body
            FROM
                frm_posts p JOIN frm_forum f ON p.forum_id = f.id
            WHERE p.id = ' . $_GET['post'];
        $result = mysql_query($sql, $db) or die(mysql_error($db));

        $row = mysql_fetch_array($result);

        $post = $_GET['post'];
        $topicid = $row['topic_id'];
        $forumid = $row['forum_id'];
        $authorid = $row['author_id'];
        $subject = $row['subject'];
        $body = $row['body'];
    } else {

        if ($topicid == '') {
            $topicid = 0;
            $topicname = 'New Topic';
        } else {
            if ($reid != '') {
            $sql = 'SELECT
                    subject
                FROM
                    frm_posts
                WHERE
                    id = ' . $reid;
            $result = mysql_query($sql, $db) or die(mysql_error($db));
            if (mysql_num_rows($result) > 0) {
                $row = mysql_fetch_array($result);
                $re = preg_replace('/(re: )/i', '', $row['subject']);
            }
        }
        $sql = 'SELECT
                subject
            FROM
                frm_posts
            WHERE
                id = ' . $topicid . ' AND topic_id = 0 AND 
                forum_id = ' . $forumid;
        $result = mysql_query($sql, $db) or die(mysql_error($db));
        if (mysql_num_rows($result) > 0) {
            $row = mysql_fetch_array($result);
            $topicname = 'Reply to <em>' . $row['subject'] . '</em>';
            $subject = ($re == '') ? '' : 'Re: ' . $re;
        } else {
            $topicname = 'Reply';
            $topicid = 0;
        }
    }
}

if ($forumid == '' || $forumid == 0) {
    $forumid = 1;
}
$sql = 'SELECT
        forum_name
    FROM
        frm_forum 
    WHERE id = ' . $forumid;
$result = mysql_query($sql, $db) or die(mysql_error($db));
$row = mysql_fetch_array($result);
$forumname = $row['forum_name'];
?>

<h2><?php echo ($edit_mode) ? 'Edit Post' : $forumname . ': ' . $topicname; ?></h2>
<form method="post" action="frm_transact_post.php">
 <p>Subject:<br/>
  <input type="text" name="subject" maxlength="255"
   value="<?php echo $subject; ?>"/></p>
 <p>Body:<br/>
  <textarea name="body" rows="10" cols="60"><?php echo $body; ?></textarea></p>
<p><input type="submit" name="action" value="<?php 
 echo ($edit_mode) ? 'Save Changes' : 'Submit New Post'; ?>" />
 <input type="hidden" name="post" value="<?php echo $post; ?>">
 <input type="hidden" name="topic_id" value="<?php echo $topicid; ?>">
 <input type="hidden" name="forum_id" value="<?php echo $forumid; ?>">
 <input type="hidden" name="author_id" value="<?php echo $authorid; ?>"></p>
</form>
<?php
}
require_once 'footer.php';
?>