---
title: "Active Monitoring: Deploying Wazuh SIEM in my HomeLab"
description: "Putting Blue Team concepts into practice. I document how I installed Wazuh in my Proxmox environment to collect events, analyze vulnerabilities, and prepare for the CompTIA Security+ (SY0-701) certification."
pubDate: 2026-06-04
category: "CYBERSECURITY"
badge: "LAB_REPORT // #002"
coverImage: "/images/wazuh_homelab_cover.png"
downloads: 0
views: 0
tags: ["blue-team", "wazuh", "siem", "comptia", "proxmox"]
difficulty: "INTERMEDIATE"
lang: "en"
---

Having your own server with dozens of containers and services (like my Docker instance, Jellyfin, or Vaultwarden) is great, but it also opens up a fundamental question: **What is really happening inside my network?**

Since my professional development is focused on the defensive security area (**Blue Team**) and I am on the path to my **CompTIA Security+ (SY0-701)** certification, I needed full visibility. Therefore, the next logical step in my HomeLab was to deploy a SIEM (Security Information and Event Manager). The tool of choice: **Wazuh**.

## 1. What is Wazuh and why did I choose it?

Wazuh is an open-source unified security platform that functions as an XDR (Extended Detection and Response) and SIEM. In simple terms, it acts as a centralized surveillance system:
*   Collects records (logs) from all servers and containers.
*   Audits configurations for bad practices.
*   Detects known vulnerabilities (CVEs) in installed software.
*   Triggers real-time alerts if it detects anomalies, such as failed brute-force login attempts.

It is the same technology used in a real Security Operations Center (SOC), making it the perfect practice.

---

## 2. Deployment Architecture in Proxmox

Since I already have my virtualized infrastructure with Proxmox on my Ryzen 7 5700X, the topology I set up was as follows:

1.  **Wazuh Server (Central):** I installed the central components (Indexer, Server, and Dashboard) in a dedicated virtual machine within Proxmox. I allocated 4 cores and 8 GB of RAM to it so that processing and log indexing would be smooth.
2.  **Wazuh Agents (The watchmen):** I installed small programs (agents) on the different nodes of my network. The first one went directly to the LXC container (ID 100) where my entire Docker environment runs.

### Quickstart Installation

Setting up the central server today is incredibly efficient thanks to the unattended installation script. Basically, on a clean install of Ubuntu/Debian inside Proxmox, I ran:

```bash
curl -sO https://packages.wazuh.com/4.x/wazuh-install.sh && sudo bash ./wazuh-install.sh -a
```
