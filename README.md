# 🌟 CYN KIDS - Landing Page

Landing page educativa sobre microbiota infantil y la conexión intestino-cerebro.

## 🚀 Características

- ✅ **Diseño Premium**: Glassmorphism, animaciones suaves, tipografía Inter
- ✅ **SEO Optimizado**: Meta tags completos, sitemap automático, Open Graph
- ✅ **100% Responsivo**: Optimizado para móvil y desktop
- ✅ **COFEPRIS-Safe**: Sin claims médicos, enfoque educativo
- ✅ **Analytics Ready**: Google Analytics 4 integrado
- ✅ **Performance**: Imágenes WebP optimizadas, carga ultra-rápida

## 📦 Stack Tecnológico

- **Framework**: [Astro](https://astro.build) 5.x
- **Estilos**: [Tailwind CSS](https://tailwindcss.com) 3.x
- **Tipografía**: Google Fonts (Inter)
- **Analytics**: Google Analytics 4
- **Optimización**: Astro Assets (WebP automático)

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## ⚙️ Configuración Requerida

### 1. Google Analytics
Edita `src/layouts/BaseLayout.astro` y reemplaza:
```javascript
'G-MEASUREMENT_ID' → Tu ID real de GA4
```

### 2. Dominio (Opcional)
Edita `astro.config.mjs`:
```javascript
site: 'https://cynkids.com' → Tu dominio real
```

## 📁 Estructura del Proyecto

```
/
├── public/
│   ├── images/           # Imágenes estáticas
│   ├── favicon.png
│   └── robots.txt
├── src/
│   ├── assets/           # Imágenes optimizadas (WebP)
│   ├── components/
│   │   ├── analytics/    # Google Analytics
│   │   ├── legal/        # Disclaimer
│   │   ├── seo/          # Meta tags
│   │   └── ui/           # Componentes UI
│   ├── layouts/          # Layout base
│   ├── lib/              # Utilidades
│   └── pages/            # Páginas (index.astro)
├── astro.config.mjs
├── tailwind.config.cjs
└── package.json
```

## 🚢 Despliegue

### Opción A: Vercel (Recomendado)
1. Conecta tu repositorio en [Vercel](https://vercel.com)
2. Vercel detecta Astro automáticamente
3. Deploy automático en cada push

### Opción B: Netlify
1. Conecta tu repositorio en [Netlify](https://netlify.com)
2. Build command: `npm run build`
3. Publish directory: `dist`

### Opción C: Hosting Tradicional
1. Ejecuta `npm run build`
2. Sube el contenido de `/dist` a tu servidor
3. Apunta el dominio a la carpeta

## 📊 Analytics & Tracking

El sitio incluye tracking de:
- ✅ Clics en CTAs (Hero, Footer, Sticky Mobile)
- ✅ Web Vitals (LCP, FID, CLS)
- ✅ Navegación y scroll

## 🔒 Compliance

- ✅ Sin testimonios médicos
- ✅ Sin claims de eficacia
- ✅ Sin urgencia artificial
- ✅ Disclaimer legal incluido
- ✅ Enfoque 100% educativo

## 📝 Notas Importantes

1. **NO incluir** en el repositorio:
   - Variables de entorno (`.env`)
   - Carpeta `node_modules/`
   - Carpeta `dist/` (se genera en build)

2. **Antes de producción**:
   - Configurar Google Analytics ID
   - Verificar dominio en `astro.config.mjs`
   - Probar en móvil real

## 🤝 Contribución

Este es un proyecto privado. Para cambios:
1. Crea una rama feature
2. Haz tus cambios
3. Solicita revisión antes de merge

## 📄 Licencia

Privado - Todos los derechos reservados

---

**Desarrollado con ❤️ para CYN KIDS**
