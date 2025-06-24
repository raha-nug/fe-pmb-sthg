import { PhoneIcon } from "@heroicons/react/24/outline";
import { Button, Card, CardBody, Typography } from "@/components/components";
import Image from "next/image";

function HelpContent() {
  return (
    <Card className="relative rounded-lg">
      <Image
        src={"/jumbotron-bg.jpg"}
        width={2400}
        height={601}
        alt="help-bg"
        className="absolute w-full h-full object-cover rounded-lg"
      />
      <CardBody className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-lg opacity-85 lg:grid grid-cols-12 p-14">
        <div className="col-span-7">
          <Typography variant="h3" color="white">
            Kami siap membantu anda
          </Typography>
          <Typography className=" pt-5" color="white">
            Apabila kamu memiliki kendala atau pertanyaan. Silakan hubungi kami
            atau dapat juga membaca user guide (petunjuk) pendaftaran terlebih
            dahulu
          </Typography>
        </div>
        <div className="col-span-5 flex items-center justify-end gap-8 mt-3 lg:mt-0 ">
          <Button
            variant="outlined"
            color="white"
            className=" flex justify-between items-center gap-3">
            <PhoneIcon className="h-4 w-4" />
            Whatsapp
          </Button>
          <Button variant="outlined" color="white">
            User Guide
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

export default HelpContent;
