### ❶ Test Planning
#### Tujuan : 
Menentukan scope dan skenario pengujian

#### Aktivitas :

- Gunakan 1 dokumen SIT untuk keseluruhan testing (tidak perlu dipisah per sheet/module jika masih manageable)
- Tambahkan test case baru sesuai fitur yang ditambahkan(highlight yellow)
- Update test case existing jika ada perubahan flow
- Tentukan area yang terdampak untuk regression

#### Output : 
SIT/Test Case terbaru dan lengkap


### ❷ Functional Testing
#### Tujuan : 
Memastikan fitur baru berjalan sesuai kebutuhan

#### Cara Testing :
Positive Test
- Input data valid
- Klik menu/tombol sesuai alur normal
- Verifikasi hasil sesuai yang diharapkan

Negative Test
- Input data kosong
- Input data tidak valid
- Akses fitur tanpa hak akses
- Trigger error scenario yang mungkin terjadi

#### Output :
Evidence hasil testing
Daftar defect jika ditemukan


### ❸ UI (User Interface) & UX (User Experience) Testing
#### Tujuan : 
Memastikan tampilan dan pengalaman pengguna tetap baik


#### Cara Testing :
UI
- Posisi menu sesuai
- Font, warna, icon konsisten
- Tidak ada overlap atau broken layout
- Responsive di berbagai ukuran layar (jika applicable)

UX
- Menu mudah ditemukan
- Nama menu mudah dipahami
- Alur navigasi tidak membingungkan
- Jumlah klik menuju fitur masih efisien
- Feedback sistem muncul dengan jelas (loading, success, error message)

#### Output :
Catatan improvement UI/UX
Defect visual jika ada


### ❹ Integration Testing

#### Tujuan: Memastikan fitur baru terhubung dengan modul lain tanpa masalah

#### Cara Testing :
- Verifikasi data tersimpan ke database
- Verifikasi data tampil pada modul terkait
- Verifikasi API/service yang digunakan berjalan normal
- Verifikasi perubahan pada modul baru tidak menyebabkan error pada modul lain

#### Contoh :
- Jika menambah menu Master Vendor :
- Data yang dibuat muncul di transaksi
- Data dapat dipanggil oleh modul lain yang menggunakan Vendor

#### Output: 
Bukti integrasi berjalan normal, contohnya :
- screenshot
- API verification

### ❺ Regression Testing

#### Tujuan :
Memastikan perubahan tidak merusak fungsi existing.

#### Cara Testing :
Fokus pada area terdampak
- Login
- Dashboard
- Navigation/Menu
- Permission Role
- Modul yang terkait langsung dengan fitur baru
- CRUD existing yang berhubungan

#### Contoh: Menambah menu baru di sidebar
- Cek semua menu lama masih bisa diakses
- Cek role existing tetap sesuai
- Cek routing/URL tidak berubah

#### Output :
Daftar regression test yang lulus/gagal


### ❻ Non-Functional Testing (Jika Diperlukan) - Performance Testing
#### Tujuan: 
Memastikan performa sistem tetap baik

#### Cara Testing :
- Cek waktu loading halaman/menu baru
- Cek proses simpan data
- Cek pencarian/filter jika ada
- Bandingkan performa sebelum dan sesudah perubahan (jika memungkinkan)

#### Contoh Acceptance :
- Halaman terbuka < 3 detik
- Submit data berhasil tanpa timeout

#### Output : 
Hasil pengukuran performa
