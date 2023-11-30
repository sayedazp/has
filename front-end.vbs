Dim oShell
Set oShell = WScript.CreateObject ("WScript.Shell")
oShell.run "npm start", 0, False
Set oShell = Nothing
