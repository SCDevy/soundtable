<?php
include("pusher.php");
$pusher = new Pusher(
  "9f2cde4bf9c16af5d034", "bf441c57e38a97b090b1", "90168"
);
$presence_data = array(
  'username' => "miamiam",
  'avatar' => "lolol"
);
echo $pusher->presence_auth(
  $_POST['channel_name'], $_POST['socket_id'], rand(1,200), $presence_data);
?>