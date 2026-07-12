/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_ENABLE_JOHN_MEDIA_PILOT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
