---
title: "Guía definitiva: Cómo instalar Proxmox VE desde cero"
description: "Descubre qué es un hipervisor de Tipo 1 y aprende paso a paso cómo instalar Proxmox VE en tu propio hardware. Exploraremos los recursos mínimos necesarios y por qué la arquitectura de procesadores como el Ryzen 7 es ideal para virtualización."
pubDate: 2026-05-20
category: "VIRTUALIZACION"
badge: "TUTORIAL // #001"
coverImage: "/images/proxmox_tutorial_cover.png"
downloads: 0
views: 0
tags: ["tutorial", "virtualizacion", "proxmox", "homelab", "infraestructura"]
difficulty: "PRINCIPIANTE"
lang: "es"
---

Si leíste mi post anterior sobre la creación de mi primer HomeLab, ya sabes que el corazón de toda esa infraestructura es **Proxmox VE**. Antes de empezar a levantar contenedores y servidores multimedia, necesitas una base sólida.

En este tutorial, que sirve como "precuela", te explicaré exactamente qué es Proxmox, qué hardware necesitas para correrlo decentemente y cómo instalarlo desde cero.

## 1. ¿Qué es un Hipervisor de Tipo 1?

Cuando hablamos de virtualización, solemos pensar en programas como VirtualBox o VMware Workstation. Esos son hipervisores de **Tipo 2**, es decir, aplicaciones que se instalan *sobre* tu sistema operativo habitual (como Windows o macOS). Consumen muchos recursos porque el sistema anfitrión ya está usando RAM y CPU solo para mantenerse encendido.

Proxmox VE es un hipervisor de **Tipo 1 (Bare-Metal)**. Esto significa que **Proxmox es el sistema operativo**. Se instala directamente sobre el hardware de tu máquina, eliminando intermediarios. El resultado es que casi el 100% de la potencia de tu procesador y memoria RAM está disponible exclusivamente para tus máquinas virtuales (VMs) y contenedores (LXC), logrando un rendimiento de nivel empresarial.

---

## 2. Requisitos de Hardware: ¿Qué necesitas realmente?

Una de las grandes ventajas de Proxmox es que puede correr en casi cualquier cosa, desde una laptop vieja hasta un servidor de rack, pero la experiencia dependerá de tus recursos.

### Requisitos Mínimos (Para pruebas o servicios muy ligeros)
*   **CPU:** Procesador de 64 bits con soporte de virtualización (Intel VT-x o AMD-V).
*   **RAM:** 2 GB (aunque el sistema base consume alrededor de 1 GB, te quedará muy poco para virtualizar).
*   **Almacenamiento:** Disco duro de 32 GB.

### Hardware Recomendado (El "Sweet Spot" para un HomeLab)
Para poder levantar múltiples servicios (Docker, SIEM, automatización) sin cuellos de botella, la arquitectura de procesadores multi-núcleo es tu mejor aliada. 

En mi caso, utilizo un **Ryzen 7 5700X**. La arquitectura de AMD, con sus 8 núcleos y 16 hilos de procesamiento, es ideal para la virtualización. Proxmox te permite asignar estos "hilos" virtuales a diferentes contenedores, permitiendo que varios servicios pesados operen en paralelo sin saturar el sistema. Acompañado de **16 GB o 32 GB de RAM** y almacenamiento SSD/NVMe (con soporte para ZFS), tienes un servidor que te durará años.

---

## 3. Paso a Paso: Instalación desde cero

### Paso 3.1: Preparar la imagen de instalación (USB Booteable)
1.  Ve a la [página oficial de descargas de Proxmox](https://www.proxmox.com/en/downloads) y descarga la última imagen ISO de Proxmox VE.
2.  Descarga un software para flashear la ISO, como **Rufus** (Windows) o **BalenaEtcher** (Multiplataforma).
3.  Conecta una memoria USB de al menos 8GB.
4.  Abre Rufus/Etcher, selecciona la ISO descargada, elige tu USB y dale a flashear. *Nota: Esto borrará todos los datos de tu USB.*

### Paso 3.2: Configuración en la BIOS
Antes de iniciar desde el USB, necesitas asegurarte de que tu placa base permita la virtualización. En una motherboard como la B450 Aorus Elite V2, los pasos son:
1.  Enciende tu PC y presiona repetidamente `DEL` o `F2` para entrar a la BIOS.
2.  Busca la opción **SVM Mode** (Secure Virtual Machine) en la configuración del procesador avanzado (CPU Features) y ponla en **Enabled**. (Si usas Intel, busca Intel Virtualization Technology o VT-x).
3.  Ve a la pestaña de "Boot", selecciona tu memoria USB como la opción número 1 de arranque, guarda los cambios y reinicia.

### Paso 3.3: El Instalador de Proxmox
1.  **Pantalla de bienvenida:** Selecciona la primera opción *Install Proxmox VE*.
2.  **Aceptar los términos (EULA):** Léelos (o simplemente dales a "I agree").
3.  **Selección de disco duro:** Aquí elegirás dónde se instalará. Si tienes múltiples discos y quieres usar ZFS (muy recomendado para redundancia y rendimiento), puedes hacer clic en "Options" para configurarlo. Si solo tienes un disco, déjalo en ext4.
4.  **Ubicación y Zona horaria:** Configura tu país y zona horaria (esto es vital para los logs de seguridad y certificados).
5.  **Contraseña de Root:** Crea una contraseña fuerte y añade tu correo electrónico (recibirás alertas del sistema aquí).
6.  **Configuración de Red:** Proxmox necesita una IP estática para que siempre puedas encontrarlo en tu red. 
    *   **Hostname:** El nombre de tu nodo (ej. `pve.local`).
    *   **IP Address:** Asigna una IP fija que esté fuera del rango DHCP de tu router (ej. `192.168.1.100`).
    *   **Gateway / DNS:** Normalmente es la IP de tu módem/router.

Revisa el resumen final y presiona "Install". Una vez terminado, retira el USB y reinicia.

---

## 4. Primer acceso y configuraciones iniciales

Cuando tu equipo reinicie, ya no verás una interfaz gráfica en ese monitor, sino una consola de texto negro que te indica una dirección web. El servidor ya está listo, y a partir de ahora, lo administrarás remotamente desde tu computadora principal.

1.  Abre un navegador web y escribe la IP que configuraste, asegurándote de usar `https://` y el puerto `:8006`.
    *   *Ejemplo: `https://192.168.1.100:8006`*
2.  Tu navegador te dará una advertencia de seguridad (esto es normal, porque Proxmox genera un certificado auto-firmado). Dale a "Configuración Avanzada" y "Continuar de todos modos".
3.  En la pantalla de inicio de sesión:
    *   **Usuario:** `root`
    *   **Contraseña:** La que configuraste en el paso de instalación.
    *   **Realm:** Déjalo en `Linux PAM standard authentication`.

¡Listo! Acabas de acceder al centro de mando de tu nueva infraestructura. En la columna izquierda verás tu nodo, y en la parte superior derecha los botones para crear tus primeras Máquinas Virtuales o Contenedores LXC.

Este es solo el comienzo. Con Proxmox instalado, estás listo para seguir el ritmo de mis reportes de laboratorio y empezar a construir tu propio entorno de desarrollo y monitorización de seguridad.
