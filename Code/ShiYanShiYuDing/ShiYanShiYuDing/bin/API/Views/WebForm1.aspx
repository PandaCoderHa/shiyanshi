<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm1.aspx.cs" Inherits="ShiYanShiYuDing.Views.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../Scripts/jquery-3.2.1.min.js"></script>
     <script>
        $(function () {
            $.ajax({
                url: '/api/GetM_ShiYanShi/1',
                type: 'get', //GET
                async: true, 
                success: function (data, textStatus, jqXHR) {
                    console.log(data)
                    console.log(textStatus)
                    console.log(jqXHR)
                },
                error: function (xhr, textStatus) {
                    console.log('错误')
                    console.log(xhr)
                    console.log(textStatus)
                },
                complete: function () {
                    console.log('结束')
                }
            })
        });

    </script>
</head>
<body>
    <form id="form1" runat="server">
        <div>
        </div>
    </form>
</body>
</html>
