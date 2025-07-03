<?php
// === SKPD_INFO (Mapping dari Nama ke ID) ===
$SKPD_INFO = [
    1178 => "SEKRETARIAT MAJELIS PENDIDIKAN DAERAH",
    1122 => "DINAS PENDIDIKAN DAN KEBUDAYAAN",
    1175 => "DINAS PENDIDIKAN DAYAH",
    1124 => "DINAS KESEHATAN",
    1605 => "RSUD TGK. CHIK DITIRO",
    1606 => "RSUD TGK. ABDULLAH SYAFI",
    63   => "DINAS PEKERJAAN UMUM DAN PENATAAN RUANG",
    // ... tambahkan semua SKPD lain dari script Python sesuai kebutuhan
];

// === Fungsi cari ID dari nama SKPD ===
function cari_skpd_id($nama_input, $SKPD_INFO) {
    $nama_input = strtolower(trim($nama_input));
    foreach ($SKPD_INFO as $id => $nama) {
        if (strtolower($nama) === $nama_input) {
            return $id;
        }
    }
    foreach ($SKPD_INFO as $id => $nama) {
        if (strpos(strtolower($nama), $nama_input) !== false) {
            return $id;
        }
    }
    return null;
}

// === Fungsi Format Rupiah ===
function format_rupiah($value) {
    return "Rp " . number_format($value, 2, ',', '.');
}

// === Proses jika form disubmit ===
$result = null;
$error = null;
$nama_skpd_input = '';
$selected_kode = '';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nama_skpd_input = $_POST["nama_skpd"] ?? '';
    $selected_kode = $_POST["kode"] ?? '';

    $skpd_id = cari_skpd_id($nama_skpd_input, $SKPD_INFO);

    if ($skpd_id && $selected_kode) {
        $escaped_skpd = escapeshellarg($skpd_id);
        $escaped_kode = escapeshellarg($selected_kode);
        $output = shell_exec("node scrape.js $escaped_skpd $escaped_kode");
        $result = json_decode($output, true);

        if (!$result || isset($result['error'])) {
            $error = $result['error'] ?? 'Gagal memproses data.';
        }
    } else {
        $error = "Nama SKPD tidak ditemukan atau kode rekening kosong.";
    }
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Cek Beban Penyusutan SKPD</title>
</head>
<body>
    <h2>Cek Beban Penyusutan SKPD</h2>

    <form method="post">
        <label for="nama_skpd">Nama SKPD:</label><br>
        <input type="text" id="nama_skpd" name="nama_skpd" required value="<?= htmlspecialchars($nama_skpd_input) ?>"><br><br>

        <label for="kode">Kode Rekening:</label><br>
        <select id="kode" name="kode" required>
            <option value="">-- Pilih Kode Rekening --</option>
            <option value="8.1.08.01" <?= $selected_kode === "8.1.08.01" ? "selected" : "" ?>>8.1.08.01 - Beban Penyusutan Peralatan dan Mesin</option>
            <option value="8.1.08.02" <?= $selected_kode === "8.1.08.02" ? "selected" : "" ?>>8.1.08.02 - Beban Penyusutan Gedung dan Bangunan</option>
            <option value="8.1.08.03" <?= $selected_kode === "8.1.08.03" ? "selected" : "" ?>>8.1.08.03 - Beban Penyusutan Jalan, Jaringan dan Irigasi</option>
            <option value="8.1.08.04" <?= $selected_kode === "8.1.08.04" ? "selected" : "" ?>>8.1.08.04 - Beban Penyusutan Aset Tetap Lainnya</option>
            <option value="8.1.08.09" <?= $selected_kode === "8.1.08.09" ? "selected" : "" ?>>8.1.08.09 - Beban Penyusutan Properti Investasi</option>
            <option value="8.1.08.06" <?= $selected_kode === "8.1.08.06" ? "selected" : "" ?>>8.1.08.06 - Beban Amortisasi Aset Tidak Berwujud</option>
        </select><br><br>

        <button type="submit">🔍 Cek Beban</button>
    </form>

    <hr>

    <?php if ($error): ?>
        <p style="color:red;">❌ <?= htmlspecialchars($error) ?></p>
    <?php elseif ($result): ?>
        <h3>📊 Total Beban:</h3>
        <p><strong><?= format_rupiah($result['total']) ?></strong></p>
    <?php endif; ?>
</body>
</html>
