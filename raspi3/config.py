api_id="IDENTIFICADOR DE TU API GATEWAY" #Identificador de la API Gateway

region="REGION DE DESPLIEGUE DE LA API" #Region en la que la API Gateway está desplegada

stage_name="dev/workers/identify" #Nombre del método de la API a invocar

#URL final de la API a invocar
api_url = "http://"+api_id+".execute-api."+region+".amazonaws.com/"+stage_name+"/" 

image_path = '/home/pi/Desktop/temp.png' #Ruta en la que se guardará la imagen capturada hasta ser borrada