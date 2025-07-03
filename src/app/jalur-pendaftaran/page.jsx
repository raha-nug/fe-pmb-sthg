import InformationComponent from "@/components/jalur-pendaftaran/informaton/information";
import JalurList from "@/components/jalur-pendaftaran/jalur-list/jalur-list";
import { masterPMB, parseGelombang } from "@/utils/data";
import { Typography } from "@/components/components";

async function Page() {
  // const gelombangData = await getGelombang();
  const gelombangData = await masterPMB()

  const gelombang = parseGelombang(gelombangData);

  return (
    <>
      {gelombangData.length !== 0 ? (
        <>
          <section className="pt-12 flex justify-center">
            <div className="container px-5 sm:px-0">
              <InformationComponent />
            </div>
          </section>

          <section className="pt-12 flex justify-center">
            <div className="container px-5 sm:px-0">
              <JalurList gelombang={gelombang} />
            </div>
          </section>
        </>
      ) : (
        <section className="pt-12 flex justify-center">
          <div className="container px-5 sm:px-0">
            <div className="h-[50vh] flex justify-center items-center">
              <div className="text-center">
                <Typography variant="h2">Gelombang Belum Tersedia</Typography>
                <p className="my-5">Pantengin terus update dari STHG ya..</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Page;
