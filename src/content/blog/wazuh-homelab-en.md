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

Once the process was finished, the script provided my administrator credentials, and I was able to access the web interface (Dashboard) through my local web browser.

## 3. Deploying My First Agent and Hunting Alerts

With the central dashboard running, the real value comes when you connect your systems. From the Wazuh panel itself, I generated an installation command for my Docker server.

I connected via SSH to my Docker container and ran the generated command. In a matter of seconds, my server appeared as "Active" on the main panel. Immediately, Wazuh started scanning the system and sending me the first reports.

### What did I discover on day one?
*   **Root Auditing:** Wazuh detected and alerted me every time I used the `sudo` command to perform maintenance tasks in Docker.
*   **Vulnerability Analysis:** It performed an inventory of the installed packages on the container's operating system and generated a list of outdated dependencies that needed to be patched.
*   **SSH Monitoring:** It configured critical alerts in case any external device attempted to perform a brute-force attack on port 22.

> [!TIP]
> ### Alerts and Events Visualization
> Below is a real-time capture of my Wazuh dashboard, displaying the status of active agents and the volume of security events collected over the last 24 hours:
> ![Wazuh Dashboard](/images/wazuh_dashboard.png)

## Conclusion and Next Steps

Deploying Wazuh transforms a static HomeLab into a living security environment. You go from simply "hosting services" to managing and defending an infrastructure. Studying the theory of active monitoring for Security+ is helpful, but auditing your own containers in real-time gives you a technical understanding that you won't forget.

The next goal on my Blue Team roadmap is to connect this SIEM to automation tools. For instance, I would like to configure Wazuh so that if it detects multiple failed login attempts, it automatically blocks the attacker's IP using firewall rules in Proxmox or notifies me directly via a Telegram bot.

