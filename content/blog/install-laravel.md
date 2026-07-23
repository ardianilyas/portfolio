---
title: "Laravel Basic 01: Getting Started with Laravel 13 - Install Laravel"
date: "2026-07-22"
description: "A basic setup and installation Laravel 13"
tags: 
  - "laravel"
  - "PHP"
  - "fullstack"
---

In this article I would like to explain a quick step for setup and install Laravel 13 project on your machine. This tutorial is for people that have basic known about PHP, MVC structure, and who want to be a fullstack developer.

---

## 1. Preparation

before you start to install Laravel 13 project on your machine, make sure you've already installed php, composer, and laravel installer. If not here i give you terminal command to install all of it :

### PHP (Latest version or 8.3) using Homebrew
```bash
brew install php
```
### Composer using Homebrew
```bash
brew install composer
```
### Laravel installer
```bash
composer global require laravel/installer
```

## 2. Create New Laravel 13 Project
### Use laravel installer
```bash
laravel new laravel/laravel laravel-basic
```
### If you prefer to use composer to install laravel
```bash 
composer create-project laravel/laravel laravel-basic
```

> [!TIP]
> By default laravel use **sqlite** database, you can change it on .env file if you prefer to use **mysql** or **postgresql**. Here is example using mysql database on laravel.

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=username
DB_PASSWORD=password
```

If you choose database other than sqlite, you should run migration command to create your database tables.
```bash
php artisan migrate
```

## 3. Run Laravel Project
After all the installation step is success. you can go to laravel-basic folder.
```bash 
cd laravel-basic
```
To run laravel project.
```bash
# if you install laravel blade starter kit only
php artisan serve

# if you choose laravel inertia starter kit
composer run dev 
```

> [!TIP]
> For beginner level you can choose **livewire starter kit** instead of use Inertiajs. If you already familiar with **javascript** and its library like **Reactjs or Vuejs**, you can choose **Inertiajs starter kit**.