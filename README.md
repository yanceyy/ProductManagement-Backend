<div align="center">
<h1>
<img src="./files/icons/icon.svg" width="300" alt="product icon" />
<br>Product Management Server</h1>
<h3>This is the backend server for the product management system</h3>
<h3>Developed with the software and tools below.</h3>

<p>
<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Nestjs-CB171E.svg?style=flat&logo=Nestjs&logoColor=white" alt="Nestjs" />
<img src="https://img.shields.io/badge/Prettier-F7B93E.svg?style=flat&logo=Prettier&logoColor=black" alt="Prettier" />
<img src="https://img.shields.io/badge/Jest-F7DF1E.svg?style=flat&logo=Jest&logoColor=black" alt="Jest" />
<img src="https://img.shields.io/badge/Docker-2088FF.svg?style=flat&logo=Docker&logoColor=white" alt="Docker" />
<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" alt="ESLint" />
<img src="https://img.shields.io/badge/MongoDB-47A248.svg?style=flat&logo=MongoDB&logoColor=white" alt="MongoDB" />
<img src="https://img.shields.io/badge/Passport-34E27A.svg?style=flat&logo=Passport&logoColor=white" alt="Passport" />
<img src="https://img.shields.io/badge/precommit-FAB040.svg?style=flat&logo=pre-commit&logoColor=black" alt="precommit" />
<img src="https://img.shields.io/badge/GitHub%20Actions-2088FF.svg?style=flat&logo=GitHub-Actions&logoColor=white" alt="GitHub%20Actions" />
</p>
<img src="https://img.shields.io/github/last-commit/yanceyy/ProductManagement-Backend?style=flat&color=5D6D7E" alt="git-last-commit" />
<img src="https://img.shields.io/github/commit-activity/m/yanceyy/ProductManagement-Backend?style=flat&color=5D6D7E" alt="GitHub commit activity" />
<img src="https://img.shields.io/github/languages/top/yanceyy/ProductManagement-Backend?style=flat&color=5D6D7E" alt="GitHub top language" />
</div>

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
    - [Download and prebuild](#download-and-prebuild)
    - [Running server](#Running-server)
    - [Tests](#tests)

---


## Overview

This project is a backend service for a product management system.
It includes creating and managing a database to store product information,
implementing APIs for data retrieval and manipulation,
ensuring secure access and data integrity, and integrating with other systems for seamless data flow.
The service will also support user authentication and authorization,
provide detailed logging for debugging and audit purposes,
and feature a scalable architecture to accommodate future enhancements and increased user load.
Additionally, the system will be optimized for performance and designed to handle concurrent requests efficiently.

---

## Features

* User Management System: This integral part of the service allows for the creation and management of user accounts. It includes features for assigning specific roles to users, enhancing the operational structure and access control within the system.

* Role-Based Access Control (RBAC): The service implements an RBAC system. and provide functions to create distinct roles, each with its unique set of permissions. This feature ensures that access to various functionalities and data is regulated based on the user's role, enhancing security and efficiency.

* Product Management Interface: A comprehensive module dedicated to the management of products is a key feature. It allows for the creation of new products, and the ability to manage their status effectively. This feature is designed to streamline the process of handling product-related information and operations within the system.

---

## Getting Started

### Download and prebuild

1. Clone the admin-board-server repository and enter into the folder:
```sh
git clone https://github.com/yanceyy/ProductManagement-Backend
cd ProductManagement-Backend
```
2. Clone the front-end repository into this folder and run build
```sh
git clone https://github.com/yanceyy/ProductManagement-Frontend
cd admin-dashboard-react
pnpm i && pnpm build
```

2. Change back to the project directory:
```sh
cd ...
```

3. Install the dependencies:
```sh
pnpm i
```

### Running server

```sh
pnpm start
```

### Tests
```sh
pnpm test
```

### 