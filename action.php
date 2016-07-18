<?php
include 'include/config.php';
spl_autoload_register(array('Autoloader', 'loadPackages'));
include 'include/vendor/autoload.php';

use Respect\Validation\Validator as v;

if(filter_input(INPUT_POST, 'action')) {
    $postAction = filter_input(INPUT_POST, 'action');

    if ($postAction === "start") {
        $mac = trim($_POST['mac']);

        if(v::macAddress()->validate($mac) === false){
            $return["error"]  = true;
            $return["msg"]    = "Неверный MAC адрес";
            die(json_encode($return));
        }

        exec("wakeonlan $mac > /dev/null 2>&1");
        sleep(2);

        $return["error"]  = false;
        $return["msg"]    = "ПК Запущен";
        die(json_encode($return));
    }

    if ($postAction === "ping") {
        $ip = trim($_POST['ip']);

        if(v::ip()->validate($ip) === false){
            $return["error"]  = true;
            $return["msg"]    = "Неверный IP адрес";
            die(json_encode($return));
        }

        $ping = exec("ping -c 2 {$ip}", $out);

        $redular  = "/(\d+) packets transmitted, (\d+) received/";
        preg_match($redular, $out[5], $result);

        $return["transmitted"] = $result[1];
        $return["received"]    = $result[2];
        die(json_encode($return));
    }

}
