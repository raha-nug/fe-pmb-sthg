"use client";

import { CardBody, Input, Typography } from "@/components/components";
import React, { useEffect, useState } from "react";
import TitleForm from "../fragments/title-form";
import SubForm from "../fragments/sub-form";

function UploadForm() {
  const [isKip, setIsKip] = useState("");
  const [kpsPkh, setKpsPkh] = useState("");
  const [daftarSebagai, setDaftarSebagai] = useState("BARU");

  useEffect(() => {
    const storedData = sessionStorage.getItem("_form");
    if (storedData) {
      try {
        const path = JSON.parse(storedData);
        setIsKip(path.kip);
        setKpsPkh(path.kps_pkh);
        setDaftarSebagai(path.jenis_daftar);
      } catch (error) {
        console.error("Failed to parse _form data:", error);
      }
    }
  }, []);

  return (
    <CardBody>
      <TitleForm display={"Upload Dokumen Pendukung"} />

      <SubForm>
        <Input
          type="file"
          label="Scan KTP"
          color="blue"
          accept=".jpg, .jpeg, .png, .pdf"
          name="scan_ktp"
          required
        />
        <Input
          type="file"
          label="Scan Ijazah"
          color="blue"
          accept=".jpg, .jpeg, .png, .pdf"
          name="scan_ijazah"
          required
        />
        <Input
          type="file"
          label="Scan Kartu Keluarga"
          color="blue"
          accept=".jpg, .jpeg, .png, .pdf"
          name="scan_kk"
          required
        />
        <Input
          type="file"
          label="Foto 3x4"
          color="blue"
          accept=".jpg, .jpeg, .png, .pdf"
          name="photo_3x4"
          required
        />
        <Input
          type="file"
          label="Foto 4x6"
          color="blue"
          accept=".jpg, .jpeg, .png, .pdf"
          name="photo_4x6"
          required
        />
        {/* <Input
          type="file"
          label="Formulir"
          color="blue"
          accept=".jpg, .jpeg, .png, .pdf"
          name="formulir"
          required
        /> */}

        {daftarSebagai == "PINDAHAN" && (
          <Input
            type="file"
            label="Scan Transkrip"
            color="blue"
            accept=".jpg, .jpeg, .png, .pdf"
            name="scan_transkip"
          />
        )}
        {isKip == "YA" && (
          <Input
            type="file"
            label="Scan Kartu Indonesia Pintar (KIP)"
            color="blue"
            accept=".jpg, .jpeg, .png, .pdf"
            name="scan_kip"
          />
        )}
        {kpsPkh == "YA" && (
          <Input
            type="file"
            label="Scan Proram Keluarga Harapan (PKH)"
            color="blue"
            accept=".jpg, .jpeg, .png, .pdf"
            name="scan_pkh"
          />
        )}
      </SubForm>
      <div className="my-8 flex flex-col gap-5">
        <Typography className="italic text-blue-gray-900 text-sm">
          Note: bisa transfer ke no rek BJB Syariah{" "}
          <span className="font-bold">
            00200102111169 a.n Yayasan Galunggung
          </span>
        </Typography>
        <Input
          type="file"
          label="Bukti Bayar (Opsional)"
          color="blue"
          accept=".jpg, .jpeg, .png, .pdf"
          name="bukti_bayar"
        />
      </div>
    </CardBody>
  );
}

export default UploadForm;
