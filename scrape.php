<?php
// Jalankan scraping jika form disubmit
$result = null;
$error = null;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $skpd_id = $_POST["skpd_id"] ?? null;
    $kode = $_POST["kode"] ?? null;

    if ($skpd_id && $kode) {
        // Panggil Node.js script
        $escaped_skpd = escapeshellarg($skpd_id);
        $escaped_kode = escapeshellarg($kode);

        $output = shell_exec("node scrape.js $escaped_skpd $escaped_kode");
        $result = json_decode($output, true);

        if (!$result || isset($result['error'])) {
            $error = $result['error'] ?? 'Gagal memproses data.';
        }
    } else {
        $error = "Mohon isi semua field.";
    }
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Form Cek Beban Penyusutan</title>
</head>
<body>
    <h2>Cek Beban Penyusutan SKPD</h2>

    <form method="post">
        <label for="skpd_id">ID SKPD:</label><br>
        <input type="text" id="skpd_id" name="skpd_id" required><br><br>

        <label for="kode">Kode Rekening:</label><br>
        <select id="kode" name="kode" required>
            <option value="8.1.08.01">8.1.08.01 - Beban Penyusutan Peralatan dan Mesin</option>
            <option value="8.1.08.02">8.1.08.02 - Beban Penyusutan Gedung dan Bangunan</option>
            <option value="8.1.08.03">8.1.08.03 - Beban Penyusutan Jalan, Jaringan dan Irigasi</option>
            <option value="8.1.08.04">8.1.08.04 - Beban Penyusutan Aset Tetap Lainnya</option>
            <option value="8.1.08.09">8.1.08.09 - Beban Penyusutan Properti Investasi</option>
            <option value="8.1.08.06">8.1.08.06 - Beban Amortisasi Aset Tidak Berwujud</option>
        </select><br><br>

        <button type="submit">Cek Beban</button>
    </form>

    <?php if ($error): ?>
        <p style="color:red;">❌ <?= htmlspecialchars($error) ?></p>
    <?php elseif ($result): ?>
        <h3>📊 Total Beban:</h3>
        <p><strong><?= number_format($result['total'], 2, ',', '.') ?></strong></p>
    <?php endif; ?>
</body>
</html>
