# Express + TypeScript Backend Setup (No Docker)

## NPM Setup

cd backend
npm init -y

## Install dependencies

npm install express
npm install --save-dev \
 typescript \
 ts-node \
 nodemon \
 @types/express

## Initialize tsconfig.json

npx tsc --init

## tsconfig.json

{
"compilerOptions": {
"target": "ES2022",
"module": "ESNext",
"moduleResolution": "node",
"outDir": "./dist",
"rootDir": "./src",
"strict": true,
"esModuleInterop": true,
"forceConsistentCasingInFileNames": true,
"skipLibCheck": true,
"allowImportingTsExtensions": true,
"noEmit": false
},
"include": ["src/**/*"]
}

## nodemon.json

{
"watch": ["src"],
"ext": "ts",
"ignore": ["dist"],
"exec": "node --loader ts-node/esm src/index.ts"
}

## package.json

"scripts": {
"build": "tsc --project tsconfig.json",
"start": "node dist/index.js",
"dev": "nodemon"
}
