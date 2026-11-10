Set oShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
strDir = "C:\\Users\\admin\\Documents\\Downloads\\BULID THAT KNOW"
oShell.CurrentDirectory = strDir

' Ensure background server is running
On Error Resume Next
Set oHttp = CreateObject("MSXML2.ServerXMLHTTP.6.0")
oHttp.open "GET", "http://localhost:3000/index.html", False
oHttp.setTimeouts 1000, 1000, 1000, 1000
oHttp.send

If Err.Number <> 0 Then
    Err.Clear
    oShell.Run "node server.js", 0, False
    WScript.Sleep 500
End If
On Error GoTo 0

' Launch standalone app window
strChrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
strEdge = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"

If fso.FileExists(strChrome) Then
    oShell.Run """" & strChrome & """ --app=http://localhost:3000/index.html", 1, False
ElseIf fso.FileExists(strEdge) Then
    oShell.Run """" & strEdge & """ --app=http://localhost:3000/index.html", 1, False
Else
    oShell.Run "http://localhost:3000/index.html", 1, False
End If
