@echo off
java -cp lib\js.jar;lib\ant.jar;lib\ant-launcher.jar;lib\ant-junit.jar;lib\cli.jar;lib\selenium.jar; -Dwebdriver.firefox.bin="d:\Program Files\Mozilla Firefox 4.0 Beta 10\firefox.exe" -Dreap_profile="true" org.mozilla.javascript.tools.shell.Main -opt -1 src/runner.js %*
