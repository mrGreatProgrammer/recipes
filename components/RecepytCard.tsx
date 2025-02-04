import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

interface RecepyCardProps {
  name: string;
  id: number;
  images: any;
  kkal: number;
  createdAt?: Date;
}

const RecepyCard: React.FC<RecepyCardProps> = ({
  name,
  id,
  images,
  kkal,
  createdAt,
}) => {
  return (
    <Card>
      <Image
        src={images?.length?images[0].link:"https://dummyimage.com/350x200/333/fff"}
        alt={`t-${id}-${name}`}
        width={350}
        height={200}
        className="rounded-md max-h-44"
      />
      <CardHeader className="flex flex-row justify-between py-4">
        <CardTitle className="mr-3" >{name}</CardTitle>
        <CardDescription className="text-xs font-light" >
            {moment(createdAt).format("YYYY-MM-DD HH:mm")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CardDescription>{kkal} ккал,</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/reciepe/${id}/edit`} className="border rounded px-3 py-2">
          Редактировать
        </Link>
        <Link
          href={`/reciepe/${id}`}
          className="bg-primary rounded text-white px-3 py-2 hover:opacity-90 duration-150"
        >
          Подробнее
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RecepyCard;
