# Döviz Kuru Uygulaması

Bu, Elektron, React, Vite ve Tailwind CSS kullanılarak oluşturulmuş bir masaüstü döviz kuru uygulamasıdır. Kullanıcıların gerçek zamanlı döviz kurlarını görüntülemelerine, favori para birimlerini takip etmelerine ve geçmiş verileri görselleştirmelerine olanak tanır.

## Özellikler

- **Gerçek Zamanlı Döviz Kurları:** En son döviz kurlarını [ExchangeRate-API](https://www.exchangerate-api.com/) kullanarak alın.
- **Favori Para Birimleri:** Kolay erişim için sık kullandığınız para birimlerini favorilerinize ekleyin ve yönetin.
- **Tarihsel Veri Grafiği:** Seçilen bir döviz çifti için son 7 günün kur değişimini gösteren etkileşimli bir grafik.
- **Koyu/Açık Mod:** Tercihinize göre açık ve koyu temalar arasında geçiş yapın.
- **Çapraz Platform:** Windows, macOS ve Linux üzerinde çalışır.

## Teknoloji Yığını

- **Çerçeve:** Electron
- **Ön Yüz:** React, Vite
- **Durum Yönetimi:** Redux Toolkit
- **Stil:** Tailwind CSS
- **Grafikler:** Recharts
- **İkonlar:** Heroicons

## Başlarken

Projeyi yerel makinenizde kurmak ve çalıştırmak için aşağıdaki adımları izleyin.

### Önkoşullar

- [Node.js](https://nodejs.org/) (v16 veya üstü)
- [pnpm](https://pnpm.io/)

### Kurulum

1.  Depoyu klonlayın:
    ```bash
    git clone https://github.com/kullaniciadi/doviz-uygulamasi.git
    cd doviz-uygulamasi
    ```

2.  Bağımlılıkları yükleyin:
    ```bash
    pnpm install
    ```

### Geliştirme Modunda Çalıştırma

Uygulamayı geliştirme modunda başlatmak için aşağıdaki komutu çalıştırın. Bu, uygulamayı başlatacak ve dosya değişikliklerini izleyecektir.

```bash
pnpm electron:dev
```

## Üretim için Derleme

Uygulamanızı dağıtım için derlemek üzere aşağıdaki komutu kullanın:

```bash
pnpm electron:build
```

Bu, işletim sisteminize bağlı olarak `dist` dizininde bir yükleyici (örneğin, `.exe`, `.dmg` veya `.AppImage`) oluşturacaktır.
