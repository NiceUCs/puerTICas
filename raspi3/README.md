# PuerTICas - Raspberry Pi 3
<img src="https://img.shields.io/static/v1?label=team&message=puerTICas&color=blueviolet"> <img src="https://img.shields.io/static/v1?label=subject&message=PyGiTIC&color=orange"> <img src="https://img.shields.io/static/v1?label=python&message=2.7&color=blue">

Requisitos ejecutar en Raspberry Pi 3 Model B:
- Periféricos
    - Periférico Raspberry Pi Camera v2 NoIR conectad en puerto CSI
    - Periférico Raspberry Pi Sense HAT conectado en puerto GPIO
- Librerías
    - picamera 
    - sense_hat (```sudo apt install sense-hat``` en <a href="https://www.raspberrypi.org/software/operating-systems/">Raspbian</a> y bus I2C habilitado)

Para ejecutar el script, primero se debe rellenar el fichero config.py, que se debe encontrar en el mismo directorio que los ficheros main.py y ledIcons.py. Una vez rellenado, ejecutar el fichero main con:

`python main.py`

## Instalación
Instalar librerías (en <a href="https://www.raspberrypi.org/software/operating-systems/">Raspbian</a>):
- picamera 

```sudo apt-get install python-picamera``` 

- sense_hat
    - Habilitar bus I2C (<a href="https://www.raspberrypi-spy.co.uk/2014/11/enabling-the-i2c-interface-on-the-raspberry-pi/">Tutorial</a>)
    - Instalar librería:

```sudo apt-get install sense-hat```

    

