<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Input;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function dirToArray($dir) {

     $result = array();

     $cdir = scandir($dir);
     $i=0;
     foreach ($cdir as $key => $value)
     {
        if (!in_array($value,array(".","..")))
        {
           if (is_dir($dir . '/' . $value))
           {
              $result[$i]['type'] = 'folder';
              $result[$i]['name'] = $value;
              $result[$i]['subb'] = $this->dirToArray($dir . '/' . $value);
              $result[$i]['path'] = $dir . '/' . $value;
              $result[$i]['id'] = str_slug($dir . '/' . $value,'_');
           }
           else
           {
              $result[$i]['type'] = 'file';
              $result[$i]['name'] = $value;
              $result[$i]['path'] = $dir . '/' . $value;
              $result[$i]['id'] = str_slug($value);
           }

           $i++;
        }
     }

     return $result;
  }

    public function internalDocument(){
      $dir    = 'assets/2. Quy Trình';

      $data = $this->dirToArray($dir);

      return $data  ;
    }

    public function load(){
      $path = Input::get('path');
      $result = array();

      $cdir = scandir($path);

      $i=0;

      foreach($cdir  as $key=>$value){
        if (!in_array($value,array(".","..")))
        {
           if (is_dir($path . '/' . $value))
           {
              $result[$i]['type'] = 'folder';
           }
           else
           {
              $result[$i]['type'] = 'file';
           }

           $result[$i]['name'] = $value;
           $result[$i]['path'] = $path . '/' . $value;
           $result[$i]['id'] = str_slug($path . '/' . $value,'_');
           $i++;
        }
      }

      return $result;
    }
}
