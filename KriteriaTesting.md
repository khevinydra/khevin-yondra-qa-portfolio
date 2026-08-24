## Kriteria Penggunaan Manual Testing vs Automation Testing

| Kriteria | Manual Testing | Automation Testing |
|-----------|:-------------:|:------------------:|
| Fitur baru / first-time testing (fitur pertama kali dikembangkan atau belum pernah diuji sebelumnya) | ✅ | ❌ |
| Requirement atau UI masih sering berubah (spesifikasi, alur, atau tampilan masih belum stabil) | ✅ | ❌ |
| Exploratory Testing (pengujian dengan eksplorasi bebas untuk menemukan potensi masalah yang tidak tercakup dalam test case) | ✅ | ❌ |
| UI/UX Validation (penilaian tampilan, kemudahan penggunaan, dan pengalaman pengguna) | ✅ | ❌ |
| Ad-hoc Testing (pengujian spontan tanpa test case formal) | ✅ | ❌ |
| Skenario kompleks yang membutuhkan judgement manusia (misalnya validasi tampilan, keterbacaan, atau kenyamanan pengguna) | ✅ | ❌ |
| Test case dijalankan berulang setiap release (skenario yang selalu diuji pada setiap deployment atau release) | ❌ | ✅ |
| Regression Testing (memastikan fitur existing tetap berjalan setelah ada perubahan sistem) | ⚠️ Jika belum ada script | ✅ |
| Smoke Testing (pengujian dasar untuk memastikan fungsi utama aplikasi masih dapat digunakan setelah deployment) | ⚠️ Jika belum ada script | ✅ |
| Alur bisnis yang stabil (fitur jarang berubah dan proses bisnis sudah matang) | ❌ | ✅ |
| High-volume data testing (pengujian menggunakan data dalam jumlah besar) | ❌ | ✅ |
| API Testing yang berulang (pengujian endpoint API yang dilakukan secara berkala) | ❌ | ✅ |
| Cross-browser repetitive testing (pengujian yang sama pada banyak browser atau device secara berulang) | ❌ | ✅ |
| Performance Testing (pengujian performa, response time, throughput, atau beban sistem) | ❌ | ✅ |

## Kriteria Manual Testing

Gunakan **Manual Testing** jika:

- Fitur baru pertama kali dirilis.
- Requirement atau UI masih sering berubah.
- Membutuhkan Exploratory Testing.
- Membutuhkan validasi UI/UX.
- Membutuhkan penilaian atau observasi manusia.
- Frekuensi testing rendah atau hanya dilakukan sesekali.

## Kriteria Automation Testing

Gunakan **Automation Testing** jika:

- Test case dijalankan berulang setiap release.
- Menjadi bagian Regression Testing.
- Menjadi bagian Smoke Testing.
- Alur bisnis sudah stabil.
- Membutuhkan hasil yang cepat, konsisten, dan dapat diulang.
- Membutuhkan pengujian data besar atau banyak kombinasi data.
- Membutuhkan pengujian API atau multi-browser secara rutin.

## Rule of Thumb

> Gunakan **Manual Testing** ketika perubahan masih sering terjadi atau membutuhkan evaluasi manusia.
>
> Gunakan **Automation Testing** ketika test case bersifat berulang, stabil, dan akan dijalankan pada banyak release.
