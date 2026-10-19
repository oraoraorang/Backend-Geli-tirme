# Taskflow – Görev ve Proje Yönetim Sistemi API

Node.js ve Express.js ile geliştirilmiş, REST API mantığında çalışan bir görev yönetim sistemidir. Görevler oluşturulabilir, listelenebilir, güncellenebilir, silinebilir ve çalışanlara atanabilir. Veriler `data/tasks.json` dosyasında kalıcı olarak saklanır.

## Gereksinimler

- [Node.js](https://nodejs.org/) 18 veya üzeri
- npm (Node.js ile birlikte gelir)
- [Postman](https://www.postman.com/) (test için)

## Kurulum

```bash
# 1. Projeyi indirin
git clone <repo-adresi>
cd taskflow

# 2. Bağımlılıkları kurun
npm install

# 3. Sunucuyu başlatın
npm start
```

Sunucu varsayılan olarak `http://localhost:3000` adresinde çalışır. Farklı bir port kullanmak için:

```bash
# Linux / macOS
PORT=4000 npm start

# Windows (PowerShell)
$env:PORT=4000; npm start
```

Geliştirme sırasında dosya değişikliklerinde otomatik yeniden başlatma için `npm run dev` kullanılabilir.

## Proje Yapısı

```
taskflow/
├── data/tasks.json            # JSON dosya veritabanı
├── logs/access.log            # Logger çıktısı (çalışırken oluşur)
├── docs/                      # Dokümanlar ve Postman ekran görüntüleri
├── postman/                   # Postman koleksiyonu
└── src/
    ├── server.js              # Sunucuyu başlatır
    ├── app.js                 # Express uygulaması, middleware ve route bağlantıları
    ├── routes/                # Endpoint tanımları
    ├── controllers/           # İstek/yanıt yönetimi
    ├── services/              # İş mantığı
    ├── repositories/          # JSON dosyasına okuma/yazma
    └── middleware/logger.js   # İstek kayıt (logger) middleware'i
```

## Endpoint'ler

### Görevler

| Metot  | Endpoint     | Açıklama                    | Başarılı yanıt |
|--------|--------------|-----------------------------|----------------|
| POST   | `/tasks`     | Yeni görev oluşturur        | 201            |
| GET    | `/tasks`     | Tüm görevleri listeler      | 200            |
| GET    | `/tasks/:id` | Belirli bir görevi getirir  | 200            |
| PUT    | `/tasks/:id` | Görevi günceller            | 200            |
| DELETE | `/tasks/:id` | Görevi siler                | 200            |

Kayıt bulunamazsa `404` ve `{ "message": "Task not found" }` döner.

### Raporlar

| Metot | Endpoint             | Açıklama                                  |
|-------|----------------------|-------------------------------------------|
| GET   | `/reports/completed` | Tamamlanan görev sayısı                   |
| GET   | `/reports/pending`   | Durumu `pending` olan görev sayısı        |
| GET   | `/reports/summary`   | Toplam, duruma ve önceliğe göre özet      |

## Görev Modeli

| Alan          | Açıklama                                                      |
|---------------|---------------------------------------------------------------|
| `id`          | Otomatik artan tam sayı (silinen ID'ler tekrar kullanılmaz)   |
| `title`       | Görev başlığı                                                 |
| `description` | Görev açıklaması                                              |
| `status`      | `pending` · `in-progress` · `completed` (varsayılan: `pending`) |
| `priority`    | `low` · `medium` · `high` (varsayılan: `medium`)              |
| `assignee`    | Görevin atandığı çalışan                                      |
| `dueDate`     | Bitiş tarihi (örn. `2026-11-01`)                              |
| `createdAt`   | Oluşturulma zamanı (otomatik)                                 |
| `updatedAt`   | Son güncelleme zamanı (otomatik)                              |

### Örnek İstek

```http
POST /tasks
Content-Type: application/json

{
  "title": "Backend altyapısını kur",
  "description": "Express projesini oluştur",
  "priority": "high",
  "assignee": "musa",
  "dueDate": "2026-11-01"
}
```

```json
{
  "id": 1,
  "title": "Backend altyapısını kur",
  "description": "Express projesini oluştur",
  "status": "pending",
  "priority": "high",
  "assignee": "musa",
  "dueDate": "2026-11-01",
  "createdAt": "2026-10-18T09:38:14.297Z",
  "updatedAt": "2026-10-18T09:38:14.297Z"
}
```

`PUT /tasks/:id` yalnızca gönderilen alanları günceller; `id` ve `createdAt` değiştirilemez.

## Logger

Her istek; zaman damgası, HTTP metodu, endpoint, durum kodu ve süre bilgisiyle hem konsola hem de `logs/access.log` dosyasına yazılır:

```
[2026-10-18T09:38:14.303Z] POST /tasks 201 13ms
```

## Test

Postman koleksiyonu `postman/Taskflow.postman_collection.json` dosyasındadır (Postman → Import). Koleksiyon `baseUrl` değişkenini kullanır (varsayılan `http://localhost:3000`). Test ekran görüntüleri `docs/screenshots/` klasöründedir. Adım adım test rehberi için `docs/POSTMAN_TEST_REHBERI.md` dosyasına bakınız.
