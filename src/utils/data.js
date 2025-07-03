export const getMainUrl = () => {
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const mainDomain = url.origin;
  return mainDomain;
};

export function getJalur() {
  const jalur = localStorage.getItem("_jalur");
  return jalur;
}

export function getForm() {
  const form = JSON.parse(localStorage.getItem("_form") || "{}");
  return form;
}

export async function getBerita() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cms/getBerita`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  // console.log(data)
  return data;
}

export async function getPengumuman() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cms/getPengumuman`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();
  return data;
}

export const getLatestContent = (arrayData, count) => {
  return arrayData
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, count);
};

export async function getProvincies() {
  const mainDomain = getMainUrl();
  const res = await fetch(`${mainDomain}/api/indonesia-region`, {
    cache: "no-store",
  });

  const data = await res.json();
  return data;
}

export async function getRegency(provincy_id) {
  const mainDomain = getMainUrl();

  if (!provincy_id) {
    return [
      {
        value: "",
        label: "",
      },
    ];
  }

  const res = await fetch(
    `${mainDomain}/api/indonesia-region?provincy_id=${provincy_id.value}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();
  return data;
}

export async function getDistricts(provincy_id, regency_id) {
  // console.log(provincy_id.value)
  if (!provincy_id || !regency_id) {
    return [
      {
        value: "",
        label: "",
      },
    ];
  }

  const mainDomain = getMainUrl();

  const res = await fetch(
    `${mainDomain}/api/indonesia-region?provincy_id=${provincy_id.value}&regency_id=${regency_id.value}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();
  return data;
}
export async function getVillages(provincy_id, regency_id, district_id) {
  // console.log(provincy_id.value)
  if (!provincy_id || !regency_id || !district_id) {
    return [
      {
        value: "",
        label: "",
      },
    ];
  }

  const mainDomain = getMainUrl();

  const res = await fetch(
    `${mainDomain}/api/indonesia-region?provincy_id=${provincy_id.value}&regency_id=${regency_id.value}&district_id=${district_id.value}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();
  return data;
}

export const yesNoOptions = [
  {
    value: "YA",
    label: "YA",
  },
  {
    value: "TIDAK",
    label: "TIDAK",
  },
];
export const penghasilanOptions = [
  {
    value: "< Rp. 1.000.000",
    label: "< Rp. 1.000.000",
  },
  {
    value: "Rp. 1.000.000 – Rp. 2.000.000",
    label: "Rp. 1.000.000 – Rp. 2.000.000",
  },
  {
    value: "Rp. 2.000.000 – Rp. 4.000.000",
    label: "Rp. 2.000.000 – Rp. 4.000.000",
  },
  {
    value: "> Rp. 5.000.000",
    label: "> Rp. 5.000.000",
  },
];
export const latestGraduateOptions = [
  {
    value: "SD/SEDERAJAT",
    label: "SD/SEDERAJAT",
  },
  {
    value: "SMP/SEDERAJAT",
    label: "SMP/SEDERAJAT",
  },
  {
    value: "SMA/SEDERAJAT",
    label: "SMA/SEDERAJAT",
  },
  {
    value: "PENDIDIKAN TINGGI",
    label: "PENDIDIKAN TINGGI",
  },
];

export const daftarOptions = [
  {
    value: "BARU",
    label: "BARU",
  },
  {
    value: "PINDAHAN",
    label: "PINDAHAN",
  },
];

export const kewarganegaraanOptions = [
  {
    value: "WNI",
    label: "WNI",
  },
  {
    value: "WNA",
    label: "WNA",
  },
];
export const stayWithOptions = [
  {
    value: "ORANG TUA",
    label: "ORANG TUA",
  },
  {
    value: "WALI",
    label: "WALI",
  },
  {
    value: "SENDIRI",
    label: "SENDIRI",
  },
];
export const jenisSekolahOptions = [
  {
    value: "SMA",
    label: "SMA",
  },
  {
    value: "SMK",
    label: "SMK",
  },
  {
    value: "MAN",
    label: "MAN",
  },
  {
    value: "SMKS",
    label: "SMKS",
  },
];
export const agamaOptions = [
  {
    value: "ISLAM",
    label: "ISLAM",
  },
  {
    value: "HINDU",
    label: "HINDU",
  },
  {
    value: "BUDHA",
    label: "BUDHA",
  },
  {
    value: "KRISTEN",
    label: "KRISTEN",
  },
  {
    value: "KONGHUCU",
    label: "KONGHUCU",
  },
];

export const beasiswaOptions = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/beasiswa`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    }

    const result = await res.json();

    const formattedOptions = result.data.map((item) => ({
      value: item,
      label: item,
    }));

    return formattedOptions;
  } catch (error) {
    console.log("Error fetching beasiswa data:", error.message);
    return []; // Return an empty array in case of an error
  }
};

