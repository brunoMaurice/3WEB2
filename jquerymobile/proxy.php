<?php

header('Content-Type:text/xml; charset="utf-8"');

print file_get_contents($_GET['url']);