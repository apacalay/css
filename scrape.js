// scrape.js
const cloudscraper = require('cloudscraper');

const skpdId = process.argv[2];  // ID SKPD dari argumen CLI
const kodeRekening = process.argv[3]; // kode rekening juga dari argumen CLI

const URL = 'https://service.sipd.kemendagri.go.id/aklap/api/buku-besar/list';
const BEARER = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJTSVBEX0FVVEhfU0VSVklDRSIsInN1YiI6IjMxNjYyOS4xMjYiLCJleHAiOjE3NTE2MzUxNTMsImlhdCI6MTc1MTQxOTE1MywidGFodW4iOjIwMjQsImlkX3VzZXIiOjMxNjYyOSwiaWRfZGFlcmFoIjoxMjYsImtvZGVfcHJvdmluc2kiOiIxMSIsImtvZGVfZGRuIjoiMTEuMDciLCJpZF9za3BkIjowLCJpZF9yb2xlIjoxOSwiaWRfcGVnYXdhaSI6MzIyODU3LCJzdWJfZG9tYWluX2RhZXJhaCI6InBpZGlla2FiIn0.YQPYCyt4cJgncJNpRW-rp-jJi-7Len5rkNKWGPK5D08"; // potong untuk singkat
const headers = {
  'Authorization': BEARER,
  'Content-Type': 'application/json;charset=UTF-8',
  'Accept': 'application/json, text/plain, */*',
  'Origin': 'https://peta.sipd.kemendagri.go.id',
  'Referer': 'https://peta.sipd.kemendagri.go.id/',
  'User-Agent': 'Mozilla/5.0'
};

async function fetchData() {
  let total = 0.0;
  let page = 1;
  while (true) {
    const params = new URLSearchParams({
      skpd: skpdId,
      kode_rekening: kodeRekening,
      length: 100,
      page,
      is_combine: 'skpd_konsolidasi'
    });

    try {
      const response = await cloudscraper.get({
        uri: `${URL}?${params.toString()}`,
        headers,
        json: true
      });

      const data = response.data?.list || [];
      if (!data.length) break;

      for (const item of data) {
        if (item.position === 'debet') {
          total += parseFloat(item.amount || 0);
        }
      }

      const maxPage = response.data?.pagination?.max_page || 1;
      if (page >= maxPage) break;
      page += 1;
    } catch (err) {
      console.error(JSON.stringify({ error: err.message }));
      process.exit(1);
    }
  }

  console.log(JSON.stringify({ total }));
}

fetchData();
