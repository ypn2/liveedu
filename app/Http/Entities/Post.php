<?php

namespace App\Http\Entities;
use Illuminate\Database\QueryException;

use Illuminate\Database\Eloquent\Model;

use Intervention\Image\Exception\NotReadableException;

use Image,Storage;

class Post extends Model
{
    protected $table = '_liveedu_post';


    //Tạo bài viết mới
    protected function create($data){
      try{
        $this->title = $data->title;
        $this->alias = str_slug($data->title,'-');

        if($data->image_cover!=''){

          $image =Image::make($data->image_cover);

          $hash = md5($this->alias);

          $path = "uploads/{$hash}.jpg";

          $image->save(public_path($path));

          // $url = "/images/{$hash}.jpg"
          $url = "/" . $path;

          $this->image_cover = $url;


        }

        $this->content = $data->postContent;
        $this->save();
      }
      catch(QueryException $ex){

      }

      catch(NotReadableException $ex){
        return json_encode([
          'code'=>'301',
          'message'=>$ex->getMessage()
        ]);
      }
    }


}
