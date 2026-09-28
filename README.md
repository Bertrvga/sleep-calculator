# Uyku Hesaplayıcı — Sleep Calculator

Next.js (App Router) + Tailwind CSS + lucide-react ile geliştirilmiş, modern, karanlık tema odaklı, mobil uyumlu bir uyku hesaplayıcı.

## Özellikler

- **Uyanma saatine göre**: Girdiğiniz uyanma saatine göre 3–7 döngü için ideal yatma saatlerini hesaplar (kartlar hâlinde).
- **Şimdi yatıyorum**: Anlık saati baz alarak önerilen uyanma saatlerini gösterir.
- **Gelişmiş ayarlar (akordiyon)**: Uykuya dalma süresini (10 / 15 / 20 / 30 dk) özelleştirin.
- **Kurumsal sayfalar**: `/privacy`, `/terms`, `/contact` — AdSense uyumlu.
- **Reklam placeholder'ları**: `#ad-top`, `#ad-bottom`, `#ad-left`, `#ad-right`.
- **SEO**: metadata, `robots.ts`, `sitemap.ts`.

## Çalıştırma

```bash
npm install
npm run dev
```

Ardından http://localhost:3000 adresini açın.

## Prodüksiyon build

```bash
npm run build
npm run start
```

## Notlar

- Hesaplama tamamen tarayıcı tarafında yapılır; kullanıcı verisi sunucuya gönderilmez.
- AdSense entegrasyonu için placeholder div'lerin içine ilgili `<ins class="adsbygoogle" ...>` bloklarını ekleyin ve `<head>` bölümüne AdSense script'ini yerleştirin.
