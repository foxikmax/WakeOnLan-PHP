<?php
include 'include/config.php';
spl_autoload_register(array('Autoloader', 'loadPackages'));
include 'include/vendor/autoload.php';


$loader = new Twig_Loader_Filesystem(DIR.'include/templates/site/main/');
$twig = new Twig_Environment($loader);
$params = array('comps' => $comps);
$template = $twig->loadTemplate('main.twig');

echo $template->render($params);