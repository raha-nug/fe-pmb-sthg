"use client";
import {
  Button,
  Card,
  CardFooter,
  Progress,
  Typography,
} from "@/components/components";

import { useParams } from "next/navigation";

import FinishComponent from "@/components/fragments/finish-component";
import SchoolForm from "@/components/daftar/school-form";
import ParentForm from "@/components/daftar/parent-form";
import UploadForm from "@/components/daftar/upload-form";
import { handleDaftar } from "@/utils/actions";
import { useEffect, useState } from "react";
import PersonalForm from "@/components/daftar/personal-form";
import Link from "next/link";
import { getForm } from "@/utils/data";

function Page() {
  const [jalur, setJalur] = useState("");
  const [progres, setProgres] = useState(25);
  const [mahasiswaId, setMahasiswaId] = useState();
  const [form, setForm] = useState();

  const { step } = useParams();

  useEffect(() => {
    const path = localStorage.getItem("_jalur") || "No Jalur";
    const id = localStorage.getItem("_mhs_id");
    const prog = Number(localStorage.getItem("_progres"));

    setJalur(path);
    setMahasiswaId(id);
    setProgres(prog);
    setForm(getForm());
  }, []);

  const handleBack = () => {
    const url = new URL(window.location.href);
    const pathname = url.pathname.split("/").filter(Boolean);

    if (pathname[1] === "school") {
      window.location.href = "/daftar/personal";
    } else if (pathname[1] === "parent") {
      window.location.href = "/daftar/school";
    } else if (pathname[1] === "upload") {
      window.location.href = "/daftar/parent";
    }
  };

  const [prodi, kelas] = jalur.split("-");
  return (
    <>
      {jalur === "No Jalur" || "" ? (
        <div className="flex flex-col justify-center items-center min-h-56 gap-3">
          <Typography variant="h4" className="text-center">
            Anda belum memilih jalur, silahkan pilih jalur terlebih dahulu
          </Typography>
          <Link href={"/jalur-pendaftaran"}>
            <Button>Pilih jalur</Button>
          </Link>
        </div>
      ) : step == "finish" ? (
        <FinishComponent id={mahasiswaId} />
      ) : (
        <section className="pt-12 flex justify-center">
          <div className="container px-5 sm:px-0">
            <Card>
              <Progress value={progres} color="blue" />
              <form
                onSubmit={handleDaftar}
                encType="multipart/form-data"
                method="post">
                {step == "personal" && (
                  <PersonalForm prodi={prodi} kelas={kelas} formData={form} />
                )}

                {step == "school" && (
                  <SchoolForm prodi={prodi} formData={form} />
                )}

                {step == "parent" && <ParentForm formData={form} />}

                {step == "upload" && <UploadForm formData={form} />}

                <CardFooter
                  className={`flex justify-${
                    step !== "personal" ? "between" : "end"
                  }`}>
                  {step !== "personal" && (
                    <Button
                      type="button"
                      onClick={handleBack}
                      variant="outline">
                      Kembali
                    </Button>
                  )}
                  <Button type="submit">
                    {step === "upload" ? "Submit" : "Lanjutkan"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </section>
      )}
    </>
  );
}

export default Page;
