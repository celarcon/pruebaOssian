<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

use Knp\Component\Pager\PaginatorInterface;

use App\Entity\Image;

class ImageController extends AbstractController
{
    public function getImages(Request $request,PaginatorInterface $paginator)
    {
        //$image_repo = $this->getDoctrine()->getRepository(Image::Class);
        //Sacamos todas las imagenes 
        //$images = $image_repo ->findAll();

        $em = $this->getDoctrine()->getManager();

        //Consulta para ordenar los datos de mas nuevo a mas viejo 
        $sql = "SELECT i FROM App\Entity\Image i ORDER BY i.idimage DESC";
        $query = $em->createQuery($sql);
        
        //Recogemos el parametro page de la URL
        $page =$request->query->getInt('page',1);
        $items_per_page = 6;

        //invocar a la paginacion
        $pagination = $paginator->paginate($query, $page, $items_per_page);
        $total = $pagination->getTotalItemCount();

        //Comprobar y validar datos
        if($pagination && $pagination!=NULL){
            //Datos a devolver
            $data =[
                'status' => 'success',
                'code'   =>    200,
                'message'=>'Se obtuvo las imagenes correctamente',
                'images' => $pagination,
                'page_actual' => $page,
                'items_per_page' => $items_per_page,
                'total_pages' => ceil($total/$items_per_page)
            ];

        }else{
            $data =[
                'status' => 'error',
                'code'   =>    400,
                'message'=>'No se pudo consseguir las imagenes'//,
                //'images' => $images,
            ];
        }
        return $this->json($data);
    }

    public function getImage($id = null)
    {
        $image_repo = $this->getDoctrine()->getRepository(Image::Class);

        $image = $image_repo ->findOneBy(['idimage'=>$id]);

        //Comprobar y validar datos
        if($image && $image!=NULL){
            $data =[
                'status' => 'success',
                'code'   =>    200,
                'message'=>'La imagen obtuvo correctamente',
                'image' => $image
            ];

        }else{
            $data =[
                'status' => 'error',
                'code'   =>    400,
                'message'=>'No se pudo obtner',
                'image' => $image
            ];
        }

        return $this->json($data);
    }

    public function createImage(Request $request){
        //Recoger los datos por post
        $json = $request->get('json',null);

        //Decodificar el json
        $params = json_decode($json);

        //Respuesta por defecto
        $data =[
            'status' => 'erro',
            'code'   =>    200,
            'message'=>'No se creo la imagen',
            'json' => $params,
        ];

        //Comprobar y validar datos
        if($json != null){
            $title = (!empty($params->title)) ? $params->title : null;
            $description = (!empty($params->description)) ? $params->description : null;
            $category = (!empty($params->category)) ? $params->category : null;
            $url = (!empty($params->url)) ? $params->url : null;
        }

        if(!empty($title) && !empty($description) && !empty($category) && !empty($url)){

            $image = new Image();

            $image->setTitle($title);
            $image->setDescription($description);
            $image->setCategory($category);
            $image->setUrl($url);
            
            //Guardamos la imagen
            $em = $this->getDoctrine()->getManager();
            $em->persist($image);
            $em->flush();

            //Datos a devolver
            $data =[
                'status' => 'success',
                'code'   =>    200,
                'message'=>'La imagen se creo correctamete',
                'json' => $params,
            ];

        }else{
            $data =[
                'status' => 'error',
                'code'   =>    400,
                'message'=>'No se creo la imagen',
                'json' => $params,
            ];
        }

        //Hacer respuesta json
        return new JsonResponse($data); 
    }

    public function deleteImage(Request $request, $id = null){
        //Recoger los datos por post
        $json = $request->get('id',null);

        //Decodificar el json
        $params = json_decode($json);

        $doctrine = $this->getDoctrine();
        $em = $doctrine->getManager();
        
        $image = $doctrine->getRepository(Image::Class)-> findOneBy(['idimage'=>$params]);

        //Comprobamos si ha llegado la imagen
        if($image && is_object($image)){
            //Eliminamos el video de la BD
            $em->remove($image);
            //Persistir los datos en la BD
            $em->flush();

            //Datos a devolver
            $data =[
                'status' => 'success',
                'code'   =>    200,
                'message'=>'La imagen se borro exitosamente',
            ];
        }else{
            $data =[
                'status' => 'error',
                'code'   =>    400,
                'message'=>'La imagen no se borro o no existe',
            ];
        }

        //Hacer respuesta json
        return new JsonResponse($data); 
    }

    public function putRepoOssian(){

        //Direccion del repositorio remoto
        $direccion = "http://internal.ossian.tech/api/Sample";  

        //Recojo el json
        $json = file_get_contents($direccion);
        $datos = json_decode($json,true);
      
        //var_dump ($datos["result"][0]);
      
        $json = json_encode($datos["result"]); // GENERA EL JSON CON LOS DATOS OBTENIDOS
        
        if($json){
            //Añado las imagenes a mi BD
            foreach($datos["result"] as $ima){
                $image = new Image();

                $image->setTitle($ima["title"]);
                $image->setDescription($ima["description"]);
                $image->setCategory($ima["category"]);
                $image->setUrl($ima["url"]);

                //Guardamos la imagen
                $em = $this->getDoctrine()->getManager();
                $em->persist($image);
                $em->flush();
            }

            //Datos a devolver
            $data =[
                    'status' => 'success',
                    'code'   =>    200,
                    'message'=>'LAs imagenes se cargaron con exito',
                ];
        }else{
            $data =[
                'status' => 'error',
                'code'   =>    400,
                'message'=>'La imagen no se cargaron',
            ];
        }
        //Hacer respuesta json
        return new JsonResponse($data); 
    }

    public function editImage(Request $request, $id = null){

        //Recojo la imagen de la BD
        $image = $this->getDoctrine()->getRepository(Image::class)->findOneBy(['idimage'=>$id]);

        $json = $request->get('json',null);
        $params = json_decode($json);


        $doctrine = $this->getDoctrine();
        $em = $doctrine->getManager();

        //Compraobamos y validamos que no llegue vacio
        if($json != null){
            $title = (!empty($params->title)) ? $params->title : null;
            $description = (!empty($params->description)) ? $params->description : null;
            $category = (!empty($params->category)) ? $params->category : null;
            $url = (!empty($params->url)) ? $params->url : null;
        }

        if($image && is_object($image)){

            $image->setTitle($title);
            $image->setDescription($description);
            $image->setCategory($category);
            $image->setUrl($url);

            $em->persist($image);
            $em->flush();

            //Datos a devolver
            $data =[
                'status' => 'success',
                'code'   =>    200,
                'message'=>'La imagen se edito exitosamente',
            ];
        }else{
            $data =[
                'status' => 'error',
                'code'   =>    400,
                'message'=>'La imagen no se edito',
            ];
        }

        //Hacer respuesta json
        return new JsonResponse($data); 
    }
}
