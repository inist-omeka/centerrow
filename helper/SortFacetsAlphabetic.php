<?php 
namespace OmekaTheme\Helper;

use Laminas\View\Helper\AbstractHelper;

class SortFacetsAlphabetic extends AbstractHelper
{
	protected $view;

	public function __invoke(array $facetValues){
		usort($facetValues, [SortFacetsAlphabetic::class, "cmp"]);
		return $facetValues;
	}

	public function cmp($a, $b){
		$a["value"] = strtolower($a["value"]);
		$a["value"] = strtr(utf8_decode($a["value"]), utf8_decode('àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ'), 'aaaaaceeeeiiiinooooouuuuyyAAAAACEEEEIIIINOOOOOUUUUY');
		$b["value"] = strtolower($b["value"]);
		$b["value"] = strtr(utf8_decode($b["value"]), utf8_decode('àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ'), 'aaaaaceeeeiiiinooooouuuuyyAAAAACEEEEIIIINOOOOOUUUUY');
		return strcmp($a["value"], $b["value"]);
	}
}
