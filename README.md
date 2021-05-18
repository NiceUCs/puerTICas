![PuerTICas](https://lh3.googleusercontent.com/pw/ACtC-3drcCUYAtW-0hwanqZPzHMmPhDPlXvmjQ95P4zE7Tj9BYhqMfvRpOnXPMsNxLTVkmA7sitK9dUWXvRWnApaKFDNvEs8RD-UGaoGhdkfbJnmNy_LH7bFxgmuqxXL9fxnZc6_i_xP2iEnN4EzWHkd_E9m=w379-h210-no?authuser=0)
<img src="https://img.shields.io/static/v1?label=team&message=puerTICas&color=blueviolet"> 
<img src="https://img.shields.io/static/v1?label=subject&message=PyGiTIC&color=orange"> 
<img src="https://img.shields.io/static/v1?label=python&message=3.8&color=blue">
## Descripción 📢

_PuerTICas es un sistema de gestión de aceso a un edificio inteligente basado en autorización por reconocimiento facial. Mediante una cámara alojada en la entrada se permite o deniega el acceso a los trabajadores del edificio. Un usuario administrador es el encargado de dar de alta a través del cliente web a los trabajadores junto con un foto que permita identificarles. Además, el administrador puede controlar y monitorear el acceso al eficio también a través del cliente web._
_La aplicación ha sido desarrollada utilizando los servicios Cloud de AWS, bajo el paradigma de IaaC (Infraestructura como código), ofreciendo alta escalabilidad y facilitando los despliegues de la infraestructura._

## Estructura de directorios 📋
- ```/docs```: contiene toda la documentación del proyecto
    - ```/actas```: contiene las actas de reuniones
    - ```/design```: contiene los documentos de diseño de componentes, arquitectura e interacción
- ```/aws```: arquitectura de AWS utilizando el framework Serverless
    -   ```/lambdas```: código en Python de las lambdas
    -   ```/postman```: configuración del API exportada para Postman
    -   ```/seeds```: datos de prueba para la base de datos
    -   ```/tools```: código auxiliar
    -   ```serverless.yml```: fichero YML que define la arquitectura a desplegar en AWS
    -   ```serverless.md```: guía para ejecutar en local la arquitectura serverless
- ```/client-web```: contiene la documentación y código del cliente web  (Angular)
- ```/raspi3```: contiene el código e instrucciones para el cliente de la Raspberry Pi 3

## Arquitectura 📋

![cliente](https://lh3.googleusercontent.com/pw/ACtC-3eNCX_Fdw6Ze4wxEQnizDIjSZNJIN8A2jUYOMexeyDvuNUI9dQIoVYlqMRM7O3jNYt2TJ1g90ouJpmo-j7zsflAmH9SB4PenApY_nKV6Wn7LC-3eS9OWiuO5OpfAVkfziu36eS1GcoCv03y6Yqaqkn5=w749-h920-no?authuser=0)

## Autores ✒️
- _Iván Larios López_  - [_Linkedin_](https://www.linkedin.com/in/ivan-larios-lopez/?originalSubdomain=es)
- _José Ramón Martínez Riveiro_  - [_Linkedin_](https://www.linkedin.com/in/josermartinez/?originalSubdomain=es)
- _Carolina Ordoño López_ - [_Linkedin_](https://www.linkedin.com/in/carolina-ordoño-lópez-b4457bb1/?originalSubdomain=es)
- _Víctor Pérez Piqueras_  - [_Linkedin_](https://www.linkedin.com/in/víctor-pérez-piqueras/?originalSubdomain=es)

## Licencia 📄

Este proyecto está bajo la Licencia [Creative Commons (BY-NC-ND)](https://creativecommons.org/licenses/by-nc-nd/4.0/)

## Demo

### Cliente Web
![cliente](https://lh3.googleusercontent.com/pw/ACtC-3e7Q5DbzQVCUI6oKg6REdfVoO2q920vNPy4OxiC816QcoC4Lu1F9qt7HMnK-1LDOPCkgtIDnezdFjB-EYiqBIosIgvuT5OwMhI8ev_vghwZdSgzm-oOe-r88d3PZ92b7RCEsCJS-3u1IWmxSY46_Ylp=w581-h685-no?authuser=0)

![cliente](https://lh3.googleusercontent.com/pw/ACtC-3fniprTBhWjMw--qj1QfFjIzWb0jq2wuCS2GtZ65XPQNKGgd5G6c-64zwgiRHHAfkgL-B61M0yj2URs_pvvTwwYHTJACbdbKjIneGnyKryx2g0GEYUOlHgcNNXeUFURFX5nOmeJ2STKRAEhmLni1PHK=w581-h681-no?authuser=0)

![cliente](https://lh3.googleusercontent.com/pw/ACtC-3ffbnOW7Et-QDsC3zaZlAijcfIbfdN2mCO6K81V2_psZjJqokIBmDTmBzkCGp3TtPZKCZIMn7la8ZIbxAkuSQjkJsYq792Y5uJepG7Pn1mMPCJVdmHUwhILsWisrooDyd3ETJXj5W4QwA7xk3waSVR1=w579-h681-no?authuser=0)

![cliente](https://lh3.googleusercontent.com/pw/ACtC-3dYooN7W6JwgrOFMuzqeny1C0lstu5YJYqr2P2iPzT-6f-3BCIN09uu67maE-PtlF5IYyBfkimD3uf_1FZPtb21DobAbOXWUvoQSZ9oFxhuMDxiS6aQJuk7-m7roB4DeAFscGbxmernjHcwxhyfwhd4=w580-h681-no?authuser=0)
