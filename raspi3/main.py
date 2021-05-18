# coding=utf-8

from picamera import PiCamera
from time import sleep
from sense_hat import SenseHat
import base64
import config as cfg
import json
import ledIcons as icon
import os
import requests
import threading as th

#Inicializacion de componentes

camera = PiCamera() #Iniciamos API de la cámara
sense = SenseHat() #Iniciamos API del Sense HAT
camera.rotation = 180 #Rotamos la cámara 180 grados
sense.flip_v() #Rotamos la pantalla 180 grados verticalmente.
sense.low_light = True #Ponemos el modo de bajo brillo.

exit_thread = th.Event() #Declaramos el evento para finalizar hilos

# Función para el hilo que gestiona la pantalla de espera
def waiting():
  i=0
  while True: #Se muestra la pantalla de carga en bucle infinito
    i=i%8
    sense.set_pixels(icon.waiting[i])#Muestra en pantalla el fotograma correspondiente
    i+=1
    if exit_thread.wait(timeout=0.25):#Si el evento ha cambiado, termina el bucle y finaliza el hilo
      break;

# Función para el hilo que geestiona la pantalla de espera a la API
def callingAPI():
  i=0
  while True: #Se muestra la pantalla de carga en bucle infinito
    i=i%8
    sense.set_pixels(icon.led_amongus[i])#Muestra en pantalla el fotograma correspondiente
    i+=1
    if exit_thread.wait(timeout=0.25):#Si el evento ha cambiado, termina el bucle y finaliza el hilo
      break;

#Bucle infinito del programa principal
while True:
  #Iniciamos hilo para pantalla de espera
  thread = th.Thread(target=waiting)
  exit_thread = th.Event()
  thread.start()
  #Bloqueo hasta que se pulsa o mueve el joystick
  event = sense.stick.wait_for_event(emptybuffer=True)
  #Quitamos pantalla de espera
  exit_thread.set()
  
  #Damos tres segundos de preparación
  for i in range(3,0,-1):
  	sense.show_letter(str(i))
  	sleep(1)
  sense.show_letter("0")
  sleep(0.5)
  #Ponemos el led blanco a modo de flash
  sense.set_pixels(icon.led_blanco)
  #Tomamos la imagen
  camera.capture(cfg.image_path)
  #Ponemos el modo de espera mientras llamamos a la API
  thread = th.Thread(target=callingAPI)
  exit_thread = th.Event()
  thread.start()
  #Llamada a la API
  with open(cfg.image_path, "rb") as image_file:
    #Codificamos imagen como un string de base 64
    encoded_string = base64.b64encode(image_file.read())
    try:
    #Realizamos el POST a la API
      response=requests.post(
              cfg.api_url,
              json={"image":encoded_string.decode()}
              )
    except:
      #En caso de error en la petición se avisa en la consola de Raspberry Pi
      print("Error en la peticion: Revisar logs en API Gateway")
      #Terminamos el hilo de pantalla de carga
      exit_thread.set()
      #Mostramos por pantalla el mensaje de error durante 5 segundos
      sense.set_pixels(icon.led_error)
      sleep(5)
      #Borramos la imagen capturada
      os.remove(cfg.image_path)
      #Reiniciamos el bucle
      continue
  #Borramos la imagen que ya ha sido enviada
  os.remove(cfg.image_path)
  #Quitamos la pantalla de carga
  exit_thread.set()
  try:
    #Comprobamos el campo authorized del JSON recibido como respuesta
    authorized = json.loads(response.content)[unicode("Authorized")]
    #Si el campo authorized es True mostramos por pantalla el acceso correcto
    if(authorized==True):
        sense.set_pixels(icon.led_correcto)
    #Si el campo authorized es False mostramos por pantalla el acceso incorrecto 
    elif(authorized==False):
        sense.set_pixels(icon.led_incorrecto)
    else:
    #Si el campo authorized no es True ni False mostramos por pantalla el error de API
        sense.set_pixels(icon.led_error)
  except:
    #Si se produce un error cargando el contenido de la respuesta
    #de la API mostramos por pantalla error de API
        sense.set_pixels(icon.led_error)
  sleep(5)
