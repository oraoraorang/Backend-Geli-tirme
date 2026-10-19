

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


## Test

Postman koleksiyonu `postman/Taskflow.postman_collection.json` dosyasındadır (Postman → Import). Koleksiyon `baseUrl` değişkenini kullanır (varsayılan `http://localhost:3000`). Test ekran görüntüleri `docs/screenshots/` klasöründedir. Adım adım test rehberi için `docs/POSTMAN_TEST_REHBERI.md` dosyasına bakınız.
