---
title: "Ultimate Guide: How to install Proxmox VE from scratch"
description: "Discover what a Type 1 hypervisor is and learn step-by-step how to install Proxmox VE on your own hardware. We will explore the minimum resources required and why multi-core processor architectures like Ryzen 7 are ideal for virtualization."
pubDate: 2026-05-20
category: "VIRTUALIZATION"
badge: "TUTORIAL // #001"
coverImage: "/images/proxmox_tutorial_cover.png"
downloads: 0
views: 0
tags: ["tutorial", "virtualization", "proxmox", "homelab", "infrastructure"]
difficulty: "BEGINNER"
lang: "en"
---

If you read my previous post about creating my first HomeLab, you already know that the heart of all that infrastructure is **Proxmox VE**. Before starting to spin up containers and media servers, you need a solid foundation.

In this tutorial, which serves as a "prequel," I will explain exactly what Proxmox is, what hardware you need to run it decently, and how to install it from scratch.

## 1. What is a Type 1 Hypervisor?

When we talk about virtualization, we usually think of programs like VirtualBox or VMware Workstation. These are **Type 2** hypervisors, meaning applications installed *on top of* your usual operating system (such as Windows or macOS). They consume a lot of resources because the host system is already using RAM and CPU just to stay powered on.

Proxmox VE is a **Type 1 (Bare-Metal) hypervisor**. This means that **Proxmox is the operating system**. It is installed directly onto your machine's hardware, eliminating intermediaries. The result is that nearly 100% of your processor and RAM power is available exclusively for your virtual machines (VMs) and containers (LXC), achieving enterprise-grade performance.

---

## 2. Hardware Requirements: What do you really need?

One of the great advantages of Proxmox is that it can run on almost anything, from an old laptop to a rack server, but the experience will depend on your resources.

### Minimum Requirements (For testing or very light services)
*   **CPU:** 64-bit processor with virtualization support (Intel VT-x or AMD-V).
*   **RAM:** 2 GB (although the base system consumes about 1 GB, leaving very little for virtualization).
*   **Storage:** 32 GB hard drive.

### Recommended Hardware (The HomeLab "Sweet Spot")
To be able to spin up multiple services (Docker, SIEM, automation) without bottlenecks, multi-core processor architecture is your best ally.

In my case, I use a **Ryzen 7 5700X**. AMD's architecture, with its 8 cores and 16 threads, is ideal for virtualization. Proxmox allows you to assign these virtual "threads" to different containers, enabling several heavy services to run in parallel without saturating the system. Paired with **16 GB or 32 GB of RAM** and SSD/NVMe storage (with ZFS support), you have a server that will last you for years.

---

## 3. Step-by-Step: Installation from scratch

### Step 3.1: Prepare the installation media (Bootable USB)
1.  Go to the [official Proxmox download page](https://www.proxmox.com/en/downloads) and download the latest Proxmox VE ISO image.
2.  Download flashing software like **Rufus** (Windows) or **BalenaEtcher** (Cross-platform).
3.  Connect a USB drive of at least 8GB.
4.  Open Rufus/Etcher, select the downloaded ISO, choose your USB, and hit flash. *Note: This will erase all data on your USB.*

### Step 3.2: BIOS Configuration
Before booting from the USB, you need to make sure your motherboard allows virtualization. On a motherboard like the B450 Aorus Elite V2, the steps are:
1.  Turn on your PC and repeatedly press `DEL` or `F2` to enter the BIOS.
2.  Look for the **SVM Mode** (Secure Virtual Machine) option in advanced processor settings (CPU Features) and set it to **Enabled**. (If you are using Intel, look for Intel Virtualization Technology or VT-x).
3.  Go to the "Boot" tab, select your USB flash drive as boot option number 1, save changes, and reboot.

### Step 3.3: The Proxmox Installer
1.  **Welcome screen:** Select the first option *Install Proxmox VE*.
2.  **Accept the terms (EULA):** Read them (or simply click "I agree").
3.  **Target Hard Drive Selection:** Choose where it will be installed. If you have multiple drives and want to use ZFS (highly recommended for redundancy and performance), click "Options" to configure it. If you only have one disk, leave it as ext4.
4.  **Location and Time Zone:** Configure your country and time zone (this is vital for security logs and certificates).
5.  **Root Password:** Create a strong password and add your email address (you will receive system alerts here).
6.  **Network Configuration:** Proxmox needs a static IP so you can always find it on your network.
    *   **Hostname:** Your node name (e.g., `pve.local`).
    *   **IP Address:** Assign a fixed IP that is outside your router's DHCP range (e.g., `192.168.1.100`).
    *   **Gateway / DNS:** Usually your modem/router's IP.

Review the final summary and hit "Install". Once finished, remove the USB and reboot.

---

## 4. First access and initial configurations

When your system reboots, you will no longer see a graphical interface on that monitor, but a black text console indicating a web address. The server is ready, and from now on, you will manage it remotely from your main computer.

1.  Open a web browser and type the IP you configured, making sure to use `https://` and port `:8006`.
    *   *Example: `https://192.168.1.100:8006`*
2.  Your browser will show a security warning (this is normal, as Proxmox generates a self-signed certificate). Click "Advanced Settings" and "Proceed anyway".
3.  On the login screen:
    *   **Usuario:** `root`
    *   **Contraseña:** The one you configured during the installation step.
    *   **Realm:** Leave it as `Linux PAM standard authentication`.

Done! You have just accessed the command center of your new infrastructure. In the left column you will see your node, and in the top right the buttons to create your first Virtual Machines or LXC Containers.

This is just the beginning. With Proxmox installed, you are ready to keep up with my lab reports and start building your own development and security monitoring environment.
