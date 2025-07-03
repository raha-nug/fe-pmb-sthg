import { toast } from "sonner";

export const handleDaftar = (e) => {
  e.preventDefault();

  const url = new URL(window.location.href);
  const pathname = url.pathname.split("/").filter(Boolean);

  const prev_val_form = JSON.parse(localStorage.getItem("_form") || "{}");

  const formData = new FormData(e.target);

  if (pathname[1] === "personal") {
    const jalur = localStorage.getItem("_jalur");
    const [prodi, kelas] = jalur.split("-");

    const province = formData.get("province");
    const regency = formData.get("regency");
    const district = formData.get("district");
    const village = formData.get("village");
    const kampung = formData.get("kampung").toUpperCase();
    const pos_code = formData.get("pos_code");
    const rt_number = formData.get("rt_number");
    const rw_number = formData.get("rw_number");

    const alamat = `${kampung}, RT ${rt_number}, RW ${rw_number}, DESA ${village}, KECAMATAN ${district}, ${regency}, PROVINSI ${province}, KODE POS ${pos_code}`;

    const personalData = {
      ...prev_val_form,
      nama_lengkap: formData.get("nama_lengkap").toUpperCase(),
      kelas: kelas.toUpperCase(),
      prodi: prodi,
      nik: formData.get("nik"),
      nisn: formData.get("nisn"),
      tempat_lahir: formData.get("tempat_lahir").toUpperCase(),
      tgl_lahir: formData.get("tgl_lahir"),
      jenis_kelamin: formData.get("jenis_kelamin"),
      agama: formData.get("agama"),
      nationality: formData.get("nationality"),
      stay_with: formData.get("stay_with"),
      domisili: regency,
      kontak_wa: formData.get("kontak_wa"),
      email: formData.get("email"),
      alamat,
      jenis_daftar: formData.get("jenis_daftar"),
      kip: Number(formData.get("kip")),
      kps_pkh: Number(formData.get("kps_pkh")),
      nomor_kps_pkh: formData.get("nomor_kps_pkh"),
      jalur: Number(formData.get("kip")) === 1 ? "KIPK" : "UMUM",
      beasiswa:
        formData.get("beasiswa") !== null && formData.get("beasiswa") !== 0
          ? formData.get("beasiswa")
          : "TIDAK",
    };

    localStorage.setItem("_form", JSON.stringify(personalData));
    localStorage.setItem("_progres", "50");

    window.location.href = "/daftar/school";

    return;
  }

  if (pathname[1] === "school") {
    const schoolData = {
      ...prev_val_form,

      nama_sekolah: formData.get("nama_sekolah"),
      alamat_sekolah: formData.get("alamat_sekolah"),
      thn_lulus: formData.get("thn_lulus"),
      npwp: formData.get("npwp"),
      perusahaan: formData.get("perusahaan"),
      alamat_perusahaan: formData.get("alamat_perusahaan"),
      bidang_usaha: formData.get("bidang_usaha"),
      jabatan_terakhir: formData.get("jabatan_terakhir"),
      info_src: formData.get("info_src_other") ?? formData.get("info_src"),
    };

    localStorage.setItem("_form", JSON.stringify(schoolData));
    localStorage.setItem("_progres", "75");

    window.location.href = "/daftar/parent";

    return;
  }

  if (pathname[1] === "parent") {
    const parentData = {
      kip: Number(prev_val_form.kip),
      kps_pkh: Number(prev_val_form.kps_pkh),
      ...prev_val_form,
      nama_ayah: formData.get("nama_ayah"),
      nik_ayah: formData.get("nik_ayah"),
      tempat_lahir_ayah: formData.get("tempat_lahir_ayah"),
      tgl_lahir_ayah: formData.get("tgl_lahir_ayah"),
      alamat_ayah: formData.get("alamat_ayah"),
      agama_ayah: formData.get("agama_ayah"),
      pekerjaan_ayah: formData.get("pekerjaan_ayah"),
      pendidikan_ayah: formData.get("pendidikan_ayah"),

      nama_ibu: formData.get("nama_ibu"),
      nik_ibu: formData.get("nik_ibu"),
      tempat_lahir_ibu: formData.get("tempat_lahir_ibu"),
      tgl_lahir_ibu: formData.get("tgl_lahir_ibu"),
      alamat_ibu: formData.get("alamat_ibu"),
      agama_ibu: formData.get("agama_ibu"),
      pekerjaan_ibu: formData.get("pekerjaan_ibu"),
      pendidikan_ibu: formData.get("pendidikan_ibu"),

      nik_wali: formData.get("nik_wali"),
      alamat_wali: formData.get("alamat_wali"),
      pendidikan_wali: formData.get("pendidikan_wali"),
      nama_wali: formData.get("nama_wali"),

      kontak_orangtua: formData.get("kontak_orangtua"),
      kontak_wali: formData.get("kontak_wali"),
    };

    toast.promise(
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/daftar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parentData),
      })
        .then(async (res) => {
          if (!res.ok) {
            // Convert HTTP error response to a JavaScript Error
            return res.json().then((errData) => {
              const error = new Error("Server Error");
              error.data = errData;
              throw error;
            });
          }
          return res.json();
        })
        .then((data) => {
          localStorage.setItem("_form", JSON.stringify(parentData));
          localStorage.setItem("_progres", "100");
          localStorage.setItem("_mhs_id", data.id);
          return data.message;
        }),
      {
        loading: "Mohon tunggu..",
        success: (message) => {
          document.location.href = "/daftar/upload";
          return "Selamat, Pendaftaran berhasil";
        },
        error: (error) => {
          console.log(error.message);
          if (error.data && error.data.message) {
            // Use the message from the server response if available
            localStorage.setItem("_form", JSON.stringify(parentData));
            return `Error: ${error.data.message} `;
          }
          return "Ups, terjadi kesalahan saat memproses permintaan Anda.";
        },
      }
    );

    return;
  }

  if (pathname[1] === "upload") {
    const mahasiswaId = localStorage.getItem("_mhs_id");
    formData.append("id_mahasiswa", mahasiswaId);
    toast.promise(
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/addPersyaratan`, {
        method: "POST",
        body: formData,
      }),
      {
        duration: 5000,
        loading: "Harap tunggu..",
        success: () => {
          window.location.href = "/daftar/finish";
          return "Upload berkas berhasil";
        },
        error: "Ups ada kesalahan",
      }
    );
    return;
  }
};
