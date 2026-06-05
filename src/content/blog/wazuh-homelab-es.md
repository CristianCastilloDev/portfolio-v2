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
