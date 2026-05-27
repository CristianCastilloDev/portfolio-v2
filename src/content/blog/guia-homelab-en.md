---
title: "Setting Up My First HomeLab"
description: "Every sysadmin or security enthusiast needs a sandbox lab. In this post, I document how I built my HomeLab using Proxmox VE, Docker, and core virtualized services."
pubDate: 2026-05-20
category: "INFRASTRUCTURE"
badge: "LAB_REPORT // #001"
coverImage: "/images/homelab_cover.png"
downloads: 1204
views: 9804
tags: ["infrastructure", "docker", "tutorial", "servers"]
difficulty: "BEGINNER"
lang: "en"
---

A HomeLab (or home laboratory) is the best ally for any IT professional or tech enthusiast. In this post, before diving into the deep technical configuration, I want to explain exactly what it is and why you should start building yours today.

## What is a HomeLab?

A **HomeLab** is an environment of servers and networking equipment that you configure and manage inside your own home. It can range from an old decommissioned laptop or a silent mini-PC, to a full-scale enterprise server rack. It is a risk-free **sandbox space** designed specifically to experiment, host useful services, and learn by doing.

Unlike public cloud services (where every error costs money), in your HomeLab you can break network configurations, harden operating systems, and rebuild everything from scratch without paying surprise invoices or compromising real company data.

---

## Key Benefits of Having Your Own Laboratory

*   **Hands-on & Real Practice:** The theory behind certifications such as **CompTIA Security+**, **CCNA**, or **Docker** is absorbed much faster when you are the one configuring subnets, spinning up containers, or auditing open ports.
*   **Privacy & Data Sovereignty:** You host your own files, backups, and media servers (like Jellyfin), removing dependencies on cloud storage giants.
*   **Safe Sandbox for Cybersecurity (Blue Team):** You can simulate controlled attacks, analyze local malicious traffic with Wireshark, collect system logs, and set up active security monitoring (SIEM) systems.
*   **A Magnet for Job Opportunities:** Presenting a documented HomeLab in your portfolio demonstrates to a recruiter that you have initiative, active passion, and real configuration experience on physical hardware.

---

## My Initial Setup & Hardware

Every system administrator or cybersecurity enthusiast needs a starting point. In my case, I decided to build my HomeLab leveraging a powerful **Ryzen 7 5700X** processor and an **RTX 4060**, optimizing core and RAM allocation to run multiple network, media, and security services simultaneously.

## 1. The Core Hypervisor: Proxmox VE

To squeeze the absolute maximum performance out of my **Ryzen 7 5700X**, I decided not to install a conventional desktop operating system. Instead, I installed **Proxmox VE (Virtual Environment)** directly on bare-metal.

Proxmox acts as my Type 1 hypervisor, allowing me to divide my physical processor cores and RAM into multiple isolated Virtual Machines (VMs) and lightweight Linux Containers (LXC). Furthermore, I configured storage under **ZFS (Zettabyte File System)** (`local-zfs`) to guarantee high read/write speeds, fault tolerance, and the ability to take quick snapshots before making complex configuration changes.

Here is a look at my Proxmox administration dashboard with active nodes:

![Proxmox VE Admin Console showing active LXC containers](/images/proxmox_services.png)

---

## 2. Deployed Services & Architecture

Within my Proxmox administration panel, I structured a series of dedicated containers and virtual machines for different purposes (productivity, security, development, AI, and multimedia):

### 🐳 ID 100 // Docker Server
*   **Purpose:** A dedicated VM optimized to run the **Docker** engine and **Portainer**.
*   **Running Services:** Here I orchestrate services via lightweight containers, including my **Jellyfin** media server (for local tracker-free streaming) and my media automation stack (**Sonarr, Radarr, and Lidarr**).

### 🌐 ID 101 // Nginx UI (Reverse Proxy)
*   **Purpose:** Manage my local web gateway and internal routing.
*   **Utility:** Provides a clean graphical user interface for Nginx, allowing me to assign friendly local domain names to my services and manage SSL/TLS certificates to securely encrypt traffic inside my home network.

### 🔑 ID 102 // Vaultwarden
*   **Purpose:** Self-hosted password manager server compatible with Bitwarden, written in Rust.
*   **Utility:** Secure, highly encrypted local storage of my credentials and access keys. My passwords never leave my home server, ensuring full sovereignty over my digital identity.

### 🤖 ID 103 & 106 // Ollama (Local & Private AI)
*   **Purpose:** Offline AI engine to run Large Language Models securely.
*   **Utility:** I run open models (like Llama 3 or Phi-3) 100% locally without sending data to external APIs, leveraging my Ryzen CPU and GPU.

### 📈 ID 104 // Uptime Kuma (Status Monitor)
*   **Purpose:** Service availability dashboard.
*   **Utility:** Performs constant pings and HTTP checks on all my local nodes. If Vaultwarden or Docker suffer a downtime, Uptime Kuma warns me instantly via real-time alerts.

---

## 3. Security & Active Monitoring (Blue Team)

As my professional focus is in defensive security, the HomeLab wouldn't be complete without security utilities. Outside of productivity services, I integrated a dedicated VM running **Wazuh SIEM**.

This system acts as a centralized security event collector and host-based intrusion detection system (HIDS). Wazuh constantly audits the logs of my Proxmox nodes, analyzes package vulnerabilities, and alerts me of any suspicious access or unauthorized executions in my lab.

> ### Next Steps
> 
> The ecosystem keeps growing! My next goals include refining firewall rules within Proxmox, separating services via VLANs, and documenting hands-on labs directly aligned with CompTIA Security+ objectives.
