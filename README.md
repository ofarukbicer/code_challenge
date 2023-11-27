### Kullandığım Teknolojiler

-   **axios:** ApkMirror'a istek göndermek için kullanıldı.
-   **cheerio:** ApkMirror'dan gelen HTML formatındaki cevapları parse etmek için tercih edildi.

-   **cli-color:** Terminal ekranını daha estetik hale getirmek amacıyla kullanıldı.

-   **cors:** Farklı alanlardan gelen isteklere izin vermek için kullanılabilir.

-   **dotenv:** Çevre değişkenlerini yüklemek veya gizli bilgileri korumak için tercih edilir.

-   **express:** NodeJS üzerinde bir web sunucusu oluşturmak için tercih edildi.

-   **mongoose:** MongoDB'nin kendi kütüphanesi yerine kullanımı daha kolay olduğu için tercih edildi. Veritabanı işlemleri için kullanıldı.

### Projeyi Ayaklandırma

```bash
# Projeyi production modunda ayaklandırır
yarn start
# ya da
npm run start

# Projeyi development modunda ayaklandırır
yarn dev
# ya da
npm run dev

# ApkMirror'dan veri çekmek için kullanılabilir
yarn scraper
# ya da
npm run scraper
```

REST API kullanım dokümantasyonu için [bu bağlantıya](https://documenter.getpostman.com/view/25987700/2s9YeEarLp) göz atabilirsiniz
