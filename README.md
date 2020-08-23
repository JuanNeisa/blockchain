
# ExpoArticulo.com - Aplicacion DAPP
Esta es la creacion de una aplicacion descentralizada (DAPP) utilizando la red local de Ethereum, la billetera de Ether Metamask y la suite truffle ademas de varias herramientas adicionales para la conformacion del proyecto.

## Dependencias
Para este proyecto es necesario intalar algunos softwares o herramientaspara su correcto despliegue en un entorno local.
- NPM: https://nodejs.org
- Truffle: https://github.com/trufflesuite/truffle (Si se tiene instalado npm: `npm install truffle -g`)
- Ganache: http://truffleframework.com/ganache/
- Metamask: https://metamask.io/


## Paso 1. Clonar el proyecto desde el repositorio 
`git clone https://github.com/JuanNeisa/Blockchain_expoarticulos`

## Paso 2. Instalar las dependencias
Utilizando el manejador de paquetes NPM
```
$ cd Blockchain_expoarticulos
$ npm install
```
## Paso 3. Iniciar Ganache
Abra el servicio de cliente de Ganache que descargó e instaló. Esto iniciará su instancia de blockchain local.

## Paso 4. Compilar y desplegar el Contrato Inteligente
Debe migrar el contrato inteligente cada vez que reinicie su ganache.
`$ truffle migrate --reset`

## Paso 5. Configuracion de MetaMask
- Abra la extencion de MetaMask
- Conecte la MetaMask a su cadena de bloques Etherum local proporcionada por Ganache.
- Importe una cuenta proporcionada por ganache.

## Paso 6. Ejecutar el Front-End
Si desea visualizar el entorno grafico diseñado para el despliegue de la aplicacion utilizaremos la red Local generada por NodeJs
`$ npm run dev`

