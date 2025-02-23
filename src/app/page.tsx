import Button from "@/components/ui/Button";
import { db } from "@/lib/db";

export default async function Home() {
  
  return (
    <div>
      <Button size={'lg'} variant={'ghost'}>
        Hello
      </Button>
    </div>
  );
}
