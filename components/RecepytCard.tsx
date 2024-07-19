import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IRecepy } from "@/types/app";
import Image from "next/image";
import Link from "next/link";

interface RecepyCardProps /* extends IRecepy */ {
  name: string;
  id: number;
  images: any;
  kkal: number
}

const RecepyCard:React.FC<RecepyCardProps> = ({name, id, images, kkal}) => {
  return (
      <Card >
        <Image src={"https://github.com/shadcn.png"} alt={`t-${id}-${name}`} width={350} height={100} className="rounded-md" />
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>
            {kkal}
          </CardDescription>
        </CardHeader>
        <CardContent>

          {/* <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Framework</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form> */}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Редактировать</Button>
          {/* <Button   >Подробнее</Button> */}
          <Link href={`/reciepe/${id}`} >Подробнее</Link>
        </CardFooter>
      </Card>
  );
};

export default RecepyCard;
