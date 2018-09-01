<?php

namespace App\Http\Entities;
use Illuminate\Database\QueryException;

use Illuminate\Database\Eloquent\Model;

use Image,Storage;

class Post extends Model
{
    protected $table = '_liveedu_post';


    //Tạo bài viết mới
    protected function create($data){
      try{
        $this->title = $data->title;
        $this->alias = str_slug($data->title,'-');
        $image =Image::make($data->image_cover);

        $hash = md5($this->alias);

        $path = "uploads/{$hash}.jpg";

        $image->save(public_path($path));

        // $url = "/images/{$hash}.jpg"
        $url = "/" . $path;

        $this->image_cover = $url;

        $this->content = $data->postContent;
        $this->save();
      }
      catch(QueryException $ex){

      }
    }


}
