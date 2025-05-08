# AssistPromptBot - Backend Node.js

Este backend permite proteger tu clave API de OpenAI.

## 🚀 Instrucciones

1. Instala dependencias:

```
npm install
```

2. Crea un archivo `.env` en la raíz con tu clave API:

```
OPENAI_API_KEY=sk-tu-clave-aqui
```

3. Ejecuta el servidor:

```
npm start
```

El servidor quedará disponible en: `http://localhost:3000/api/openai`

El frontend debe enviar peticiones POST con `{ "prompt": "texto del prompt" }`