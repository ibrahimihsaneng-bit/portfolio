Set oShell = CreateObject("WScript.Shell")
strDir = "C:\\Users\\admin\\Documents\\Downloads\\BULID THAT KNOW"
oShell.CurrentDirectory = strDir

On Error Resume Next
Set oHttp = CreateObject("MSXML2.ServerXMLHTTP.6.0")
oHttp.open "GET", "http://localhost:3000/index.html", False
oHttp.setTimeouts 1000, 1000, 1000, 1000
oHttp.send

If Err.Number <> 0 Then
    Err.Clear
    oShell.Run "node server.js", 0, False
End If
On Error GoTo 0
