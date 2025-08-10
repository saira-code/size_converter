const categorySelect = document.getElementById('category');
const unitSelect = document.getElementById('unit');
const chestInput = document.getElementById('chest');
const waistInput = document.getElementById('waist');
const hipsInput = document.getElementById('hips');
const convertBtn = document.getElementById('convertBtn');
const resultsDiv = document.getElementById('results');
const sizesDiv = document.getElementById('sizes');

function convertToCm(value, unit) {
  if (unit === 'in') {
    return value * 2.54;
  }
  return value;
}

const sizeCharts = {
  men: {
    zara: [
      { size: 'XS', chestMin: 81, chestMax: 86, waistMin: 66, waistMax: 71, hipsMin: 81, hipsMax: 86 },
      { size: 'S', chestMin: 87, chestMax: 92, waistMin: 72, waistMax: 77, hipsMin: 87, hipsMax: 92 },
      { size: 'M', chestMin: 93, chestMax: 98, waistMin: 78, waistMax: 83, hipsMin: 93, hipsMax: 98 },
      { size: 'L', chestMin: 99, chestMax: 104, waistMin: 84, waistMax: 89, hipsMin: 99, hipsMax: 104 },
      { size: 'XL', chestMin: 105, chestMax: 110, waistMin: 90, waistMax: 95, hipsMin: 105, hipsMax: 110 },
    ],
    hm: [
      { size: 'S', chestMin: 88, chestMax: 92, waistMin: 74, waistMax: 78, hipsMin: 90, hipsMax: 94 },
      { size: 'M', chestMin: 93, chestMax: 97, waistMin: 79, waistMax: 83, hipsMin: 95, hipsMax: 99 },
      { size: 'L', chestMin: 98, chestMax: 102, waistMin: 84, waistMax: 88, hipsMin: 100, hipsMax: 104 },
      { size: 'XL', chestMin: 103, chestMax: 107, waistMin: 89, waistMax: 93, hipsMin: 105, hipsMax: 109 },
    ]
  },
  women: {
    zara: [
      { size: 'XS', chestMin: 76, chestMax: 81, waistMin: 61, waistMax: 66, hipsMin: 86, hipsMax: 91 },
      { size: 'S', chestMin: 82, chestMax: 87, waistMin: 67, waistMax: 72, hipsMin: 92, hipsMax: 97 },
      { size: 'M', chestMin: 88, chestMax: 93, waistMin: 73, waistMax: 78, hipsMin: 98, hipsMax: 103 },
      { size: 'L', chestMin: 94, chestMax: 99, waistMin: 79, waistMax: 84, hipsMin: 104, hipsMax: 109 },
      { size: 'XL', chestMin: 100, chestMax: 105, waistMin: 85, waistMax: 90, hipsMin: 110, hipsMax: 115 },
    ],
    hm: [
      { size: 'S', chestMin: 82, chestMax: 87, waistMin: 63, waistMax: 68, hipsMin: 89, hipsMax: 94 },
      { size: 'M', chestMin: 88, chestMax: 93, waistMin: 69, waistMax: 74, hipsMin: 95, hipsMax: 100 },
      { size: 'L', chestMin: 94, chestMax: 99, waistMin: 75, waistMax: 80, hipsMin: 101, hipsMax: 106 },
      { size: 'XL', chestMin: 100, chestMax: 105, waistMin: 81, waistMax: 86, hipsMin: 107, hipsMax: 112 },
    ]
  }
};

function findSize(measurement, chart) {
  let closestSize = 'N/A';
  let smallestDiff = Infinity;

  for (const sizeObj of chart) {
    const chestMid = (sizeObj.chestMin + sizeObj.chestMax) / 2;
    const waistMid = (sizeObj.waistMin + sizeObj.waistMax) / 2;
    const hipsMid = (sizeObj.hipsMin + sizeObj.hipsMax) / 2;

    const diff = Math.abs(measurement.chest - chestMid)
               + Math.abs(measurement.waist - waistMid)
               + Math.abs(measurement.hips - hipsMid);

    if (diff < smallestDiff) {
      smallestDiff = diff;
      closestSize = sizeObj.size;
    }
  }

  return closestSize;
}

convertBtn.addEventListener('click', () => {
  const category = categorySelect.value;
  const unit = unitSelect.value;

  let chest = parseFloat(chestInput.value);
  let waist = parseFloat(waistInput.value);
  let hips = parseFloat(hipsInput.value);

  if (isNaN(chest) || isNaN(waist) || isNaN(hips) || chest <= 0 || waist <= 0 || hips <= 0) {
    alert('Please enter valid positive numbers for all measurements.');
    return;
  }

  chest = convertToCm(chest, unit);
  waist = convertToCm(waist, unit);
  hips = convertToCm(hips, unit);

  const measurement = { chest, waist, hips };
  const zaraSize = findSize(measurement, sizeCharts[category].zara);
  const hmSize = findSize(measurement, sizeCharts[category].hm);

  sizesDiv.innerHTML = `
    <table class="size-table">
      <thead>
        <tr>
          <th>Store</th>
          <th>Size</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Zara</td>
          <td>${zaraSize}</td>
        </tr>
        <tr>
          <td>H&M</td>
          <td>${hmSize}</td>
        </tr>
      </tbody>
    </table>
  `;

  resultsDiv.classList.remove('hidden');
});
