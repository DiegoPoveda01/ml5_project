ml5 Project – Detección de Posturas con Registro de Usuarios
Este es un proyecto en desarrollo que integra ml5.js con p5.js para detectar posturas corporales en tiempo real utilizando el modelo MoveNet. Antes de activar la cámara, los usuarios deben ingresar su información personal, la cual se almacena en una hoja de cálculo conectada vía SheetDB.

Estado del Proyecto
En progreso.
Las funcionalidades básicas están implementadas, pero se seguirán incorporando mejoras visuales, analíticas de movimiento y validaciones adicionales.

Características principales
Detección de posturas en tiempo real usando la cámara.

Formulario de ingreso de usuario: nombre, edad, RUT (con formato automático) y ejercicio.

Validación del formulario (edad válida, RUT chileno correcto).

Envío de los datos a una hoja de cálculo de Google Sheets a través de una API externa.

Tecnologías
ml5.js

p5.js

HTML + CSS + JavaScript

SheetDB para integración con Google Sheets