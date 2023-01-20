<?php 
namespace OmekaTheme\Helper;

use Laminas\View\Helper\AbstractHelper;

class citationNakala extends AbstractHelper
{
    // $src → lien embed Nakala
    public function __invoke($src = null) 
    { 
        $url = explode("/", $src);
        $url = "https://api.nakala.fr/datas/".$url[4]."/".$url[5];
        $context = stream_context_create(["http" => ["header" => "accept: application/json"]]);
        $response = file_get_contents($url, false, $context);
        $response = json_decode($response);
        
        return $response->citation;
    }
}
