<html>
<body>
<form name="addForm" action="main.php" method="post">
   <table>
        <tr>
            <td><label for="girlId">id:</label></td>
            <td><input type="text" name="girlId" id="girlId" size="20"
                   maxlength="20" value="<?php echo $girlId; ?>"/></td>
        </tr>
        <tr>
            <td><label for="name">用户名:</label></td>
            <td><input type="text" name="name" id="name" size="20" maxlength="50"
                 value="<?php echo $name; ?>"/></td>
        </tr>
        <tr>
            <td><label for="description">个人简介:</label></td>
            <td><input type="text" name="description" id="description" size="20"
                maxlength="20" value="<?php echo $description; ?>"/></td>
        </tr>
        <tr>
            <td><label for="picCode">照片名称:</label></td>
            <td><input type="text" name="picCode" id="picCode" size="20"
                maxlength="20" value="<?php echo $picCode; ?>"/></td>
        </tr>
        <tr>
            <td><input type="submit" name="submit" value="添加"/></td>
        </tr>
   </table>
</form>
</body>
<html>