export const generateGraduationYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 9;
  const endYear = currentYear + 1;

  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push({
      value: year.toString(),
      label: year.toString(),
    });
  }

  // Sort the years array in descending order
  years.sort((a, b) => b.value.localeCompare(a.value));

  return years;
};

export const prodiOptions = [
  {
    value: "S1 HUKUM",
    label: "S1 HUKUM",
  },
  {
    value: "S2 HUKUM",
    label: "S2 HUKUM",
  },
];

export const masterPMB = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/setting-pmb`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    }
    const result = await res.json();
    return result.data;
  } catch (error) {
    console.log("Error fetching master PMB data:", error.message);
    return error.message;
  }
};

// export const getGelombang = async () => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/setting-pmb`,
//       {
//         cache: "no-store",
//       }
//     );

//     if (!res.ok) {
//       throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
//     }

//     const result = await res.json();

//     if (result && result.data && Array.isArray(result.data.gelombang)) {
//       return result.data.gelombang;
//     } else {
//       console.error("Invalid data structure:", result);
//       return []; // Return an empty array if the data structure is not as expected
//     }
//   } catch (error) {
//     console.log("Error fetching gelombang data:", error.message);
//     return []; // Return an empty array in case of an error
//   }
// };

export const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

export const formatTanggal = (date) => {
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const parseGelombang = (gelombangData) => {
  const currentDate = new Date();
  const dataGelombang = gelombangData?.gelombang || [];

  // Tipe dan harga untuk gelombang
  const { jalur, kelas, prodi } = gelombangData || [];

  const bulanIndonesia = {
    Januari: 0,
    Februari: 1,
    Maret: 2,
    April: 3,
    Mei: 4,
    Juni: 5,
    Juli: 6,
    Agustus: 7,
    September: 8,
    Oktober: 9,
    November: 10,
    Desember: 11,
  };

  const dataToReturn = [];

  const parsedGelombang = Array.isArray(dataGelombang)
    ? dataGelombang.forEach((item, index) => {
        const [name, dates] = item.split(" : ");
        const [start, end] = dates.split(" - ").map((date) => {
          const [day, month, year] = date.split(" ");
          const monthIndex = bulanIndonesia[month];
          return new Date(year, monthIndex, parseInt(day));
        });

        prodi.forEach((prodiItem) => {
          const basePrice = 400000 + index * 100000;

          if (prodiItem === "S1 Hukum" || prodiItem === "S1 HUKUM") {
            kelas.forEach((kelasItem) => {
              const applicableJalur =
                kelasItem === "Reguler" ? jalur : ["Umum"];

              dataToReturn.push({
                name: `${prodiItem} ${name} ${kelasItem}`,
                start,
                end,
                prodi: prodiItem || ["Umum"],
                kelas: kelasItem,
                jalur: applicableJalur,
                price: rupiah(basePrice),
              });
            });
          } else if (prodiItem === "S2 Hukum" || prodiItem === "S2 HUKUM") {
            dataToReturn.push({
              name: `${prodiItem} ${name} ${kelas[1]}`,
              start,
              end,
              prodi: prodiItem,
              kelas: kelas[1], // default 'Karyawan' misalnya
              jalur: ["Umum"], // hanya jalur umum
              price: rupiah(1000000),
            });
          }
        });
      })
    : [];

  // Filter the gelombang based on the current date
  // const filteredGelombang = parsedGelombang.filter(({ start, end }) => {
  //   return currentDate >= start && currentDate <= end;
  // });

  // return filteredGelombang;

  return dataToReturn;
};
