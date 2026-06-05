---
title: "Monitorización Activa: Desplegando Wazuh SIEM en mi HomeLab"
description: "Poniendo en práctica conceptos de Blue Team. Documento cómo instalé Wazuh en mi entorno Proxmox para recolectar eventos, analizar vulnerabilidades y prepararme para la certificación CompTIA Security+ (SY0-701)."
pubDate: 2026-06-04
category: "CIBERSEGURIDAD"
badge: "LAB_REPORT // #002"
coverImage: "/images/wazuh_homelab_cover.png"
downloads: 0
views: 0
tags: ["blue-team", "wazuh", "siem", "comptia", "proxmox"]
difficulty: "INTERMEDIO"
lang: "es"
---

Tener un servidor propio con decenas de contenedores y servicios (como mi instancia de Docker, Jellyfin o Vaultwarden) es genial, pero también abre una pregunta fundamental: **¿Qué está pasando realmente dentro de mi red?**

Como mi desarrollo profesional está enfocado en el área de seguridad defensiva (**Blue Team**) y me encuentro en la ruta hacia mi certificación **CompTIA Security+ (SY0-701)**, necesitaba visibilidad total. Por eso, el siguiente paso lógico en mi HomeLab fue desplegar un SIEM (Gestor de Eventos e Información de Seguridad). La herramienta elegida: **Wazuh**.

## 1. ¿Qué es Wazuh y por qué lo elegí?

Wazuh es una plataforma open-source de seguridad unificada que funciona como XDR (Detección y Respuesta Extendidas) y SIEM. En palabras sencillas, actúa como un sistema de vigilancia centralizado:
*   Recolecta los registros (logs) de todos los servidores y contenedores.
*   Audita las configuraciones en busca de malas prácticas.
*   Detecta vulnerabilidades conocidas (CVEs) en el software instalado.
*   Lanza alertas en tiempo real si detecta anomalías, como intentos de inicio de sesión fallidos por fuerza bruta.

Es la misma tecnología que se utiliza en un Centro de Operaciones de Seguridad (SOC) real, por lo que es la práctica perfecta.

---

## 2. Arquitectura del Despliegue en Proxmox

Dado que ya tengo mi infraestructura virtualizada con Proxmox en mi Ryzen 7 5700X, la topología que armé fue la siguiente:

1.  **Wazuh Server (Central):** Instalé los componentes centrales (Indexer, Server y Dashboard) en una máquina virtual dedicada dentro de Proxmox. Le asigné 4 núcleos y 8 GB de RAM para que el procesamiento y la indexación de los logs sean fluidos.
2.  **Wazuh Agents (Los vigilantes):** Instalé pequeños programas (agentes) en los diferentes nodos de mi red. El primero fue directo al contenedor LXC (ID 100) donde corre todo mi entorno de Docker.

### Instalación Rápida (Quickstart)

Levantar el servidor central hoy en día es increíblemente eficiente gracias al script de instalación desatendida. Básicamente, en una instalación limpia de Ubuntu/Debian dentro de Proxmox, ejecuté:

```bash
curl -sO https://packages.wazuh.com/4.x/wazuh-install.sh && sudo bash ./wazuh-install.sh -a
```

Una vez terminado el proceso, el script me arrojó mis credenciales de administrador y pude acceder a la interfaz web (Dashboard) a través de mi navegador web local.

## 3. Desplegando mi primer Agente y Cazando Alertas

Con el panel central funcionando, el verdadero valor llega cuando conectas tus sistemas. Desde el propio panel de Wazuh, generé un comando de instalación para mi servidor Docker.

Me conecté por SSH a mi contenedor de Docker y ejecuté el comando generado. En cuestión de segundos, mi servidor apareció como "Activo" en el panel principal. Inmediatamente, Wazuh comenzó a escanear el sistema y a enviarme los primeros reportes.

### ¿Qué descubrí el primer día?
*   **Auditoría de Root:** Wazuh detectó y me alertó cada vez que utilicé el comando `sudo` para realizar mantenimientos en Docker.
*   **Análisis de Vulnerabilidades:** Realizó un inventario de los paquetes instalados en el sistema operativo del contenedor y me generó un listado de dependencias desactualizadas que debían parchearse.
*   **Monitorización SSH:** Configuró alertas críticas por si algún equipo externo intentaba hacer fuerza bruta sobre el puerto 22.

> [!TIP]
> ### Visualización de Alertas y Eventos
> A continuación se muestra una captura en tiempo real de mi panel de Wazuh, donde se puede apreciar el estado de los agentes activos y el volumen de eventos de seguridad recolectados en las últimas 24 horas:
> ![Wazuh Dashboard](/images/wazuh_dashboard.png)

## Conclusión y Siguientes Pasos

Implementar Wazuh transforma un HomeLab estático en un entorno de seguridad vivo. Pasas de simplemente "alojar servicios" a gestionar y defender una infraestructura. Estudiar la teoría sobre la monitorización activa para el Security+ es útil, pero auditar tus propios contenedores en tiempo real te da un conocimiento técnico que no se olvida.

El siguiente objetivo en mi ruta de Blue Team será conectar este SIEM a herramientas de automatización. Por ejemplo, me gustaría configurar Wazuh para que, si detecta múltiples intentos de inicio de sesión fallidos, bloquee automáticamente la IP del atacante mediante reglas de firewall en Proxmox o notifique directamente a un bot de Telegram.

