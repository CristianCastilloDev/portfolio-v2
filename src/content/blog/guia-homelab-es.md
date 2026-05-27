---
title: "Montando mi primer HomeLab"
description: "Todo administrador de sistemas o entusiasta de la ciberseguridad necesita un laboratorio de pruebas. En este post documento cómo levanté mi HomeLab utilizando Proxmox VE, Docker y servicios clave."
pubDate: 2026-05-20
category: "INFRAESTRUCTURA"
badge: "LAB_REPORT // #001"
coverImage: "/images/homelab_cover.png"
downloads: 1204
views: 9804
tags: ["infraestructura", "docker", "tutorial", "servidores"]
difficulty: "PRINCIPIANTE"
lang: "es"
---

Un HomeLab (o laboratorio doméstico) es el mayor aliado de cualquier profesional o entusiasta de la tecnología. En este post, antes de sumergirnos en la configuración técnica, quiero explicarte qué es exactamente y por qué deberías empezar a construir el tuyo hoy mismo.

## ¿Qué es un HomeLab?

Un **HomeLab** es un entorno de servidores y equipos de red que configuras y administras en tu propio hogar. Puede ir desde una antigua laptop en desuso o un mini-PC silencioso, hasta un rack de servidores de nivel empresarial. Es un espacio libre de riesgos (*sandbox*) diseñado específicamente para experimentar, alojar servicios útiles y aprender haciendo. 

A diferencia de la nube pública (donde cada error cuesta dinero), en tu HomeLab puedes romper configuraciones de red, bastionar sistemas operativos y reconstruir todo de cero sin pagar facturas de terceros ni comprometer datos corporativos reales.

---

## Principales Beneficios de tener tu propio laboratorio

*   **Aprendizaje y Práctica Real:** La teoría detrás de certificaciones como **CompTIA Security+**, **CCNA** o **Docker** se asimila mucho mejor cuando eres tú quien configura las subredes, levanta contenedores o audita los puertos abiertos.
*   **Privacidad y Soberanía de Datos:** Alojas tus propios archivos, copias de seguridad y servicios multimedia (como Jellyfin), eliminando la dependencia de corporaciones de almacenamiento en la nube.
*   **Entorno Seguro para Ciberseguridad (Blue Team):** Puedes simular ataques controlados, analizar tráfico malicioso local con Wireshark, recolectar registros y configurar sistemas de monitorización activa de eventos (SIEM).
*   **Imán de Oportunidades Profesionales:** Mostrar e ilustrar un HomeLab documentado en tu portfolio le demuestra a un reclutador que tienes iniciativa propia, pasión activa y verdadera experiencia de configuración práctica en hardware real.

---

## Mi Setup Inicial y Hardware

Todo administrador de sistemas o entusiasta de la ciberseguridad necesita un punto de partida. En mi caso, decidí levantar mi HomeLab aprovechando un potente procesador **Ryzen 7 5700X** y una **RTX 4060**, optimizando la asignación de núcleos y RAM para correr múltiples servicios de red, multimedia y seguridad de forma simultánea.

## 1. El Hipervisor Base: Proxmox VE

Para exprimir al máximo el hardware de mi **Ryzen 7 5700X**, decidí no instalar un sistema operativo convencional de escritorio. En su lugar, instalé **Proxmox VE (Virtual Environment)** directamente en el hardware (*bare-metal*).

Proxmox actúa como mi hipervisor de Tipo 1, permitiéndome dividir mi procesador y memoria RAM en múltiples máquinas virtuales (VMs) y contenedores Linux (LXC) totalmente aislados. Además, configuré el almacenamiento bajo **ZFS (Zettabyte File System)** (`local-zfs`) para garantizar alta velocidad de lectura/escritura, tolerancia a fallos y la capacidad de realizar instantáneas (*snapshots*) rápidas de cualquier servicio antes de realizar configuraciones complejas.

Aquí puedes ver cómo luce el panel de control de mi nodo con los contenedores activos:

![Consola de Administración de Proxmox VE con mis contenedores LXC activos](/images/proxmox_services.png)

---

## 2. Servicios Desplegados y Arquitectura

Dentro de mi panel de administración de Proxmox, he estructurado una serie de contenedores y máquinas dedicadas para diferentes propósitos (productividad, seguridad, desarrollo, IA y multimedia):

### 🐳 ID 100 // Servidor Docker
*   **Propósito:** Una máquina dedicada a correr el motor **Docker** y **Portainer**.
*   **Servicios Corriendo:** Aquí orquesto servicios adicionales mediante contenedores ligeros, incluyendo mi servidor multimedia **Jellyfin** (para streaming local libre de rastreadores) y el stack de automatización multimedia (**Sonarr, Radarr y Lidarr**).

### 🌐 ID 101 // Nginx UI (Proxy Inverso)
*   **Propósito:** Administrar mi puerta de enlace web y el tráfico interno.
*   **Utilidad:** Proporciona una interfaz gráfica limpia para Nginx, permitiéndome asignar nombres de dominio locales legibles a mis servicios y gestionar certificados SSL/TLS para cifrar las conexiones de forma segura dentro de mi red local.

### 🔑 ID 102 // Vaultwarden
*   **Propósito:** Gestor de contraseñas self-hosted compatible con Bitwarden escrito en Rust.
*   **Utilidad:** Almacenamiento local fuertemente cifrado de mis credenciales y llaves de acceso. Mis contraseñas nunca salen de mi servidor doméstico, garantizando soberanía total sobre mi identidad digital.

### 🤖 ID 103 & 106 // Ollama (IA Local y Privada)
*   **Propósito:** Servidor offline de Inteligencia Artificial para ejecutar LLMs de forma segura.
*   **Utilidad:** Utilizo Ollama para correr modelos abiertos (como Llama 3 o Phi-3) de forma 100% interna sin enviar datos a APIs externas, aprovechando los núcleos del procesador Ryzen.

### 📈 ID 104 // Uptime Kuma (Monitorización de Estado)
*   **Propósito:** Panel de control de disponibilidad.
*   **Utilidad:** Realiza pings constantes y comprobaciones HTTP a todos mis servidores. Si Vaultwarden o Docker sufren alguna caída, Uptime Kuma me avisa al instante con alertas en tiempo real.

---

## 3. Seguridad y Monitorización Activa (Blue Team)

Como mi enfoque profesional está en la ciberseguridad defensiva, el HomeLab no estaría completo sin herramientas de seguridad. Fuera de las utilidades de productividad, he integrado un servidor dedicado con **Wazuh SIEM**. 

Este sistema actúa como recolector central de eventos de seguridad y detección activa de intrusiones (HIDS). Wazuh audita constantemente los registros de mis contenedores Proxmox, analiza vulnerabilidades y me alerta de cualquier anomalía de acceso o ejecución no autorizada en mis equipos de prueba.

> ### Siguientes pasos
> 
> El ecosistema sigue creciendo. Mis próximos objetivos incluyen perfeccionar las reglas de firewall perimetral en Proxmox, aislar mis servicios mediante VLANs y documentar laboratorios prácticos alineados a la certificación CompTIA Security+.
