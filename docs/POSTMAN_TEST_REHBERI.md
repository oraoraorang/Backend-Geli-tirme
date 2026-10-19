# Postman Test Rehberi

1. `npm start` ile sunucuyu başlatın.
2. Postman'de **Import** → `postman/Taskflow.postman_collection.json` dosyasını seçin.
3. İstekleri aşağıdaki sırayla çalıştırın. Her biri için **istek + yanıt (durum kodu görünür)** ekran görüntüsü alın ve `docs/screenshots/` klasörüne kaydedin.

| Sıra | İstek                  | Beklenen sonuç                       | Önerilen dosya adı        |
|------|------------------------|--------------------------------------|---------------------------|
| 1    | POST /tasks            | 201 Created, `id` döner              | `01-gorev-ekleme.png`     |
| 2    | GET /tasks             | 200 OK, görev dizisi                 | `02-gorev-listeleme.png`  |
| 3    | GET /tasks/:id         | 200 OK, tek görev                    | `03-gorev-detay.png`      |
| 4    | PUT /tasks/:id         | 200 OK, `status: in-progress`        | `04-gorev-guncelleme.png` |
| 5    | DELETE /tasks/:id      | 200 OK, "Task deleted"               | `05-gorev-silme.png`      |
| 6    | GET /tasks/:id (silinen) | 404 Not Found                      | `06-silinen-gorev-404.png`|

İsteğe bağlı (raporlama): `GET /reports/completed`, `GET /reports/pending`, `GET /reports/summary`.

**Notlar**

- Koleksiyondaki `POST /tasks` isteği, dönen `id` değerini otomatik olarak `taskId` değişkenine kaydeder; 3-6. istekler bu değişkeni kullanır.
- Silme testinden önce 2. istekte listeleme ekran görüntüsünü almayı unutmayın (liste dolu görünsün).
- Test sonrası `data/tasks.json` dosyasını temiz teslim etmek isterseniz içeriğini şu hâle getirin:
  `{ "lastId": 0, "tasks": [] }`
