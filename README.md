# SYS-FRONTEND

Proyecto web que consume los endpoints del API REST SYS-BACKEND

## Descripción

Este proyecto fue creado con [Vite] (https://vite.dev/) es una herramienta de compilación que tiene como objetivo proporcionar una experiencia de desarrollo más rápida y ágil para proyectos web modernos.

## Tecnologías utilizadas

- React
- Typescript
- Tailwind

## Prerrequisitos

1. Puerto 3000 debe estar disponible.
2. Antes de comenzar, asegúrate de tener instalados los siguientes requisitos:

- [Node.js](https://nodejs.org/dist/v20.18.0/node-v20.18.0-x64.msi) (versión 20 latest)
- [npm](https://www.npmjs.com/) o [Yarn](https://yarnpkg.com/)
- [TypeScript](https://www.typescriptlang.org/) (globalmente instalado)


## Instalación

1. Clonar el repositorio:

```bash
   git clone https://github.com/enunez-dev/sys-frontend.git
   cd <NOMBRE_DEL_PROYECTO>
```

2. Instalar dependencias:

```bash
    npm install
    # o si prefieres Yarn
    yarn install
```

3. Ejecutar el proyecto en modo desarrollo:

```bash
    npm run dev
    # o con Yarn
    yarn dev
```

## Despliegue con Jenkins (WINDOWS)
**Prerequisitos**:
- [Node.js](https://nodejs.org/dist/v20.18.0/node-v20.18.0-x64.msi) (versión 20 latest)
- **Instalacion de pm2**: PM2  es un administrador de procesos para aplicaciones Node.js que permite ejecutar y gestionar aplicaciones en producción.

    ```bash
    npm install pm2 -g
    ```
    Luego de instalar y cada vez que se reinicie el servidor ejecutar
    ```bash
    pm2 list
    ```
    Crear directorio .pm2
    ```bash
    cd C:\\tools & mkdir .pm2
    ```

#### Para configurar el despliegue automatizado con Jenkins, sigue los pasos a continuación:
- **Instalar Jenkins y los plugins necesarios**: Asegúrate de que Jenkins esté instalado y que los plugins para Node.js y Git estén instalados.
- **Configurar NodeJS (plugin)**: En jenkins ir a:
    ```markdown
    Dashboard > Manage Jenkins > Tools 
    ```
    y adicionar una instalacion de NodeJS
    - **Name**: NodeJS 20
    - **Installation directory**: Ruta donde esta instalado node ejm: C:\Program Files\nodejs
    - **Install automatically**: (uncheck)
    >Asi quedaria configurado NodeJS [Click aqui](https://drive.google.com/file/d/1MRMhUC3FWB-ikVZ1-TILXyuAQL6zBdHf/view?usp=sharing)

- **Configurar un nuevo pipeline**:
  1. New Item
     - Name: **sys-backend**
     - Type: Pipeline
  2. Pipeline
     - Definition: Pipeline script from SCM
       - SCM: Git
         - Repository URL: https://github.com/enunez-dev/sys-frontend.git
         - Branch Specifier: \*/master
       - Script Path: Jenkinsfile
  3. (Save)
  4. Build Now
  >Asi querdaria el pipeline [Click aqui](https://drive.google.com/file/d/1EQM1gaPVtW7OahTaJg0BWETy_9VdjaeU/view?usp=sharing)


## Uso

Una vez en funcionamiento, el proyecto web estará disponible en http://localhost:3000 (o el puerto configurado). A continuación, se encuentran ejemplos de las rutas:

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.
